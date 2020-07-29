const fs = require("fs");
const path = require("path");

module.exports = function (app, passportConfig) {
  fs.readdir("./controllers", function (err, filenames) {
    if (err) {
      console.log(err);
      return;
    }

    filenames.forEach(function (dir) {
      const routeFile = path.join(
        __dirname,
        `../controllers/${dir}/${dir.toLowerCase()}Routes.js`
      );

      try {
        if (fs.existsSync(routeFile)) {
          require(routeFile)(app);
        } else {
          console.error(`Error: can't find route file: ${routeFile}`);
          process.exit(1);
        }
      } catch (err) {
        console.error(`Error: in route file: ${routeFile}`);
        console.error(err);
        process.exit(1);
      }
    });
  });
};
