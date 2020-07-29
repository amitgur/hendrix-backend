/**
 * Logger
 */

const logger = require("../../hendrix/logger").logger;

exports.getLoggerDocs = function (req, res, next) {
  const hours = req.params.hours;

  const options = {
    from: new Date() - hours * 60 * 60 * 1000,
    until: new Date(),
    limit: 10,
    start: 0,
    order: "desc",
    fields: ["message", "level", "timestamp"],
  };

  logger.query(options, function (err, results) {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
};
