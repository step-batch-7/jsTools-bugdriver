const assert = require('chai').assert;
const { performCut } = require('../src/performCut');
const { fake, restore } = require('sinon');

describe('#performCut', () => {
  let stream;
  beforeEach(() => {
    stream = { on: fake() };
  });
  afterEach(() => {
    restore();
  });
  it('should give error if cutOptions are not correct', () => {
    const userArgs = ['-f', 'a', '-d', ',', 'fileName'];
    const callback = fake();
    const readFileStream = {};
    performCut(userArgs, readFileStream, callback);
    assert(
      callback.calledWith({
        error: 'cut: [-f] list: illegal list value',
        cutResult: '',
      })
    );
  });

  it('should create ReadStream if cutOptions are correct', () => {
    const userArgs = ['-f', '1', '-d', ',', 'fileName'];
    const callback = function() {};
    const readFileStream = function(filePath) {
      assert.deepStrictEqual(filePath, 'fileName');
      return stream;
    };
    performCut(userArgs, readFileStream, callback);
  });
  it('should give cutfields if readStream reads content from file', () => {
    const userArgs = ['-f', '1', '-d', ',', 'fileName'];
    const callback = fake();
    const readFileStream = function(filePath) {
      assert.deepStrictEqual(filePath, 'fileName');
      return stream;
    };
    performCut(userArgs, readFileStream, callback);
    stream.on.firstCall.lastArg('1,india');
    assert(
      callback.calledWith({
        error: '',
        cutResult: '1',
      })
    );
  });

  it('should cut while line if given delimeter is not in line', () => {
    const userArgs = ['-f', '1', '-d', ',', 'fileName'];
    const readFileStream = fake.returns(stream);
    const callback = fake();
    performCut(userArgs, readFileStream, callback);
    assert(readFileStream.calledWith('fileName'));
    stream.on.firstCall.lastArg('1-india');
    assert(
      callback.calledWith({
        error: '',
        cutResult: '1-india',
      })
    );
  });

  it('should give error if readStream give error while reading file', () => {
    const userArgs = ['-f', '1', '-d', ',', 'fileName'];
    const callback = fake();
    stream.path = 'fileName';
    const readFileStream = fake.returns(stream);
    performCut(userArgs, readFileStream, callback);
    stream.on.secondCall.lastArg({ code: 'EACCES' });
    assert(
      callback.calledWith({
        error: 'cut: fileName: Permission denied',
        cutResult: '',
      })
    );
  });
});
