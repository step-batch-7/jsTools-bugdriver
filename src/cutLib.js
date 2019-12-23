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

module.exports = { generateLines, selectFields, generateFields };
