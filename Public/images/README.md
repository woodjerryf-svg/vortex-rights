# 📁 Dossier Images - Vortex Rights

## Structure organisée

Les images du site ont été remplacées et bien organisées dans ce dossier. Voici l'organisation :

### 📸 Images disponibles

| Fichier | Utilisation | Description |
|---------|------------|-------------|
| **favicon.jpg** | Logo du site (onglet) | Icône affichée dans l'onglet du navigateur |
| **hero.jpg** | Image héros/accueil | Image de fond principal de la page d'accueil |
| **studio.jpg** | Section Services - Administration | Studio/équipement professionnel |
| **performer.jpg** | Performer et Teamwork | Image de personne/artiste en action |
| **mixing.jpg** | Section Services - Protection | Console de mixage et production |
| **artist.jpg** | Section À Propos | Portrait d'artiste |
| **concert.jpg** | Section Services - Branding | Image de concert/performance en direct |
| **headphones.jpg** | Galerie Services | Casques/équipement audio |
| **logo.jpg** | Branding - Vinyl & Phone | Logo utilisé pour elements de design |

## Chemin des images

Toutes les images sont référencées via les chemins :
```
./Public/images/[filename].jpg
```

## Remplacement des sources

✅ **Avant** : URLs Unsplash (dépendances externes)
- Images chargées depuis `images.unsplash.com`
- Risque de perte d'accès/changement de licence

✅ **Après** : Images locales (auto-hébergées)
- Toutes les images sont stockées localement
- Performance améliorée (pas de dépendance externe)
- Contrôle total sur les droits d'auteur

## Gestion des fichiers

- Si vous modifiez une image : remplacez le fichier avec le même nom
- Si vous ajoutez une nouvelle image : créez l'image et mettez à jour le fichier JSX
- Les noms de fichiers sont clairs et autodocumentés

**Dernière mise à jour :** 17 avril 2026
