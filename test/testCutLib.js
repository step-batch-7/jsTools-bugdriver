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
  it("should select whole line if there is only one field", () => {
    const fields = [["a", "b", "c", "d", "e", "f"], ["1"]];
    const expected = [["a", "b", "d"], ["1"]];
    assert.deepStrictEqual(cutLib.selectFields(fields, [1, 2, 4]), expected);
  });
});

describe("#generateFields", () => {
  it("should generateFields by given fileContent and delimiter", () => {
    const fileContent = "a,b,c\nd,e,f";
    const expected = [
      ["a", "b", "c"],
      ["d", "e", "f"],
    ];
    assert.deepStrictEqual(cutLib.generateFields(fileContent, ","), expected);
  });
});

describe("#extractFields", () => {
  it("should extract given fieldplaces in cmdArgs from given lines", () => {
    const data = "1,2,3\na,b,c";
    const cmdArgs = { fields: [1, 2], delimiter: "," };
    assert.deepStrictEqual(cutLib.extractFields(data, cmdArgs), "1,2\na,b");
  });
});

describe("#cutFile", () => {
  it("should select given fields from given file", () => {
    const cmdArgs = {
      fields: [1],
      delimiter: ",",
      filePaths: ["./filepath"],
    };
    const outputWriter = function(contentToWrite) {
      assert.deepStrictEqual(contentToWrite, { cutLog: "1\n2\n3" });
    };
    const fileHandlingFunc = {
      reader: function(filePath, encoding, callback) {
        assert.strictEqual(filePath, "./filepath");
        assert.strictEqual(encoding, "utf8");
        callback(null, "1,line1\n2,line2\n3,line3");
      },
      isFileExists: function(filePath) {
        assert.strictEqual(filePath, "./filepath");
        return true;
      },
    };
    cutLib.cutFiles(cmdArgs, outputWriter, fileHandlingFunc);
  });
  it("should give error if given file is not present", () => {
    const cmdArgs = {
      fields: [1],
      delimiter: ",",
      filePaths: ["./filepath"],
    };
    const outputWriter = function(contentToWrite) {
      assert.deepStrictEqual(contentToWrite, {
        cutError: `cut: ./filepath: No such file or directory`,
      });
    };
    const fileHandlingFunc = {
      reader: function(filePath, encoding, callback) {
        assert.strictEqual(filePath, "./filepath");
        assert.strictEqual(encoding, "utf8");
        callback(null, "1,line1\n2,line2\n3,line3");
      },
      isFileExists: function(filePath) {
        assert.strictEqual(filePath, "./filepath");
        return false;
      },
    };
    cutLib.cutFiles(cmdArgs, outputWriter, fileHandlingFunc);
  });
});
