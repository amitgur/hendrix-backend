/* homepage */

const loggerCtrl = require("./loggerCtrl");

module.exports = function (app) {
  app.get("/get_logger_docs", loggerCtrl.getLoggerDocs);
};
