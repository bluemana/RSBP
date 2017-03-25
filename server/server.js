/* global require */

// Declare required modules
const Bunyan = require("bunyan");
const Http = require("http");
const Express = require("express");
const Config = require("server/config");

// Log module status
let logger = Config.createLogger({
  name: "server.js",
  serializers: Bunyan.stdSerializers
});
logger.info("Setting up the server...");

// Define the Express middleware
let reqLogger = function (req, res, next) {
  logger.info({req: req});
  next();
};
let errLogger = function (err, req, res, next) {
  logger.error({err: err});
  next();
};

// Setup the Express middleware
let app = Express();
app.use(reqLogger);
app.use(Express.static(Config.get("usersDir"), {
  fallthrough: true
}));
app.use("/:username", Express.static("app", {
  fallthrough: false
}));
app.use(errLogger);

// Setup and start the HTTP server
let server = Http.createServer(app);
server.on("listening", function () {
  let host = server.address().address;
  let port = server.address().port;
  logger.info({host: host, port: port}, "Server listening");
});
server.on("error", function (err) {
  logger.error({err: err}, "HTTP server error");
});
server.listen(Config.get("port"));

// Log module status
logger.info("Setting up the server... DONE");
