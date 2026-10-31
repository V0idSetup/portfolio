# Portfolio électronique

## Lancer le site
Ouvre le dossier dans VS Code et utilise l'extension **Live Server**, ou lance :
`python3 -m http.server` puis ouvre http://localhost:8000
(Un serveur est nécessaire pour la détection automatique des PDF ; en ligne, GitHub Pages convient.)

## Modifier le contenu
- `js/projets.js` : ton profil, les catégories et la liste des projets.
- `js/competences.js` : les pastilles (C++, Java, Arduino, 3D...). Ajoute-en en copiant une ligne.
- `css/style.css` : couleurs (variables en haut du fichier) et mise en page.
- `assets/moi.webp` : ta photo (optionnelle, sinon tes initiales s'affichent).

## Ajouter un projet
1. Crée `Projets/nom-du-projet/` avec : `front.webp` (vignette, facultative : sans elle, `img1.webp` est utilisée), `img1.webp`, `img2.webp`...,
   `video1.mp4`..., `doc1.pdf`... (numérotation sans trou).
2. Copie un bloc dans `PROJETS` (js/projets.js) : dossier, titre, categorie ("info", "iot" ou "wip"),
   resume, texte, competences.
La galerie s'adapte au nombre de médias et les PDF sont lus directement dans la page.

Les projets et images fournis sont des exemples : supprime-les quand tu ajoutes les tiens.

## Photo
Dépose ta photo dans `assets/` (webp, jpg ou png) et mets son chemin dans `PROFIL.photo` (js/projets.js).
Par défaut : `assets/moi.webp`. Sans photo, tes initiales s'affichent.

## Mode nuit
Bouton ☾/☀ en haut à droite. Le choix est mémorisé ; au premier passage, le thème du système est utilisé.
Les couleurs du mode nuit sont en bas de `css/style.css` (bloc `:root[data-theme="dark"]`).

## Français / English
Bouton FR/EN en haut à droite (la langue du navigateur est utilisée au premier passage).
- Textes de l'interface : `js/i18n.js`.
- Contenu : écris `{ fr: "...", en: "..." }` à la place d'un texte simple (titres, résumés, textes de projets,
  profil, catégories). Un texte simple reste identique dans les deux langues.
- Compétences : ajoute `en: "..."` dans `js/competences.js` si le nom change en anglais.

## Description sous chaque partie
Dans `CATEGORIES` (js/projets.js), le champ `desc` s'affiche sous le titre de la partie
(Informatique, Physique, Non aboutis). Un paragraphe : `{ fr: "...", en: "..." }` ;
plusieurs : `{ fr: ["...", "..."], en: ["...", "..."] }`.

## Section Parcours & développement
Objet `CARRIERE` (bas de js/projets.js) : une liste de blocs avec titre, texte et vidéo optionnelle.
- `video: "assets/parcours.mp4"` (fichier mp4/webm dans assets/) ou un lien YouTube / Vimeo.
- Sans `video` : bloc texte seul. Sans `texte` : vidéo seule. `blocs: []` masque la section.
- La vidéo fournie (`assets/parcours.mp4`) est une mire de test : remplace-la par la tienne.
