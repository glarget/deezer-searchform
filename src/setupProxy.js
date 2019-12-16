const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  var options = {
    target: "http://api.deezer.com",
    secure: false,
    changeOrigin: true
  };

  app.use(proxy("/search", options));
};
