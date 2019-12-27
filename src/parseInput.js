"use strict";

const getDelimiter = function(cmdArgs) {
  let delimiter = "\t";
  const indexOfDelimiter = cmdArgs.lastIndexOf("-d");
  if (indexOfDelimiter != -1) delimiter = cmdArgs[indexOfDelimiter + 1];
  return delimiter;
};

const isValidInput = function(cmdArgs, field, delimiter, filePath) {
  if (!cmdArgs.includes("-f"))
    return { error: "usage: cut -f list [-d delim] [file]" };
  if (delimiter.length != 1) return { error: "cut: bad delimiter" };
  if (!Number.isInteger(+field))
    return { error: "cut: [-f] list: illegal list value" };
  if (+field === 0)
    return { error: "cut: [-f] list: values may not include zero" };
  if (!filePath)
    return { error: `cut: ${filePath}: No such file or directory` };
  return {};
};

const getFile = function(cmdArgs) {
  if (cmdArgs.includes("-d")) {
    return cmdArgs[4];
  }
  return cmdArgs[2];
};

const parseInput = function(cmdArgs) {
  const parsedInput = {};
  const field = cmdArgs[cmdArgs.lastIndexOf("-f") + 1];
  const delimiter = getDelimiter(cmdArgs);
  const filePath = getFile(cmdArgs);
  const { error } = isValidInput(cmdArgs, field, delimiter, filePath);
  if (error) return { error };
  return { field: +field, delimiter, filePath };
};

module.exports = { parseInput };
