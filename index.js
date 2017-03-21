const token = require("./config").token;

const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(token);

const database = require("./src/database");
const controller = require("./src/reloot.controller")(database);
const router = require("./src/reloot.router");
const loop = require("./src/reloot.loop")(bot, controller);

database.db.sync()
  .then(() => {
    router(bot, controller); // adding routes
    bot.startPolling(); // listening for commands
    loop.start_loops(); // looping to reloot
  });

