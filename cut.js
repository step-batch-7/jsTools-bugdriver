const { readFile, existsSync } = require("fs");
const { parseInput } = require("./src/parseInput");

const main = function() {
  const userArgs = process.argv.slice(2);
  const parsedInput = parseInput(userArgs);
  const outputWriter = function(contentToWrite) {
    contentToWrite.cutLog && console.log(contentToWrite.cutLog);
    contentToWrite.cutError && console.error(contentToWrite.cutError);
  };
  const fileHandlingFunc = {
    reader: readFile,
    isFileExists: existsSync,
  };
  parsedInput.dataExtractor(parsedInput, outputWriter, fileHandlingFunc);
};
main();
