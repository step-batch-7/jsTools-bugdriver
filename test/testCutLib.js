const assert = require("chai").assert;
const cutLib = require("../src/cutLib");

describe("#generateLines", () => {
  it("should join selected fields with delimeter", () => {
    const selectedFields = [
      ["andhra", "uttar"],
      ["madhya", "rajasthan"],
    ];
    const expected = "andhra,uttar\nmadhya,rajasthan";
    assert.strictEqual(cutLib.generateLines(selectedFields, ","), expected);
  });
});

describe("#selectFields", () => {
  it("should select given fieldplaces from given array of fields of lines", () => {
    const fields = [
      ["a", "b", "c", "d", "e", "f"],
      ["1", "2", "3", "4", "5", "6"],
    ];
    const expected = [
      ["a", "b", "d"],
      ["1", "2", "4"],
    ];
    assert.deepStrictEqual(cutLib.selectFields(fields, [1, 2, 4]), expected);
  });
  it("should ignore given fieldplaces if not present in array", () => {
    const fields = [
      ["a", "b", "c", "d", "e", "f"],
      ["1", "2", "3", "4", "5", "6"],
    ];
    const expected = [
      ["a", "b"],
      ["1", "2"],
    ];
    assert.deepStrictEqual(
      cutLib.selectFields(fields, [1, 2, 10, 21]),
      expected
    );
  });
});
