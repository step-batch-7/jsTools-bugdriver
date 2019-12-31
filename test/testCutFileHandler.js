const assert = require('chai').assert;
const sinon = require('sinon');
const {
  readStreamData,
  createFileReadStream,
} = require('../src/cutFileHandler');

describe('#readStreamData', () => {
  it('should give error if readStream give error', function(done) {
    const callback = sinon.fake();
    const readFileStream = { on: sinon.fake(), path: 'fileName' };
    readStreamData(readFileStream, callback);
    assert(readFileStream.on.secondCall.calledWith('error'));
    readFileStream.on.secondCall.lastArg({ code: 'EACCES' });
    assert(callback.calledOnce);
    assert(
      callback.firstCall.calledWith({
        err: 'cut: fileName: Permission denied',
      })
    );
    done();
  });

  it('should give lines when valid fileName passed ', function(done) {
    const callback = sinon.fake();
    const readFileStream = { on: sinon.fake(), path: 'fileName' };
    readStreamData(readFileStream, callback);
    assert(readFileStream.on.firstCall.calledWith('data'));
    readFileStream.on.firstCall.lastArg('abc');
    assert(callback.calledOnce);
    assert(callback.firstCall.calledWith({ lines: 'abc' }));
    done();
  });
});

describe('#createFileReadStream', () => {
  it('should give fileReadStream with passed filePath', function(done) {
    const readFileStream = sinon.fake();
    createFileReadStream(readFileStream, 'fileName');
    assert(readFileStream.firstCall.calledWith('fileName'));
    done();
  });
});
