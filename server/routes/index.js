const chalk = require("chalk");

const apiRoutes = require("./apis");

const init = server => {
  server.use("/api", apiRoutes);
};

module.exports = {
  init
};
