const min_freq = require("../config.json").min_freq;

module.exports = (bot, controller) => {

  const loop = require("./reloot.loop")(bot, controller);

  const reloot_display = require("./reloot.display")(bot);

  const add_regex = /^\/add(?:@\S*)?.*$/;
  const add_validation_regex = /^\/add(?:@\S*)? "(.*)" (\d+(?:\.\d+)?)$/;

  bot.onText(add_regex, (message) => {

    const chat_id = message.chat.id;
    const match = add_validation_regex.exec(message.text);

    if (match && Number(match[2] > min_freq)) {
      add({
        message: match[1],
        freq: match[2] * 1000 * 60,
        user_id: message.from.id,
        chat_id: chat_id,
        last_reloot: new Date()
      });
    } else {
      const help_message = `Usage: /add "<message>" <freq>\n⚠freq is in minutes and must be > ${min_freq}⚠`;
      bot.sendMessage(chat_id, help_message);
    }
  });

  /**
   * Add a reloot to the database, and then starts its loop and sends a message pack to the user to notify
   * @param {Object} req - object describing the new reloot
   * @property {string} req.message - the message to reloot
   * @property {string} req.user_id - unique identifier of the user who creates the reloot
   * @property {string} req.chat_id - the chat where the reloot was asked
   * @property {number} req.freq - time beetween reloots (milliseconds)
   * @property {Date} - req.last_reloot - last time the reloot was relooted
   */
  function add(req) {
    const chat_id = req.chat_id;
    controller.create(req)
      .then((reloot) =>
        reloot_display.display_reloot(reloot)
          .then((display_string) => {
            bot.sendMessage(
              chat_id,
              `*Reloot created*` + display_string,
              {parse_mode: "markdown"});
            setTimeout(() => loop.reloot_loop(reloot.dataValues.id), reloot.dataValues.freq);
          }));
  }

};