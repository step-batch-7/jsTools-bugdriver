const assert = require('chai').assert;
const { parseInput } = require('../src/parseInput');

describe('#parseInput', () => {
  it('should parse cmdLine Arguments into object when file is passed', () => {
    const actual = parseInput(['-f', '1', '-d', ',', 'fileName']);
    const expected = {
      field: '1',
      delimiter: ',',
      filePath: 'fileName',
    };
    assert.deepStrictEqual(actual.parsedInput, expected);
  });
  it('should give error if file is not passed', () => {
    const actual = parseInput(['-f', '1', '-d', ',']);
    const expected = 'cut: undefined: No such file or directory';
    assert.deepStrictEqual(actual.error, expected);
  });
  it('should give parsed Input when delimiter is missing', () => {
    const actual = parseInput(['-f', '1', 'fileName']);
    const expected = {
      field: '1',
      delimiter: '\t',
      filePath: 'fileName',
    };
    assert.deepStrictEqual(actual.parsedInput, expected);
  });
  it('should return error with uses if incorrect option passed', () => {
    const actual = parseInput(['-r', '1', 'fileName']);
    assert.deepStrictEqual(
      actual.error,
      'usage: cut -f list [-d delim] [file]'
    );
  });
  it('should give error for non Integer field value', () => {
    const actual = parseInput(['-f', 'a', 'fileName']);
    assert.deepStrictEqual(actual.error, 'cut: [-f] list: illegal list value');
  });
});
