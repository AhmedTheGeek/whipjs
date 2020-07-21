const prompts = require("prompts");
const nconf = require("nconf");
const fs = require("fs");
const configPath = "../config.json";
let config = null;

try {
  config = JSON.parse(fs.readFileSync(configPath).toString());
} catch (err) {
  /* 😱 Dafaaas 😱 */
}

nconf.argv().env().file({ file: "../config.json" });

function Command() {}

Command.prototype.requiredArgs = [];
Command.prototype.process = () => {};
Command.prototype.questions = [];

Command.prototype.askQuestions = async function () {
  return await prompts(this.questions);
};

Command.prototype.templateExists = (name) => {
  if (config != null) {
    return config && config.hasOwnProperty(name);
  }
  return false;
};

Command.prototype.getTemplate = function (name) {
  if (this.templateExists(name)) {
    return config[name];
  }
  return null;
};

Command.prototype.saveObject = (key, object) => {
  nconf.set(key, object);
  nconf.save();
};

module.exports = Command;
