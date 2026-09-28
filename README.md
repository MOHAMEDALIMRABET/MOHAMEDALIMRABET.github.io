# Portfolio

Site personnel statique (HTML/CSS/JS, sans framework ni dépendance) présentant une sélection de réalisations, de compétences et de documents.

## Aperçu local

Aucune installation nécessaire. Ouvrir directement `index.html` dans un navigateur, ou lancer un petit serveur local (recommandé pour que les liens relatifs se comportent comme en production) :

```powershell
cd C:\Users\moham\Documents\Projets\Portfolio
python -m http.server 8080
```

Puis ouvrir `http://127.0.0.1:8080`.

## Structure

```
index.html              page unique (toutes les sections)
galerie.html            galerie de preuves (images, vidéos, documents), par projet
assets/css/style.css    styles
assets/js/main.js       menu mobile + petite interactivité
assets/js/gallery.js    chargement et affichage de la galerie
assets/data/gallery.json  contenu de la galerie (à éditer pour ajouter des éléments)
assets/gallery/<projet>/  fichiers réels de la galerie (images, vidéos, documents)
assets/documents/       CV et certificats à ajouter (voir A-REMPLACER.txt)
```

## Ajouter un élément à la galerie

1. Déposer le fichier dans `assets/gallery/<projet>/` (créer le dossier si besoin).
2. Ajouter une entrée dans `assets/data/gallery.json` avec les champs `projet`, `specialite`, `titre`, `description`, `type` (`image`/`video`/`pdf`/`word`/`json`/`csv`) et `src` (chemin vers le fichier).
3. Aucune modification de code n'est nécessaire : les filtres et l'affichage se génèrent automatiquement à partir du JSON.

**Vidéos :** hébergées directement dans le dépôt par défaut (lecteur natif du navigateur). GitHub refuse les fichiers de plus de 100 Mo (50 Mo recommandé) — compresser les vidéos volumineuses avant ajout, ou ajouter un champ `"provider": "youtube"` (ou `"vimeo"`) dans l'entrée JSON pour intégrer une vidéo hébergée ailleurs à la place.

## À personnaliser avant publication

- Remplacer les textes marqués « Exemple à compléter » dans la section Réalisations.
- Remplacer les éléments d'exemple de `assets/data/gallery.json` par de vrais fichiers.
- Ajuster la section Compétences aux compétences réellement maîtrisées.
- Ajouter les vrais fichiers dans `assets/documents/` (CV.pdf, certificats).
- Mettre à jour le lien LinkedIn (actuellement un lien générique).
- Remplacer le bloc « Photo » de la section À propos par une vraie image si souhaité.

## Déploiement sur GitHub Pages

1. Créer un dépôt GitHub (ex. `Portfolio`) et y pousser ce projet.
2. Dans les paramètres du dépôt → *Pages*, choisir la branche `main` (ou `master`) et le dossier racine `/`.
3. Le site est publié à l'adresse fournie par GitHub (quelques minutes après activation).
