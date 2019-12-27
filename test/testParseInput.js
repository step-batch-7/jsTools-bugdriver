const assert = require("chai").assert;
const { parseInput } = require("../src/parseInput");
const { cutFiles, cutStdin } = require("../src/cutLib");

describe("#parseInput", () => {
  it("should parse cmdLine Arguments into object when file is passed", () => {
    const actual = parseInput(["-f", "1", "-d", ",", "fileName"]);
    const expected = {
      field: 1,
      delimiter: ",",
      filePath: "fileName",
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should parse cmdLine Arguments into object when file is not passed", () => {
    const actual = parseInput(["-f", "1", "-d", ","]);
    const expected = { error: "cut: undefined: No such file or directory" };
    assert.deepStrictEqual(actual, expected);
  });
  it("should parse cmdLine Arguments into object when delimiter is not given", () => {
    const actual = parseInput(["-f", "1", "fileName"]);
    const expected = {
      field: 1,
      delimiter: "\t",
      filePath: "fileName",
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should return error with uses if incorrect option passed", () => {
    const actual = parseInput(["-r", "1", "fileName"]);
    assert.deepStrictEqual(actual, {
      error: "usage: cut -f list [-d delim] [file]",
    });
  });
  it("should return error with illegal list value if field value is not an Integer", () => {
    const actual = parseInput(["-f", "a", "fileName"]);
    assert.deepStrictEqual(actual, {
      error: "cut: [-f] list: illegal list value",
    });
  });
  it("should return error if field value is 0", () => {
    const actual = parseInput(["-f", "0", "fileName"]);
    assert.deepStrictEqual(actual, {
      error: "cut: [-f] list: values may not include zero",
    });
  });
  it("should return error if delimiter length is greater than 1", () => {
    const actual = parseInput(["-d", "ad", "-f", "1", "fileName"]);
    assert.deepStrictEqual(actual, { error: "cut: bad delimiter" });
  });
});
