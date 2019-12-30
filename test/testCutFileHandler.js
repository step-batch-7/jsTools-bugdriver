const assert = require('chai').assert;
const EventEmitter = require('events').EventEmitter;
const {
  readStreamData,
  createFileReadStream,
} = require('../src/cutFileHandler');

describe('#readStreamData', () => {
  it('should give error if readStream give error while reading file', () => {
    const callback = function(error) {
      assert.deepStrictEqual(error, {
        err: 'cut: fileName: Permission denied',
      });
    };
    const readFileStream = new EventEmitter();
    readFileStream.path = 'fileName';
    readStreamData(readFileStream, callback);
    readFileStream.emit('error', { code: 'EACCES' });
  });

  it('should give lines when valid fileName passed ', () => {
    const callback = function(lines) {
      assert.deepStrictEqual(lines, {
        lines: '1,india',
      });
    };
    const readFileStream = new EventEmitter();
    readFileStream.path = 'fileName';
    readStreamData(readFileStream, callback);
    readFileStream.emit('data', '1,india');
  });
});

describe('#createFileReadStream', () => {
  it('should give fileReadStream with passed filePath', () => {
    const eventEmmiter = new EventEmitter();
    const readFileStream = function(fileName) {
      assert.deepStrictEqual(fileName, 'fileName');
      return eventEmmiter;
    };
    createFileReadStream(readFileStream, 'fileName');
  });
});
