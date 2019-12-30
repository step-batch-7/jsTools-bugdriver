const assert = require('chai').assert;
const { performCut } = require('../src/performCut');
const { EventEmitter } = require('events');

describe('#performCut', () => {
  it('should give error if cutOptions are not correct', () => {
    const userArgs = ['-f', 'a', '-d', ',', 'fileName'];
    const callback = function(error) {
      assert.deepStrictEqual(error, {
        error: 'cut: [-f] list: illegal list value',
        cutResult: '',
        exitCode: 1,
      });
    };
    const readFileStream = new EventEmitter();
    performCut(userArgs, readFileStream, callback);
  });
  it('should create ReadStream if cutOptions are correct', () => {
    const userArgs = ['-f', '1', '-d', ',', 'fileName'];
    const callback = function() {};
    const eventEmitter = new EventEmitter();
    const readFileStream = function(filePath) {
      assert.deepStrictEqual(filePath, 'fileName');
      return eventEmitter;
    };
    performCut(userArgs, readFileStream, callback);
  });
  it('should give cutfields if readStream reads content from file', () => {
    const userArgs = ['-f', '1', '-d', ',', 'fileName'];
    const callback = function(cutFields) {
      assert.deepStrictEqual(cutFields, {
        error: '',
        cutResult: '1',
        exitCode: 0,
      });
    };
    const eventEmitter = new EventEmitter();
    const readFileStream = function(filePath) {
      assert.deepStrictEqual(filePath, 'fileName');
      return eventEmitter;
    };
    performCut(userArgs, readFileStream, callback);
    eventEmitter.emit('data', '1,india');
  });

  it('should cut while line if given delimeter is not in line', () => {
    const userArgs = ['-f', '1', '-d', ',', 'fileName'];
    const callback = function(cutFields) {
      assert.deepStrictEqual(cutFields, {
        error: '',
        cutResult: '1-india',
        exitCode: 0,
      });
    };
    const eventEmitter = new EventEmitter();
    const readFileStream = function(filePath) {
      assert.deepStrictEqual(filePath, 'fileName');
      return eventEmitter;
    };
    performCut(userArgs, readFileStream, callback);
    eventEmitter.emit('data', '1-india');
  });

  it('should give error if readStream give error while reading file', () => {
    const userArgs = ['-f', '1', '-d', ',', 'fileName'];
    const callback = function(error) {
      assert.deepStrictEqual(error, {
        error: 'cut: fileName: Permission denied',
        cutResult: '',
        exitCode: 1,
      });
    };
    const eventEmitter = new EventEmitter();
    const readFileStream = function(filePath) {
      assert.deepStrictEqual(filePath, 'fileName');
      eventEmitter.path = 'fileName';
      return eventEmitter;
    };
    performCut(userArgs, readFileStream, callback);
    eventEmitter.emit('error', { code: 'EACCES' });
  });
});
