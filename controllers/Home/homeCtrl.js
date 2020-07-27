/**
 * Home page.
 */
exports.index = (req, res) => {
  console.log("user");
  console.log(req.user);
  console.log("session");
  console.log(req.session);
  res.render("homepage", {
    title: "Home",
    user: req.user ? req.user.username : "No User Found",
  });
};
