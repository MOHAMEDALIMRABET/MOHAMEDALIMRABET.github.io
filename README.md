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
assets/css/style.css    styles
assets/js/main.js       menu mobile + petite interactivité
assets/documents/       CV et certificats à ajouter (voir A-REMPLACER.txt)
```

## À personnaliser avant publication

- Remplacer les textes marqués « Exemple à compléter » dans la section Réalisations.
- Ajuster la section Compétences aux compétences réellement maîtrisées.
- Ajouter les vrais fichiers dans `assets/documents/` (CV.pdf, certificats).
- Mettre à jour le lien LinkedIn (actuellement un lien générique).
- Remplacer le bloc « Photo » de la section À propos par une vraie image si souhaité.

## Déploiement sur GitHub Pages

1. Créer un dépôt GitHub (ex. `Portfolio`) et y pousser ce projet.
2. Dans les paramètres du dépôt → *Pages*, choisir la branche `main` (ou `master`) et le dossier racine `/`.
3. Le site est publié à l'adresse fournie par GitHub (quelques minutes après activation).
