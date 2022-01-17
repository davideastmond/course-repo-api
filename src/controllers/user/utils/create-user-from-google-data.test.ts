import {
  getUserFromGoogleData,
  IGoogleData,
} from "./create-user-from-google-data";

describe("create user from google data tests", () => {
  test("Creates user w/ correct properties", () => {
    const input: IGoogleData = {
      id: "111111111111",
      displayName: "displayName",
      name: { familyName: "fam", givenName: "given" },
      emails: [{ value: "default@example.com", verified: true }],
      provider: "someProvider",
      photos: [{ value: "https://www.example.com/image.jpg" }],
      accessToken: "someToken",
    };

    const result = getUserFromGoogleData(input);
    expect(result).toEqual({
      firstName: "given",
      lastName: "fam",
      auth: {
        googleId: "111111111111",
        email: "default@example.com",
        accessToken: "someToken",
      },
      avatar: [{ url: "https://www.example.com/image.jpg" }],
      courses: [],
    });
  });
});
