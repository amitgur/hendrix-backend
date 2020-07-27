module.exports = function (app, passportConfig) {
  require("../modules/Home/homeRoutes")(app);
  require("../modules/ProductSet/productSetRoutes")(app);
  require("../modules/Payment/paymentRoutes")(app);
  require("../modules/User/userRoutes")(app);
  require("../modules/System/systemRoutes")(app);
};
