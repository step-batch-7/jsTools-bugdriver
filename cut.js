"use strict";
const { createReadStream } = require("fs");
const { performCut } = require("./src/execCut");

const main = function() {
  const userArgs = process.argv.slice(2);
  const outputWriter = function(contentToWrite) {
    process.stderr.write(contentToWrite.err);
    process.stdout.write(contentToWrite.cutFields);
    process.exit(contentToWrite.exitCode);
  };
  performCut(userArgs, createReadStream, outputWriter);
};
main();
