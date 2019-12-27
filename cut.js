"use strict";
const { createReadStream } = require("fs");
const { performCut } = require("./src/execCut");

const main = function() {
  const showResult = function(contentToWrite) {
    process.stderr.write(contentToWrite.error);
    process.stdout.write(contentToWrite.cutResult);
    process.exit(contentToWrite.exitCode);
  };
  performCut(process.argv.slice(2), createReadStream, showResult);
};
main();
