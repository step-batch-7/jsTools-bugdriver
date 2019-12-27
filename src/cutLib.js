"use strict";
const createFileReadStream = function(readFileStream, filePath) {
  return readFileStream(filePath);
};

const readStreamData = function(inputStream, onCompletion) {
  inputStream.on("data", data => {
    onCompletion({ lines: data.toString() });
  });
  inputStream.on("error", err => {
    const errMessages = {
      EACCES: `cut: ${inputStream.path}: Permission denied`,
      ENOENT: `cut: ${inputStream.path}: No such file or directory`,
      EISDIR: `cut: Error reading ${inputStream.path}`,
    };
    onCompletion({ err: errMessages[err.code] });
  });
};

module.exports = { readStreamData, createFileReadStream };
