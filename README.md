# Reloot Bot

Ce bot permet d'envoyer des messages à intervalles réguliers sur les chats sur lesquels il est ajouté.

## Commandes à envoyer au BotFather

```
add - adds a reloot
delete - deletes an activated reloot 
list - lists the activated reloots
```

## Utilisation

Lancez les commandes, c'est assez intuitif.

## Avant de lancer le bot

Mettre un token dans un `config.json` situé à la racine du dossier:

```json
{
  "token": "votre token",
  "min_freq": 30 // minutes
}
```

et faites un `npm install` pour installer les dépendances.

## Lancement du bot dans un screen détaché

Placez vous dans le dossier du bot puis:

```bash
$ screen -d -m -c config.screenrc -S reloot_bot
```