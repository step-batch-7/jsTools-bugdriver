const { cutFiles, cutStdin } = require("./cutLib");

const getDelimiter = function(cmdArgs) {
  const indexOfDelimiter = cmdArgs.lastIndexOf("-d");
  if (indexOfDelimiter == -1) return "\t";
  return cmdArgs[indexOfDelimiter + 1];
};

const getFieldPlaces = function(cmdArgs) {
  const indexOfField = cmdArgs.lastIndexOf("-f");
  if (indexOfField == -1) throw new Error("cut: illegal option");
  return [+cmdArgs[indexOfField + 1]];
};

const getFileNames = function(cmdArgs) {
  if (cmdArgs.includes("-d")) {
    return cmdArgs[4];
  }
  return cmdArgs[2];
};

const parseInput = function(cmdArgs) {
  const parsedInput = {};
  parsedInput.fields = getFieldPlaces(cmdArgs);
  parsedInput.delimiter = getDelimiter(cmdArgs);
  parsedInput.filePaths = getFileNames(cmdArgs);
  return parsedInput;
};

module.exports = { parseInput };
