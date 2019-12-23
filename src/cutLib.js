const generateLines = function(selectedFields, delimeter) {
  const joinFields = selectedFields.map(fields => fields.join(delimeter));
  return joinFields.join("\n");
};

module.exports = { generateLines };
