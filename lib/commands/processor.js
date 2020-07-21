const execa = require("execa");
const Listr = require("listr");

const Command = require("./Command");
const create_cmd = require("./create");
const delete_cmd = require("./delete");

const Processor = function (command) {
  switch (command) {
    case "create":
      create_cmd().prototype.process();
      break;
    case "delete":
      delete_cmd().prototype.process();
      break;
    default:
      if (Command.prototype.templateExists(command)) {
        let template = Command.prototype.getTemplate(command);
        if (template) {
          const tasks = new Listr([
            {
              title: "Whipping a new project",
              task: () => execa("npm", ["init", "-y"]),
            },
            {
              title: "Installing dependencies",
              task: () =>
                execa("npm", ["install", ...template.dependencies.split(" ")]),
              skip: () => {
                if (template.dependencies.length === 0) {
                  return "No dependencies to install";
                }
              },
            },
            {
              title: "Installing dev-dependencies",
              task: () =>
                execa("npm", [
                  "install",
                  ...template.devDependencies.split(" "),
                  "--save-dev",
                ]),
              skip: () => {
                if (template.devDependencies.length === 0) {
                  return "No dev-dependencies to install";
                }
              },
            },
          ]);

          tasks.run().catch((err) => {
            console.error(err);
          });
        }
        return true;
      }
      console.error(`💥${command} is not a supported command!`);
      break;
  }
};

module.exports = Processor;
