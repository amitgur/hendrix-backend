const winston = require("winston");
const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "../", process.env.LOG_DIR);

// create log dir
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// create logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({
      filename: path.join(dir, "/error.log"),
      level: "error",
    }),
    new winston.transports.File({ filename: path.join(dir, "/combined.log") }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

logger.info("using winston logger");
exports.logger = logger;
