# HELPEE

## Pré-requis
- Node >= 10
- NPM >= 6
- Docker

## How to
### Installation
- Installer les packages node `npm install`
- Installer knex `npm i -g knex`
- **Copier** le fichier `.env.dist` en `.env` et modifier les paramètres si nécessaire (si utilisation
de docker, laisser la configuration par défaut)
- Effectuer un pre-start `npm run prestart` (cela sera très utile pour utiliser _knex_ afin de créer les migrations)
- Executer les migrations `./node_modules/.bin/cross-env NODE_ENV=development knex migrate:latest`
- Lancer le serveur `npm run start:dev`.

Lorsque des modifications seront effectuées (assets/typescript) la compilation s'effectuera et le serveur
se relancera automatiquement

Pour quitter le serveur faites `CTRL + c` dans votre terminal

## Normes
1. 120 caractères maximum sur une seule ligne
2. Une indentation de 2 espaces
3. Les variables utilisent le camelCase pour les variables
4. Les classes utilisent le PascalCase
5. Les classes et id css utilisent le snake-case
6. Pensez à laisser une ligne vide en fin de fichier
7. Penser à commiter a chaque modification et utilisez une description claire de ce que vous avez fait.
Conseil pour nommer vos commits : https://www.grafikart.fr/tutoriels/nommage-commit-1009
8. Quoi que dise le linter, il a **toujours** raison (sauf quand il a tort ce qui est rare).
