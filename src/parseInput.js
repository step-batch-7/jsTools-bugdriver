const { cutFiles, cutStdin } = require("./cutLib");

const getDelimeter = function(cmdArgs) {
  const indexOfDelimiter = cmdArgs.lastIndexOf("-d");
  if (indexOfDelimiter == -1) return "\t";
  return cmdArgs[indexOfDelimiter + 1];
};

const getFieldPlaces = function(cmdArgs) {
  const indexOfField = cmdArgs.lastIndexOf("-f");
  if (indexOfField == -1) throw new Error("options are not correct");
  return [+cmdArgs[indexOfField + 1]];
};

const getFileNames = function(cmdArgs) {
  if (cmdArgs.includes("-d")) {
    return cmdArgs.slice(4);
  }
  return cmdArgs.slice(2);
};

const parseInput = function(cmdArgs) {
  const parsedInput = {};
  parsedInput.fields = getFieldPlaces(cmdArgs);
  parsedInput.delimiter = getDelimeter(cmdArgs);
  parsedInput.filePaths = getFileNames(cmdArgs);
  parsedInput.dataExtractor =
    parsedInput.filePaths.length < 1 ? cutStdin : cutFiles;
  return parsedInput;
};

module.exports = { parseInput };
