var TelegramBot = require('node-telegram-bot-api');
var config = require('./config.json');

// Setup polling way
var bot = new TelegramBot(config.token, {polling: true});

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
   var fromLastName = msg.from.last_name;
   bot.sendMessage(fromChat, "Bonjour " + fromFirstName + " " + fromLastName)
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