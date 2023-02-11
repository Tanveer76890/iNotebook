if (process.env.NODE_ENV == "production") {
  module.exports = require("./proc");
} else {
  module.exports = require("./dev");
}
