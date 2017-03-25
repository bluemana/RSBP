/* global require */
/* global module */
/* global process */

(function () {

  // Declare required modules
  const Bunyan = require("bunyan");
  const Fs = require("fs");
  const Immutable = require("immutable");

  // Define constants
  const DEFAULT_CONFIG_FILE_PATH = "./config-default.json";
  const CONFIG_FILE_PATH = "./config.json";

  // Create the JSON configuration object
  let defaultContents = Fs.readFileSync(DEFAULT_CONFIG_FILE_PATH);
  let defaultJson = JSON.parse(defaultContents);
  let result = defaultJson;
  if (Fs.existsSync(CONFIG_FILE_PATH)) {
    let configContents = Fs.readFileSync(CONFIG_FILE_PATH);
    let configJson = JSON.parse(configContents);
    // Overwrite default configuration
    result = Object.assign(defaultJson, configJson);
  }

  // Parse the stream objects
  let streamsJson = result.logStreams;
  result.logStreams = undefined;
  let logStreams = [];
  for (let i in streamsJson) {
    let stream = streamsJson[i];
    if (stream.stream) {
      stream.stream = process[stream.stream];
    }
    logStreams.push(stream);
  }
  let createLogger = function (options) {
    options = Object.assign({}, options);
    options = Object.assign(options, {streams: logStreams});
    return Bunyan.createLogger(options);
  };

  // Finalize the configuration
  result = Immutable.fromJS(result);
  result.createLogger = createLogger;

  // Export the configuration
  module.exports = result;

  // Log module status
  let logger = result.createLogger({name: "config.js"});
  logger.info("Loading configuration module.... DONE");
}());
