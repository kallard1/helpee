# HELPEE

## Pré-requis
- Savoir lire
- Savoir chercher sur google
- Node >= 10
- NPM >= 6
- Docker ou MongoDB

## How to
### Installation avec Docker
- Installez les packages node `npm install`
- Lancez le container `docker-compose up`
- Entrez dans le container : `docker exec -it helpee_mongo mongo`
- Accedez à la collection `use helpee` (confirmation par `switched to helpee`)
- Copiez et collez le code suivant dans la console en modifiant le mot de passe (`pwd`) et validez : 
```
db.createUser({
  user: "helpee",
  pwd: "<CHANGE ME>",
  roles: [{ role: "readWrite", db: "helpee" }]
})
```
- Quittez le container en faisant `CTRL + C`
- **Copiez/Collez** le fichier `.env.dist` en `.env` et remplacez le mot de passe `<CHANGE ME>` par celui saisi précédemment
- Lancer le serveur `npm run start:dev`.

Lorsque des modifications seront effectuées (assets/javascript) la compilation s'effectuera et le serveur local
se relancera automatiquement

Pour arrêter le serveur faites `CTRL + C` dans votre terminal

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
