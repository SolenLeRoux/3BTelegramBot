module.exports = (bot, controller) => {

  const reloot_display = require("./reloot.display")(bot);

  const list_regex = /^\/list(?:@\S*).*?$/;
  bot.onText(list_regex, (message) => {
    const chat_id = message.chat.id;

    controller.list({chat_id: chat_id})
      .then((reloots_chat) => {
        if (reloots_chat.length == 0) {
          bot.sendMessage(chat_id, "No activated reloots on this chat.")
        }
        else {
          reloot_display.display_reloots(reloots_chat)
            .then((display) =>
              bot.sendMessage(
                message.chat.id,
                "*Reloots activated on this chat*\n" + display,
                {parse_mode: "markdown"})
            );
        }
      });

  });

};