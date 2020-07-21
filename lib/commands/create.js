const Command = require("./Command");
const Create = Object.create(Command);

Create.prototype.requiredArgs = ["hola"];

module.exports = Create;
