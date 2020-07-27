// Sign in

const User = require("../../models/User");

// SignUp Admin Post
exports.signUp = function (req, res, next) {
  if (req.body.magicWord !== process.env.MAGIC_WORD) {
    const info = "username: " + req.body.username;
    return res.status(403).json({ message: "מילת הקסם אינה נכונה" });
  }

  delete req.body.magicWord;
  console.log(req.body);
  let user = new User(req.body);
  let message = null;

  user.save(function (err) {
    if (err) {
      console.log("Error in create user: " + err, "error");
      console.log(req.body);
      console.log(err);
      switch (err.code) {
        case 11000:
        case 11001:
          message = "  Username already exists ";
          break;
        default:
          message = "  Please fill all the required fields";
      }

      return next(new Error(`Error during creating new user: ${message}`));
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.sendStatus(200);
    });
  });
};

exports.signOut = async function (req, res) {
  await req.logOut();
  req.session.destroy(function (err) {
    return res.sendStatus(200);
  });
};

exports.getUser = function (req, res) {
  if (!req.user) {
    return res.status(403).json({ message: "לא נמצא משתמש מחובר" });
  } else {
    return res.json({ name: req.user.name });
  }
};

exports.getMessage = function (req, res) {
  let msg = req.flash();
  if (msg.hasOwnProperty("error")) {
    msg = msg.error[0];
  }
  return res.json({ message: msg });
};

exports.authenticateAdmin = function (req, res, next) {
  let err;

  console.log(req.user);

  if (!req.user) {
    return res.status(403).json({ message: "לא נמצא משתמש מחובר" });
  }
  req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 60; // 2 month session

  console.log("Authenticate administrator " + req.user.username);

  return next();
};
