'use strict';
const { parseInput } = require('./parseInput');
const { readStreamData, createFileReadStream } = require('./cutFileHandler');
const EMPTY_STRING = '';

const selectField = function(line, field, delimiter) {
  const unitLength = 1;
  const firstField = 0;
  const fieldList = line.split(delimiter);
  if (fieldList.length === unitLength) {
    return fieldList[firstField];
  }
  return fieldList[--field];
};

const generateFields = function(fileContent, cutOption) {
  const { delimiter, field } = cutOption;
  const fileLines = fileContent.split('\n');
  return fileLines.map(line => selectField(line, field, delimiter));
};

const extractFields = function(chunk, cutOption) {
  if (chunk.err) {
    process.exitCode = 1;
    return { error: chunk.err, cutResult: EMPTY_STRING, exitCode: 1 };
  }
  const extractedField = generateFields(chunk.lines, cutOption);
  return {
    error: EMPTY_STRING,
    cutResult: extractedField.join('\n'),
    exitCode: 0,
  };
};

const performCut = function(userArgs, readFileStream, onCompletion) {
  const cutOption = parseInput(userArgs);
  if (cutOption.error) {
    process.exitCode = 1;
    onCompletion({
      error: cutOption.error,
      cutResult: EMPTY_STRING,
      exitCode: 1,
    });
    return;
  }
  const fileReadStream = createFileReadStream(
    readFileStream,
    cutOption.parsedInput.filePath
  );
  readStreamData(fileReadStream, data => {
    onCompletion(extractFields(data, cutOption.parsedInput));
  });
};

module.exports = { performCut };
