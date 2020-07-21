module.exports = () => {
  const Command = require("./Command");

  const Delete = Object.create(Command);

  Delete.prototype.process = function () {
    console.log("deleting");
  };

  return Delete;
};
