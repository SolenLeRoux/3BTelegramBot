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

// Test
bot.onText(/\/test (.+)/, function (msg, match) {
    var fromId = msg.from.id;
    var resp = match[1];
    bot.sendMessage(fromId, config.token);
    setTimeout(bot.sendMessage(fromId, config.token), 3000);
});

// Any kind of message
bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    // photo can be: a file path, a stream or a Telegram file_id
    var photo = 'cats.png';
    bot.sendPhoto(chatId, photo, {caption: 'Lovely kittens'});
});