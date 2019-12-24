const assert = require("chai").assert;
const { parseInput } = require("../src/parseInput");
const { cutFiles, cutStdin } = require("../src/cutLib");

describe("#parseInput", () => {
  it("should parse cmdLine Arguments into object when file is passed", () => {
    const actual = parseInput(["-f", "1", "-d", ",", "fileName"]);
    const expected = {
      fields: [1],
      delimiter: ",",
      filePaths: "fileName",
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should parse cmdLine Arguments into object when file is not passed", () => {
    const actual = parseInput(["-f", "1", "-d", ","]);
    const expected = {
      fields: [1],
      delimiter: ",",
      filePaths: undefined,
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should parse cmdLine Arguments into object when delimiter is not given", () => {
    const actual = parseInput(["-f", "1", "fileName"]);
    const expected = {
      fields: [1],
      delimiter: "\t",
      filePaths: "fileName",
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should throw error if incorrect option passed", () => {
    assert.throws(() => {
      parseInput(["-r", "1", "fileName"]);
    }, /cut: illegal option/);
  });
});
