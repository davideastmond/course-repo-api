import { adaptToSecureUser } from ".";

const MOCK_USERS = require("../course-repo-users.json");

describe("secure user adapter test", () => {
  test("adapts correctly", () => {
    const result = adaptToSecureUser(MOCK_USERS[0]);
    expect(result).toHaveProperty("firstName");
    expect(result).toHaveProperty("lastName");
    expect(result).toHaveProperty("_id");
    expect(result).toHaveProperty("jobTitle");
    expect(result).toHaveProperty("avatar");
    expect(result).toHaveProperty("courses");
    expect(result).toHaveProperty("createdAt");
    expect(result).toHaveProperty("updatedAt");
    expect(result).toHaveProperty("department");
    expect(result).toHaveProperty("interestTags");
    expect(result.courses).toBeInstanceOf(Array);
    expect(result.interestTags).toBeInstanceOf(Array);

    expect(result.firstName).toBe("Bea");
    expect(result.interestTags).toEqual(["javascript", "html", "design"]);
  });
});
