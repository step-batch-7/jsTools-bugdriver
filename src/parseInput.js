'use strict';

class Parser {
  constructor(optionLookup) {
    this.optionLookup = optionLookup;
  }
  parse(cmdArgs) {
    const parsedInput = { delimiter: '\t' };
    for (let index = 0; index < cmdArgs.length; index++) {
      if (cmdArgs[index].startsWith('-')) {
        const optionName = this.optionLookup[cmdArgs[index]];
        parsedInput[optionName] = cmdArgs[++index];
      } else {
        parsedInput.filePath = cmdArgs[index];
      }
    }
    return parsedInput;
  }
}

module.exports = { Parser };
