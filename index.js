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
    return [etage[12], etage[13]]
}

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

// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function (msg, match) {
    var fromId = msg.from.id;
    var resp = match[1];
    bot.sendMessage(fromId, "Je réponds : "+resp);
});

// Dit Bonjour à la personne
bot.onText(/\/bonjour/, function (msg, match) {
   var fromChat = msg.chat.id;
   var fromFirstName = msg.from.first_name;
   bot.sendMessage(fromChat, "Bonjour " + fromFirstName + " san")
});

// Test
bot.onText(/\/test (.+)/, function (msg, match) {
    var fromId = msg.from.id;
    var resp = match[1];
    bot.sendMessage(fromId, JSON.stringify(match));
});

// Any kind of message
bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    // photo can be: a file path, a stream or a Telegram file_id
    var photo = 'cats.png';
    bot.sendPhoto(chatId, photo, {caption: 'Lovely kittens'});
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