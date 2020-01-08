const assert = require('chai').assert;
const { Parser } = require('../src/parseInput');

describe('#Parser', () => {
  context('#parse', () => {
    let parser;
    beforeEach(() => {
      parser = new Parser({ '-f': 'field', '-d': 'delimiter' });
    });
    it('should parse cmdLine Arguments into object when file is passed', () => {
      const actual = parser.parse(['-f', '1', '-d', ',', 'fileName']);
      const expected = {
        field: '1',
        delimiter: ',',
        filePath: 'fileName',
      };
      assert.deepStrictEqual(actual, expected);
    });
    it('should give parsed Input when delimiter is missing', () => {
      const actual = parser.parse(['-f', '1', 'fileName']);
      const expected = {
        field: '1',
        delimiter: '\t',
        filePath: 'fileName',
      };
      assert.deepStrictEqual(actual, expected);
    });
  });
});
