const { readFile, existsSync } = require("fs");
const { performCut } = require("./src/cutLib");

const main = function() {
  const userArgs = process.argv.slice(2);
  const outputWriter = function(contentToWrite) {
    contentToWrite.cutLog && console.log(contentToWrite.cutLog);
    contentToWrite.cutError && console.error(contentToWrite.cutError);
  };
  const fileHandlingFunc = {
    reader: readFile,
    isFileExists: existsSync,
  };
  process.stdin.setEncoding("utf8");
  performCut(userArgs, outputWriter, process.stdin, fileHandlingFunc);
};
main();
