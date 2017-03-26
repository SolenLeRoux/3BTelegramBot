const escape_md = require("markdown-escape");

module.exports = (bot) => {

  /**
   * Returns a markdown formatted string containing the inputs
   * @param id
   * @param message
   * @param freq
   * @param username
   * @returns {string}
   */
  function generate_display_string(id, message, freq, username) {
    return `\n*Id:* ${id}` +
      `\n*Message:* "${escape_md(message)}"` +
      `\n*Frequence:* ${freq / 1000 / 60}min` +
      `\n*Created by:* ${escape_md(username)}`;
  }

  /**
   * Fetch the creator's username from Telegram and then returns a markdown formatted string
   * containing the main info about the reloot
   * @param {Instance} reloot
   * @returns {Promise.<string>}
   */
  function display_reloot(reloot) {
    return bot.getChatMember(reloot.dataValues.chat_id, reloot.dataValues.user_id)
      .then((user_value) => user_value.user.username)
      .catch(() => "Unknown user.")
      .then((username) =>
        generate_display_string(reloot.dataValues.id, reloot.dataValues.message,
          reloot.dataValues.freq, username)
      );
  }

  /**
   * Returns a markdown formatted string containing the main info about the reloots
   * @param reloots
   * @returns {Promise.<TResult>}
   */
  function display_reloots(reloots) {
    let promises = [];

    for (reloot of reloots) {
      promises.push(display_reloot(reloot));
    }

    return Promise.all(promises)
      .then((displays) => {
        let string = "";
        for (e of displays) {
          string += e + "\n";
        }
        return string;
      });
  }

  return {
    display_reloot: display_reloot,
    display_reloots: display_reloots
  }

};