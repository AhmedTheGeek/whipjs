const fs = require("fs");
const { argv } = require("yargs");
const prompts = require("prompts");
const nconf = require("nconf");
const handler = require("./lib/handler");
const {
  _: [command],
} = argv;

console.log(handler(command, argv));
