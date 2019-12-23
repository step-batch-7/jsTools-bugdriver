const generateLines = function(selectedFields, delimeter) {
  const joinFields = selectedFields.map(fields => fields.join(delimeter));
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

module.exports = { generateLines, selectFields };
