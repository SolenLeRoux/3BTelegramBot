module.exports = (database) => {

  /**
   * Gets the first reloot described by req from the database
   * @param {Object} req - object describing the reloot to get
   * @property {number} id - unique id of the reloot to get
   * @returns {Promise.<Instance>} answer from sequelize
   */
  function get(req) {
    return database.Reloot.findOne({
      where: req
    });
  }

  /**
   * Adds a new reloot to the database
   * @param {Object} req - object describing the new reloot
   * @property {string} req.message - the message to reloot
   * @property {string} req.user_id - unique identifier of the user who creates the reloot
   * @property {string} req.chat_id - the chat where the reloot was asked
   * @property {number} req.freq - time beetween reloots (milliseconds)
   * @property {Date} - req.last_reloot - last time the reloot was relooted
   */
  function create(req) {
    return database.Reloot.create(req);
  }

  /**
   * Deletes reloots from the database
   * @param {Object} req - describes the reloots to remove
   * @property {number} req.id - unique id of a reloot
   * @property {string} req.user_id - optional, unique identifier of the user who creates the reloot
   * @property {string} req.chat_id - optional, the chat where the reloot was asked
   * @returns {Promise.<Number>} number of rows affected
   */
  function del(req) {
    return database.Reloot.destroy({
      where: req
    });
  }

  /**
   * Gets all the reloots described by req from the database
   * @param req - describes the reloots to get
   * @property {string} req.user_id - optional, unique identifier of the user who creates the reloot
   * @property {string} req.chat_id - optional, the chat where the reloot was asked
   * @returns {Promise.<Array[Instance]>}
   */
  function list(req) {
    return database.Reloot.findAll({
      where: req
    });
  }

  /**
   * @param {Object} values - values to modify
   * @property {string} values.message - the message to reloot
   * @property {string} values.user_id - unique identifier of the user who creates the reloot
   * @property {string} values.chat_id - the chat where the reloot was asked
   * @property {number} values.freq - time beetween reloots (milliseconds)
   * @param {Object} where - object describing the reloots to modify
   * @property {number} id - unique id of a reloot
   * @property {string} values.message - the message to reloot
   * @property {string} values.user_id - unique identifier of the user who creates the reloot
   * @property {string} values.chat_id - the chat where the reloot was asked
   * @property {number} values.freq - time beetween reloots (milliseconds)
   * @returns {Promise.<Number>} number of rows affected
   */
  function update(values, where) {
    return database.Reloot.update(values, {where: where});
  }

  return {
    get: get,
    create: create,
    list: list,
    del: del,
    update: update
  };

};




