/* global require */
/* global console */

// Declare required modules
const Express = require("express");
const Config = require("server/config");

// Log module status
console.info("Setting up the server...");

// Setup the server
let app = Express();
let reqLogger = function (req, res, next) {
  console.info("Received request: " + req.method + " " + req.protocol + "://" + req.hostname + req.path);
  next();
};
let errLogger = function (err, req, res, next) {
  console.error(err.stack);
  next();
};

// Configure the application
app.use(reqLogger);
app.use(Express.static("app"));
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
