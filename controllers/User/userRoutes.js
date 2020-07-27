const userCtrl = require("./userCtrl");
const passport = require("passport");

// login
module.exports = function (app) {
  app.post(
    "/sign_in",
    passport.authenticate("local", { failureFlash: true }),
    function (req, res) {
      res.json({ name: req.user.name });
    }
  );
  app.post("/sign_up", userCtrl.signUp);
  app.post("/sign_out", userCtrl.signOut);
  app.get("/get_user", userCtrl.getUser);
  app.get("/get_message", userCtrl.getMessage);
};
