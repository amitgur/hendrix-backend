/**
 * Module dependencies.
 */
const express = require("express");
const chalk = require("chalk");
const dotenv = require("dotenv");
const path = require("path");
const passport = require("passport");

// Load environment variables from .env file to process.env, where API keys and passwords are configured.
dotenv.config({ path: ".env" });

// connect to mongo
require("./config/mongoose")();

// register mongoose models
require("./models");

// create passport
const passportConfig = require("./config/passport")(passport);

/**
 * Create Express server.
 */
const app = express();

// Initialise routes by arguments
const router = express.Router();
require("./config/routes")(router, passportConfig);

// express setup
require("./config/express")(app, passport, passportConfig, router);

require("./controllers/bnpEmail/sendGridHandler").initSendGrid();

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(
    "%s App is running at http://localhost:%d in %s mode",
    chalk.green("✓"),
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
