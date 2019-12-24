const generateLines = function(selectedFields, delimiter) {
  const joinFields = selectedFields.map(fields => fields.join(delimiter));
  return joinFields.join("\n");
};

const selectFieldsOfLine = function(lineFieldList, fieldPlaces) {
  const selectedField = fieldPlaces.map(fields => lineFieldList[fields - 1]);
  return selectedField.filter(field => field);
};

const selectFields = function(fieldList, fieldPlaces) {
  return fieldList.map(lineFieldList =>
    selectFieldsOfLine(lineFieldList, fieldPlaces)
  );
};

const generateFields = function(fileContent, delimiter) {
  const fileLines = fileContent.split("\n");
  return fileLines.map(line => line.split(delimiter));
};

const extractFields = function(data, cmdArgs) {
  const fileLineFields = generateFields(data, cmdArgs.delimiter);
  const selectedLines = selectFields(fileLineFields, cmdArgs.fields);
  return generateLines(selectedLines, cmdArgs.delimiter);
};

const cutFiles = function(cmdArgs, outputWriter, fileHandlingFunc) {
  for (let filePath of cmdArgs.filePaths) {
    if (fileHandlingFunc.isFileExists(filePath)) {
      fileHandlingFunc.reader(filePath, "utf8", (error, data) => {
        const extractedFields = extractFields(data, cmdArgs);
        outputWriter({ cutlog: extractedFields });
      });
    } else {
      outputWriter({ cutError: `cut: ${filePath}: No such file or directory` });
    }
  }
};

const cutStdin = function() {};
module.exports = {
  generateLines,
  selectFields,
  generateFields,
  extractFields,
  cutFiles,
  cutStdin,
};
