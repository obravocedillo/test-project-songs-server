import {
  capitalizeWord,
  deepEqual,
  excludeFromObject,
  sortObjectArray,
} from "./index";

describe("Utils functions", () => {
  describe("capitalizeWord function", () => {
    it("should return empty string if input is empty", () => {
      const capitalizedWord = capitalizeWord("");
      expect(capitalizedWord).toBe("");
    });

    it("Should capizalize all lowercase string", () => {
      const capitalizedWord = capitalizeWord("test");
      expect(capitalizedWord).toBe("Test");
    });

    it("Should capizalize string with multiple words if capitalizeMultipleStrings is true", () => {
      const capitalizedWord = capitalizeWord("this is a test sentence", true);
      expect(capitalizedWord).toBe("This Is A Test Sentence");
    });

    it("Should not capizalize string with multiple words if capitalizeMultipleStrings is false", () => {
      const capitalizedWord = capitalizeWord("this is a test sentence", false);
      expect(capitalizedWord).toBe("This is a test sentence");
    });
  });

  describe("sortObjectArray function", () => {
    it("Should sort array of objects by value in ascending order", () => {
      const sortedArray = sortObjectArray<{ value: number }>(
        [
          {
            value: 3,
          },
          {
            value: 10,
          },
          {
            value: 1,
          },
          {
            value: 2,
          },
        ],
        "value",
        "asc",
      );
      expect(sortedArray).toEqual([
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 10 },
      ]);
    });

    it("Should sort array of objects by value in descending order", () => {
      const sortedArray = sortObjectArray<{ value: number }>(
        [
          {
            value: 3,
          },
          {
            value: 10,
          },
          {
            value: 1,
          },
          {
            value: 2,
          },
        ],
        "value",
        "desc",
      );
      expect(sortedArray).toEqual([
        { value: 10 },
        { value: 3 },
        { value: 2 },
        { value: 1 },
      ]);
    });

    it("Should return empty array if array contains non-object values", () => {
      const sortedArray = sortObjectArray<any>(
        [
          {
            value: 3,
          },
          {
            value: 10,
          },
          null,
          {
            value: 2,
          },
        ],
        "value",
        "desc",
      );
      expect(sortedArray).toEqual([]);
    });
  });

  describe("deepEqual function", () => {
    it("Should return true if both objects are the same", () => {
      const objectA = { value: 1 };
      const objectB = { value: 1 };

      expect(deepEqual(objectA, objectB)).toBe(true);
    });

    it("Should return true if both objects are the same with nested objects", () => {
      const objectA = {
        value: 1,
        nested: { value: 2 },
        nestedArray: [{ value: 1 }],
      };
      const objectB = {
        value: 1,
        nested: { value: 2 },
        nestedArray: [{ value: 1 }],
      };

      expect(deepEqual(objectA, objectB)).toBe(true);
    });

    it("Should return false if both objects are different with nested objects", () => {
      const objectA = {
        value: 1,
        nested: { value: 2 },
        nestedArray: [{ value: 2 }],
      };
      const objectB = {
        value: 1,
        nested: { value: 2 },
        nestedArray: [{ value: 1 }],
      };

      expect(deepEqual(objectA, objectB)).toBe(false);
    });
  });

  describe("excludeFromObject function", () => {
    it("Should return object without excluded keys", () => {
      const objectA = { value: 1, excldudedValue1: 4, excludedValue2: "Test" };
      const exludeKeysResult = excludeFromObject(objectA, [
        "excldudedValue1",
        "excludedValue2",
      ]);
      expect(exludeKeysResult).toEqual({ value: 1 });
    });

    it("Should keep keys that are not excluded", () => {
      const objectA = { value: 1, excldudedValue10: 4, excludedValue2: "Test" };
      const exludeKeysResult = excludeFromObject(objectA, ["excldudedValue10"]);
      expect(exludeKeysResult).toEqual({ value: 1, excludedValue2: "Test" });
    });
  });
});
