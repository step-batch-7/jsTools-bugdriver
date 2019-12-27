"use strict";
const { parseInput } = require("./parseInput");
const { readStreamData, createFileReadStream } = require("./cutLib");
const EMPTY_STRING = "";

const selectField = function(line, field, delimiter) {
  const fieldList = line.split(delimiter);
  if (fieldList.length === 1) return fieldList[0];
  return fieldList[field - 1];
};

const generateFields = function(fileContent, cutOption) {
  const { delimiter, field } = cutOption;
  const fileLines = fileContent.split("\n");
  return fileLines.map(line => selectField(line, field, delimiter));
};

const extractFields = function(data, cutOption) {
  if (data.err) {
    return { err: data.err, cutFields: EMPTY_STRING, exitCode: 1 };
  }
  const extractedField = generateFields(data.lines, cutOption);
  return {
    err: EMPTY_STRING,
    cutFields: extractedField.join("\n"),
    exitCode: 0,
  };
};

const performCut = function(userArgs, readFileStream, onCompletion) {
  const cutOption = parseInput(userArgs);
  if (cutOption.error) {
    onCompletion({
      err: cutOption.error,
      cutFields: EMPTY_STRING,
      exitCode: 1,
    });
    return;
  }
  const fileReadStream = createFileReadStream(
    readFileStream,
    cutOption.filePath
  );
  readStreamData(fileReadStream, data => {
    onCompletion(extractFields(data, cutOption));
  });
};

module.exports = { performCut };
