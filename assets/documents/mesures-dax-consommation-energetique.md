### Les mesures clés, avec le code DAX

Le modèle compte **78 mesures**. Voici les plus importantes. Les tables sont renommées `Fixe` et `Radio` pour la lisibilité ; la logique et les formules sont celles du rapport.

### 1. Sélection dynamique de l'indicateur

Le filtre « Mesure » renvoie le choix de l'utilisateur, et la mesure principale calcule l'indicateur correspondant. La conversion d'unité est intégrée : Wh en GWh pour la consommation, W en MW pour la puissance.

```dax
Mesure sélectionnée =
SELECTEDVALUE('Sélection mesure'[Sélectionner mesure])

Mesure =
SWITCH( TRUE(),
    'Sélection mesure'[Mesure sélectionnée] = "consommation wh",
        DIVIDE(SUMX('Fixe', 'Fixe'[Consommation]), 1000000000),
    'Sélection mesure'[Mesure sélectionnée] = "puissance w",
        DIVIDE(SUMX('Fixe', 'Fixe'[Puissance_estimee]), 1000000)
)
```

### 2. Titre de graphique dynamique

Le titre du graphique et l'unité affichée changent avec l'indicateur choisi.

```dax
Titre_graph =
IF('Sélection mesure'[Mesure sélectionnée] == "consommation wh",
    "Evolution de la consommation électrique en Gigawatt-heure ",
    "Evolution de la puissance moyenne en Méga watt")
```

### 3. Qualité des données : taux de complétude Linky

On compte les sites suivis, puis ceux qui ont une puissance moyenne renseignée et non nulle. Le taux est le rapport des deux, recalculé pour la catégorie sélectionnée.

```dax
nb sites total =
COUNTROWS('Radio')

Nbre site consomme =
COUNTROWS(
    FILTER(
        'Radio',
        NOT(ISBLANK('Radio'[P_MOY_W])) &&
        'Radio'[P_MOY_W] <> 0
    )
)

Taux de complétude Linky =
CALCULATE(
    DIVIDE([Nbre site consomme], [nb sites total]),
    FILTER('Dimension de visualisation 2',
        'Dimension de visualisation 2'[Categorie] =
        MAX('Dimension de visualisation 2'[Categorie]))
)
```

### 4. Parts de répartition

La part d'un domaine ou d'un accès dans le total. `ALLSELECTED` garde le total des éléments filtrés par l'utilisateur, au lieu de celui de toute la table.

```dax
pourcentage consommation radio =
VAR TotalConsommation =
    CALCULATE([consommation Totale (Gwh)], ALLSELECTED('Date'[Année]))
RETURN
    DIVIDE([consommation_radio (wh)], TotalConsommation, 0)

Pourcentage_Mesure =
DIVIDE(
    [Mesure_Sélectionnée],
    CALCULATE([Mesure_Sélectionnée], ALL('Table_Combinée'))
)
```

### 5. Cumuls fixe et radio pilotés par le filtre

Une seule mesure de cumul par réseau : elle renvoie la consommation ou la puissance selon le choix de l'utilisateur. Elle alimente les infobulles et les pourcentages.

```dax
Cumul Fixe =
VAR MesureChoisie = SELECTEDVALUE(SlicerTable[Mesure])
RETURN
SWITCH(
    TRUE(),
    MesureChoisie = "consommation wh", [Cumul Consommation Fixe],
    MesureChoisie = "puissance w",     [Cumul Puissance Fixe],
    BLANK()
)
```

### 6. Légende dynamique

Le texte de la légende se construit à partir du filtre et de la zone sélectionnée.

```dax
Légende_Dynamique_Radio =
VAR Selection = SELECTEDVALUE('SlicerTable'[Mesure])
RETURN
SWITCH(
    TRUE(),
    Selection = "puissance w",
        "Accès Radio - Puissance - " & SELECTEDVALUE('Radio'[ZONES]),
    Selection = "consommation wh",
        "Accès Radio - Consommation - " & SELECTEDVALUE('Radio'[ZONES]),
    BLANK()
)
```

**Une logique, plusieurs usages.** Presque toutes les mesures reposent sur le même schéma : lire le choix de l'utilisateur avec `SELECTEDVALUE`, puis aiguiller le calcul avec `SWITCH`. Cela évite de dupliquer les visuels et les pages.
