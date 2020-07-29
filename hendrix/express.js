const path = require("path");
const express = require("express");
const expressStatusMonitor = require("express-status-monitor");
const compression = require("compression");
cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const lusca = require("lusca");
const errorHandler = require("errorhandler");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

module.exports = function (app, passport, passportConfig, router) {
  /**
   * Express configuration.
   */

  app.use(cors());

  app.set("port", process.env.PORT || 8080);
  app.set("views", path.normalize(__dirname + "/..") + "/views");

  app.engine("pug", require("pug").__express);
  app.engine("html", require("swig").renderFile);
  app.set("view engine", "pug");

  // add status monitor to localhost:YOUR-PORT/status
  app.use(expressStatusMonitor());

  // The middleware will attempt to compress response bodies for all request
  app.use(compression());

  // logging rest calls
  app.use(logger("dev"));

  app.use(cookieParser());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
      name: "paymentApp",
      cookie: {
        maxAge: 1209600000,
      }, // two weeks in milliseconds
      store: new MongoStore({
        url: process.env.MONGODB_URI,
        autoReconnect: true,
      }),
    })
  );
  app.use(passport.initialize());

  // session through passport
  app.use(passport.session());

  // flash message
  app.use(flash());

  // security
  app.use(
    lusca({
      xframe: "SAMEORIGIN",
      xssProtection: true,
      referrerPolicy: "same-origin",
    })
  );

  app.disable("x-powered-by");

  // serve the app
  /* no need for static
  app.use(
    "/app",
    express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
  );
 */
  app.use("/apiV1", router);

  /**
   * Error Handler.
   */
  if (process.env.NODE_ENV === "development") {
    // only use in development
    app.use(errorHandler());
  } else {
    app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).send("Server Error");
    });
  }
};
