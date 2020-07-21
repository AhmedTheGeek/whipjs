const handler = function (command, args = {}) {
  this.currentCommand = command;
  this.args = args;
  this.supported = [
    {
      name: "create",
    },
    {
      name: "delete",
    },
    {
      name: "edit",
    },
  ];

  this.isSupported = function (name) {
    return this.supported.filter((command) => command.name === name).length > 0;
  };

  if (this.isSupported(command)) {
    console.log(`trying to execute ${command}`);
  } else {
    throw new Error(`${command} not supported!`);
  }
};

module.exports = handler;
