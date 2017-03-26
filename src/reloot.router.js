module.exports = (bot, controller) => {
  require("./reloot.route.add")(bot, controller);
  require("./reloot.route.delete")(bot, controller);
  require("./reloot.route.list")(bot, controller);
};