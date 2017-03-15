/* global require */
/* global console */

// Declare required modules
const Express = require("express");
const Config = require("server/config");

// Log module status
console.info("Setting up the server...");

// Define the Express middleware
let reqLogger = function (req, res, next) {
  console.info("Received request: " + req.method + " " + req.protocol + "://" + req.hostname + req.path);
  next();
};
let errLogger = function (err, req, res, next) {
  console.error(err.stack);
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

// Listen to requests
let server = app.listen(Config.get("port"), function (err) {
  if (!err) {
    let host = server.address().address;
    let port = server.address().port;
    console.info("Server listening at http://" + host + ":" + port);
  } else {
    console.error("Cannot start the server: " + err);
  }
});

// Log module status
console.info("Setting up the server... DONE");
