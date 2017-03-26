module.exports = (bot, controller) => {

  const reloot_display = require("./reloot.display")(bot);

  const delete_regex = /^\/delete(?:@\S*)?.*$/;
  const delete_validation_regex = /^\/delete(?:@\S*)? (\d+)$/;

  bot.onText(delete_regex, (message) => {
    const chat_id = message.chat.id;
    const match = delete_validation_regex.exec(message.text);

    if (match) {
      del({
        id: match[1],
        chat_id: chat_id
      });
    } else {
      bot.sendMessage(chat_id, 'Usage: /delete <id>')
    }
  });

  /**
   * Deletes a reloot and the sends back a message to the user to notify
   * @param {Object} req - object describing the new reloot
   * @property {number} id - unique id of the reloot to delete
   * @property {number} chat_id - unique id of the chat associated to the reloot
   *  (useful to avoid deleting a reloot from another chat)
   */
  function del(req) {
    const chat_id = req.chat_id;
    controller.get(req)
      .then((reloot) => {
        if (reloot) {
          controller.del(req)
            .then(() =>
              reloot_display.display_reloot(reloot)
                .then((display) => bot.sendMessage(
                  chat_id,
                  `*Reloot deleted*` + display,
                  {parse_mode: "markdown"}
                ))
            );
        } else {
          bot.sendMessage(chat_id, "No reloot to delete.")
        }
      })
  }

};