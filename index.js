var TelegramBot = require('node-telegram-bot-api');
var config = require('./config.json');

var etage = [
    ["B301", "Stepan"],
    ["B302", "Arnaud"],
    ["B303", "Haoliang"],
    ["B304", "Jiayi"],
    ["B305", "Guillaume"],
    ["B306", "Antoine"],
    ["B307", "Shoulong"],
    ["B308", "Yusu"],
    ["B309", "Raymond"],
    ["B310", "Edmond"],
    ["B311", "Vincent"],
    ["B312", "David"],
    ["B313", "Tatiana"],
    ["B314", "Owain"],
    ["B315", "Gaëlle"],
    ["B316", "Younes"],
    ["B317", "Solen"],
    ["B318", "Samy"],
    ["B319", "Gabriel"],
    ["B320", "Côme"],
    ["B321", "Maxime"],
    ["B322", "Kylian"],
    ["B323", "Martin"],
    ["B324", "Guillaume"]
];

function aQuiLeTour(date) {
    const debut = date - 1491177600; // on passe de Unix au nb de secondes depuis le 3 avril 2017
    const semaine = parseInt(debut / 604800); // on passe aux nombres de semaines s'étant écoulées depuis
    const tour = (semaine % 11) + 4;
    return [etage[tour * 2], etage[tour * 2 + 1]]
}

const test = require('./aquiletour');
//var funcTest = test.aQuiLeTour;

// Setup polling way
var bot = new TelegramBot(config.token, {polling: true});


bot.onText(/\/poubelle/, function(msg) {
    var fromChat = msg.chat.id;
    var duo = aQuiLeTour(msg.date);
    var chambre1 = duo[0][0];
    var chambre2 = duo[1][0];
    var prenom1 = duo[0][1];
    var prenom2 = duo[1][1];
    var resp = "Cette semaine, c'est au tour des chambres "
        + chambre1 + " et " + chambre2 + ", soit "
        + prenom1 + " et " + prenom2 ;
    bot.sendMessage(fromChat, resp);
});

// Dit Bonjour à la personne
bot.onText(/\/bonjour/, function (msg) {
   var fromChat = msg.chat.id;
   var fromFirstName = msg.from.first_name;
   bot.sendMessage(fromChat, "Bonjour " + fromFirstName + " san")
});

bot.onText(/\/bisou|\/calin|\/coeur/, function (msg) {
    var fromChat = msg.chat.id;
    var fromFirstName = msg.from.first_name;
    bot.sendMessage(fromChat, "Je ne comprends pas ces démonstrations d'affection, " + fromFirstName + " san")
});

// Help
bot.onText(/\/help/, function (msg) {
    var fromChat = msg.chat.id;
    var resp = "Je réponds actuellement aux commandes /bonjour et /poubelle";
    bot.sendMessage(fromChat, resp);
});

bot.onText(/\/ogenkidesuka/, function (msg) {
    var fromChat = msg.chat.id;
    var resp = "O genki desu";
    bot.sendMessage(fromChat, resp);
});

bot.onText(/\/aurevoir/, function (msg) {
    var fromChat = msg.chat.id;
    var fromFirstName = msg.from.first_name;
    var resp = "Au revoir " + fromFirstName + " san";
    bot.sendMessage(fromChat, resp);
});

bot.onText(/\/bonnenuit/, function (msg) {
    var fromChat = msg.chat.id;
    var fromFirstName = msg.from.first_name;
    var resp = "Dormez bien, " + fromFirstName + " san";
    bot.sendMessage(fromChat, resp);
});

bot.onText(/\/manger/, function (msg) {
    var fromChat = msg.chat.id;
    var resp = "Seulement si vous faites la vaisselle après";
    bot.sendMessage(fromChat, resp);
});

bot.onText(/\/vaisselle/, function (msg) {
    var fromChat = msg.chat.id;
    var resp = "Si vous n'avez pas le temps de faire votre vaisselle, amenez-la chez vous. Il n'y a pas d'excuse pour salir l'étage.";
    bot.sendMessage(fromChat, resp);
});

bot.onText(/\/ricecooker/, function (msg) {
    var fromChat = msg.chat.id;
    var resp = "Si vous comptez utiliser le Rice Cooker de Shin, n'oubliez pas de l'éteindre après usage et de le laver avec une éponge douce sans trop frotter.";
    bot.sendMessage(fromChat, resp);
});

bot.onText(/\/ivan|\/anniversaire/, function (msg) {
    var fromChat = msg.chat.id;
    var resp = "Joyeux anniversaire Ivan san !";
    bot.sendMessage(fromChat, resp);
});

bot.onText(/\/eau/, function (msg) {
    var fromChat = msg.chat.id;
    var resp = "Ca n'a pas l'odeur de l'abricot";
    bot.sendMessage(fromChat, resp);
});

bot.onText(/\/boire|\/soiree/, function (msg) {
    var fromChat = msg.chat.id;
    var resp = "Vous êtes priés de fermer les portes du salon d'étage lors des soirées et de tout nettoyer le lendemain matin, merci";
    bot.sendMessage(fromChat, resp);
});

bot.onText(/\/four/, function (msg) {
    var fromChat = msg.chat.id;
    var resp = "Si vous comptez utiliser le four de Shin, ne posez rien à même la plaque, utilisez du papier cuisson";
    bot.sendMessage(fromChat, resp);
});

bot.onText(/\/testpersodesolen/, function (msg) {
    var fromChat = msg.chat.id;
    var resp = test(0);
    bot.sendMessage(fromChat, resp);
});

bot.onText(/\/loli/, function (msg) {
    var fromChat = msg.chat.id;
    var resp = "Selon l'article 227-25 du code pénal, le fait, par un majeur, d'exercer sans violence, contrainte, menace ni surprise une atteinte sexuelle sur la personne d'un mineur de quinze ans est puni de cinq ans d'emprisonnement et de 75 000 euros d'amende.";
    bot.sendMessage(fromChat, resp);
});

bot.onText(/\/disbonjoura (.+)/, function (msg) {
    var fromChat = msg.chat.id;
    var name = msg.text.split(' ');
    var resp = "Bonjour " + name[1] + " san";
    bot.sendMessage(fromChat, resp);
});

/* Que contient msg ? C'est un JSON de la forme suivante pour un chat privé :
{
message_id : int,
from : {
    id : int,
    first_name : string,
    last_name : string,
    username : string
},
chat : {
    id : int,
    first_name : string,
    last_name : string,
    username : string,
    type : string (ex : 'private')
},
date : int, (ex : 1491640778)
text : string, (content of the message)
entitites : [{
    type : string, (ex : bot_command)
    offset : int, (ex : 0)
    length : int (ex : 5)
}]}

et de la forme suivante pour un chat normal :

 {
 message_id : int,
 from : {
     id : int,
     first_name : string,
     last_name : string,
     username : string
 },
 chat : {
     id : int,
     title : string,
     type : string (ex : 'groupe')
     all_members_are_administrators : bool
 },
 date : int, (ex : 1491640778)
 text : string, (content of the message)
 entitites : [{
     type : string, (ex : bot_command)
     offset : int, (ex : 0)
     length : int (ex : 5)
 }]}


 */

/* match contient un array composé en [0] du message originel,
et en [1] du message amputé de la commande /echo ou /qqch
 */
