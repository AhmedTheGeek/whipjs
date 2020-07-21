#!/usr/bin/env node

const { argv } = require("yargs");
const processor = require("./lib/commands/processor");

const {
  _: [command],
} = argv;

processor(command);
