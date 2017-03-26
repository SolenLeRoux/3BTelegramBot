const Sequelize = require("sequelize");

const sequelize = new Sequelize("main", "", "", {
  storage: "./db.sqlite",
  dialect: "sqlite"
});

const Reloot = require("./reloot.model")(sequelize);

module.exports = {
  db: sequelize,
  Reloot: Reloot
};