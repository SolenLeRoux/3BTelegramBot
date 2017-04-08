# 3B bot

Ce bot permet d'envoyer des messages à intervalles réguliers afin d'aider les gens à se rappeler qu'il faut faire les tâches ménagères.

## Commandes à envoyer au BotFather

```

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
$ screen -d -m -c config.screenrc -S 3B_bot
```

Pour arrêter le bot, faire

```bash
$ screen -X -S [id_du_screen] quit
```