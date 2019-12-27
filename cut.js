"use strict";
const { createReadStream } = require("fs");
const { performCut } = require("./src/execCut");

const main = function() {
  const cutResultWriter = function(contentToWrite) {
    process.stderr.write(contentToWrite.err);
    process.stdout.write(contentToWrite.cutFields);
    process.exit(contentToWrite.exitCode);
  };
  performCut(process.argv.slice(2), createReadStream, cutResultWriter);
};
main();
