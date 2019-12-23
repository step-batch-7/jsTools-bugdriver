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
