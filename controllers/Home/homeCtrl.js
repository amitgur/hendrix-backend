/**
 * Home page.
 */
exports.index = (req, res) => {
  res.render("homepage", {
    title: "Home",
    user: req.user ? req.user.name : null,
  });
};
