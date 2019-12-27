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
    return { error: data.err, cutResult: EMPTY_STRING, exitCode: 1 };
  }
  const extractedField = generateFields(data.lines, cutOption);
  return {
    error: EMPTY_STRING,
    cutResult: extractedField.join("\n"),
    exitCode: 0,
  };
};

const performCut = function(userArgs, readFileStream, onCompletion) {
  const cutOption = parseInput(userArgs);
  if (cutOption.error) {
    onCompletion({
      error: cutOption.error,
      cutResult: EMPTY_STRING,
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
