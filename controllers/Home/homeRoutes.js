/* homepage */

const homeController = require("./homeCtrl");

module.exports = function (app) {
  app.get("/", homeController.index);
};
