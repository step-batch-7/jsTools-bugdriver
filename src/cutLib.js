const { parseInput } = require("./parseInput");
const generateLines = function(selectedFields, delimiter) {
  const joinFields = selectedFields.map(fields => fields.join(delimiter));
  return joinFields.join("\n");
};

const selectFieldsOfLine = function(lineFieldList, fieldPlaces) {
  if (lineFieldList.length < 2) {
    return lineFieldList;
  }
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

const extractFields = function(data, cutOption) {
  const fileLineFields = generateFields(data, cutOption.delimiter);
  const selectedLines = selectFields(fileLineFields, cutOption.fields);
  return generateLines(selectedLines, cutOption.delimiter);
};

const cutFiles = function(cutOption, outputWriter, fileHandlingFunc) {
  if (fileHandlingFunc.isFileExists(cutOption.filePaths)) {
    fileHandlingFunc.reader(cutOption.filePaths, "utf8", (error, data) => {
      const fileContent = data.replace(/\n$/g, "");
      const extractedFields = extractFields(fileContent, cutOption);
      outputWriter({ cutLog: extractedFields });
    });
  } else {
    outputWriter({
      cutError: `cut: ${cutOption.filePaths}: No such file or directory`,
    });
  }
};

const cutStdin = function(cutOption, outputWriter, stdin) {
  let userInput = "";
  stdin.on("data", data => {
    userInput += data;
  });
  stdin.on("end", () => {
    const extractedLines = extractFields(userInput, cutOption);
    outputWriter({ cutLog: extractedLines });
  });
};

const performCut = function(userArgs, outputWriter, stdin, fileHandlingFunc) {
  try {
    const cutOption = parseInput(userArgs);
    if (cutOption.filePaths) {
      cutFiles(cutOption, outputWriter, fileHandlingFunc);
    } else {
      cutStdin(cutOption, outputWriter, stdin);
    }
  } catch (err) {
    outputWriter({ cutError: err.message });
  }
};

module.exports = {
  generateLines,
  selectFields,
  generateFields,
  extractFields,
  performCut,
};
