import { arrangeStrings } from "./utils";
import { MOCK_DATA, MOCK_EXPECTED } from "./utils-mock-data";
describe("arrange strings utility tests", () => {
  test("data", () => {
    MOCK_DATA.forEach((testCase, index) => {
      const result = arrangeStrings(testCase);
      expect(result).toEqual(MOCK_EXPECTED[index]);
    });
  });
});
