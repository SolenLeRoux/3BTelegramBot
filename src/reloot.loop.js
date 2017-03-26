module.exports = (bot, controller) => {
  /**
   * Starts the reloot loop of every reloot stored in the database
   */
  function start_loops() {
    const now = new Date();
    controller.list()
      .then((reloots) => {
        for (let i = 0; i < reloots.length; i += 1) {
          const reloot = reloots[i];
          const wait_time = Math.max(0, reloot.dataValues.last_reloot.getTime() + reloot.dataValues.freq  - now.getTime());
          setTimeout(() => reloot_loop(reloot.dataValues.id), wait_time);
        }
      });
  }

  /**
   * Starts reloot loop associated to a specific reloot
   * @param {Number} id - unique id associated to a reloot
   */
  function reloot_loop(id) {
    const now = new Date();
    controller.get({id: id})
      .then(reloot => {
        if (reloot) {
          send_reloot(reloot)
            .then(() => controller.update({last_reloot: now}, {id: reloot.dataValues.id}))
            .then(() => setTimeout(() => reloot_loop(id), reloot.dataValues.freq))
            .catch((err) => {
              console.log(err)
            });
        }
      });
  }

  /**
   * Send the reloot message to the chat_id of the reloot
   * @param {Instance} reloot - reloot to send
   * @returns {Promise}
   */
  function send_reloot(reloot) {
    return bot.sendMessage(reloot.dataValues.chat_id, reloot.dataValues.message);
  }

  return {
    start_loops: start_loops,
    reloot_loop: reloot_loop
  }

};