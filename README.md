# Site Web


## Projet de fractionnement

### Utilisation seule

Télécharger le dossier Plane (le plus simple est de tout télécharger).

Puis ouvrir le fichier main.html.

### Incorporation dans un SharePoint

Télécharger le dossier Plane.

Renommer main.html en main.aspx et changer l'encodage de UTF8 à ANSI (ouvrir `Bloc Notes`, `Enregistrer sous...` et choisir le format dans le menu déroulant `ANSI`).

Remplacer les caractères invalides (`?` par un caractère ANSI ie disponible sur le clavier).

### Amélioration

Pour ajouter un avion, il suffit de modifier le contenu de plane_type.js en ajoutant un élément à la liste. Il suffit de respecter le format déjà utilisé.

Pour le paramètre 'apparence', chaque ligne correspond à une rangée dans l'avion (on peut les duppliquer avec '*[nb]'). 

Différentes valeurs :
 - 'X' : espace bloquée
 - '0' : espace vide
 - '[n° de cable]' : siège de ce cable
 - 'R' : siège réservé
 - '<' ou '>' : porte de sortie

