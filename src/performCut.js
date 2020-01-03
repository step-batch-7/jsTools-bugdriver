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
  return fieldList[field - 1];
};

const generateFields = function(fileContent, delimiter, field) {
  const fileLines = fileContent.split('\n');
  return fileLines.map(line => selectField(line, field, delimiter));
};

const extractFields = function(fileContent, cutOption) {
  if (fileContent.err) {
    process.exitCode = 1;
    return { error: fileContent.err, cutResult: EMPTY_STRING };
  }
  const { delimiter, field } = cutOption;
  const extractedField = generateFields(fileContent.lines, delimiter, field);
  return { error: EMPTY_STRING, cutResult: extractedField.join('\n') };
};

const performCut = function(userArgs, readFileStream, onCompletion) {
  const { error, parsedInput } = parseInput(userArgs);
  if (error) {
    process.exitCode = 1;
    onCompletion({ error: error, cutResult: EMPTY_STRING });
    return;
  }
  const fileReadStream = createFileReadStream(
    readFileStream,
    parsedInput.filePath
  );
  readStreamData(fileReadStream, fileContent => {
    onCompletion(extractFields(fileContent, parsedInput));
  });
};

module.exports = { performCut };
