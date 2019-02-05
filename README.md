# HELPEE

## Pré-requis
- Node >= 10
- NPM >= 6
- Docker

## How to
### Installation
- Installer les packages node `npm install`
- **Copier** le fichier `config.ts.dist` en `config.ts` et modifier les paramètres si nécessaire (si utilisation de
docker, laisser la configuration par défaut)
- Effectuer un pre-start `npm run prestart` (cela sera très utile pour utiliser _knex_ pour créer les migrations)
- Executer les migrations `./node_modules/.bin/cross-env NODE_ENV=development knex migrate:latest`
- Lancer le serveur `npm run start:dev`.

Lorsque vous effectuerez la moindre modification (assets/fichier typescript) la compilation s'effectuera et le serveur
se relancera automatiquement

Pour quitter le serveur faites `CTRL + c` dans votre terminalt