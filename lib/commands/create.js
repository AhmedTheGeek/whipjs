module.exports = () => {
  const Command = require("./Command");

  const Create = Object.create(Command);

  Create.prototype.process = async function () {
    const { name, dependencies, devDependencies } = await this.askQuestions();
    if (!this.templateExists(name)) {
      this.saveObject(name, {
        name,
        dependencies,
        devDependencies,
      });
    }
  };

  Create.prototype.questions = [
    {
      type: "text",
      name: "name",
      message: "Name the template 👶",
    },
    {
      type: "text",
      name: "dependencies",
      message: "Define your dependencies (space seperated)",
    },
    {
      type: "text",
      name: "devDependencies",
      message: "Define your dev-dependencies (space seperated)",
    },
  ];
  return Create;
};
