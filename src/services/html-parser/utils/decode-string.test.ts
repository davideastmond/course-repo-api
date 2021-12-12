import { decodeString } from "./decode-string";
import { MOCK_STRINGS } from "./mock-data";

describe("decode string test", () => {
  test("remove encodings", () => {
    MOCK_STRINGS.forEach((testCase) => {
      expect(decodeString(testCase.input)).toBe(testCase.output);
    });
  });
});
