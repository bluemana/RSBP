/* global require */
/* global module */
/* global console */

(function () {
  // Log module status
  console.info("Loading configuration module...");

  // Declare required modules
  const Fs = require("fs");
  const Immutable = require("immutable");

  // Define constants and prepare modules
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

  // Make the configuration immutable
  result = Immutable.fromJS(result);

  // Export the configuration
  module.exports = result;

  // Log module status
  console.info("Loading configuration module... DONE");
}());
