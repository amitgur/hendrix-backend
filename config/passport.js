/*jslint node: true */ "use strict";

const mongoose = require("mongoose"),
  LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  console.log("Loading user environment for passport");

  const Users = mongoose.model("User");

  // Serialize sessions
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    Users.findOne(
      {
        _id: id,
      },
      "-salt -hashed_password",
      function (err, user) {
        done(err, user);
      }
    );
  });

  // Use local strategy
  passport.use(
    new LocalStrategy(function (username, password, done) {
      Users.findOne(
        {
          username: username,
        },
        function (err, user) {
          if (err) {
            return done(null, false, {
              message: "תקלה בכניסת משתמש",
            });
          }
          if (!user) {
            return done(null, false, {
              message: "לא מצאנו את המייל שהזנתם",
            });
          }
          if (!user.authenticate(password)) {
            return done(null, false, {
              message: "הסיסמא אינה נכונה",
            });
          }
          return done(null, user);
        }
      );
    })
  );
};
