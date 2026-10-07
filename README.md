# Animora 4.0

Projet React/Vite prêt pour un test local et un déploiement statique.

## Ce qui est inclus
- Catalogue dynamique via Jikan (aucune dépendance à AniList).
- Recherche, populaires et saison actuelle.
- Fiches anime avec relations/suites détectées par les données du catalogue.
- Épisodes et lecteur Animora 1 / 2 / 3.
- Sources MP4/WebM/Ogg/HLS et iframes autorisées configurables par épisode.
- Mode de démonstration du lecteur avec une vidéo publique de test.
- Favoris.
- Comptes de démonstration stockés localement.
- Politique de confidentialité et conditions d'utilisation.
- Interface responsive PC/mobile.

## Lancer
npm install
npm run dev

## Production
npm run build

Le dossier `dist/` peut être publié sur un hébergement statique compatible Vite/GitHub Pages.

## Important
Le projet ne fournit pas de flux d'épisodes protégés et ne copie pas le code propriétaire d'un autre site. Les sources ajoutées dans les lecteurs doivent être des sources que tu as le droit de diffuser.

Pour de vrais comptes synchronisés entre plusieurs appareils, remplace `src/lib/store.js` par une authentification/backend (par exemple Supabase ou Firebase) et ne stocke jamais les mots de passe en clair en production.
