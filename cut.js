'use strict';
const { createReadStream } = require('fs');
const { performCut } = require('./src/performCut');

const main = function() {
  const showResult = function(contentToWrite) {
    process.stderr.write(contentToWrite.error);
    process.stdout.write(contentToWrite.cutResult);
  };
  const [, , ...cmdArgs] = process.argv;
  performCut(cmdArgs, createReadStream, showResult);
};
main();
