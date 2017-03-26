const Sequelize = require("sequelize");

module.exports = (sequelize) => sequelize.define("reloot", {
  message: {
    type: Sequelize.STRING,
    field: "message",
    allowNull: false
  },
  user_id: {
    type: Sequelize.STRING,
    field: "user_id",
    allowNull: false
  },
  chat_id: {
    type: Sequelize.STRING,
    field: "chat_id",
    allowNull: false
  },
  freq: {
    type: Sequelize.INTEGER, // milliseconds
    field: "freq",
    allowNull: false
  },
  last_reloot: {
    type: Sequelize.DATE,
    field: "last_reloot",
    allowNull: false
  }
}, {
  tableName: "reloot"
});
