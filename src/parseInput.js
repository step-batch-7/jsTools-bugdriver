'use strict';

const checkForErrorIn = function(parsedInput) {
  const errors = {
    missingField: 'usage: cut -f list [-d delim] [file]',
    illegalListValue: 'cut: [-f] list: illegal list value',
    filePath: `cut: ${parsedInput.filePath}: No such file or directory`,
  };
  if (!parsedInput.field) {
    return errors.missingField;
  }
  if (!Number.isInteger(+parsedInput.field)) {
    return errors.illegalListValue;
  }
  if (!parsedInput.filePath) {
    return errors.filePath;
  }
  return null;
};

const parseInput = function(cmdArgs) {
  const parsedInput = { delimiter: '\t' };
  for (let index = 0; index < cmdArgs.length; index++) {
    const optionNames = { '-f': 'field', '-d': 'delimiter' };
    if (cmdArgs[index].startsWith('-')) {
      const optionName = optionNames[cmdArgs[index]];
      parsedInput[optionName] = cmdArgs[++index];
    } else {
      parsedInput.filePath = cmdArgs[index];
    }
  }
  const error = checkForErrorIn(parsedInput);
  return { error, parsedInput };
};

module.exports = { parseInput };
