import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { UserModel } from "./user.model";
import { MOCK_USER_DATA } from "./mock-user-data";
import {
  CourseCategory,
  ICourseRecommendationSubmission,
} from "../course/course.types";
let mongoServer: any;

const options: mongoose.ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  mongoose.connect(mongoUri, options, (err) => {
    if (err) console.error(err);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
describe("user.methods.tests", () => {
  describe("user", () => {
    it("creates a user with correct properties", async () => {
      const mockUser = await UserModel.create(MOCK_USER_DATA);
      expect(mockUser.firstName).toBe("Danny");
      expect(mockUser.lastName).toBe("Tanner");
      expect(mockUser.jobTitle).toBe("Developer");
      expect(mockUser.auth.googleId).toBe("1111111111111111");
      expect(mockUser.auth.email).toBe("danny.tanner@example.com");
      expect(mockUser.avatar[0].url).toBe("http://www.avatars.com/kiki.jpg");
      expect(Array.from(mockUser.interestTags)).toEqual([
        "interest_a",
        "interest_b",
        "interest_c",
      ]);
    });
  });
  describe("course recommendation", () => {
    it("creates a course recommendation", async () => {
      const recommendation: ICourseRecommendationSubmission = {
        title: "mockTitle",
        description: "mockDescription",
        url: "http://www.mockexample.com",
        rating: 0,
        category: CourseCategory.Engineering,
        tags: ["tag1"] as string[],
        notes: {},
      };
      const mockUser = await UserModel.create(MOCK_USER_DATA);
      const userId = mockUser._id.toString();
      const courseRecommendation = await mockUser.createCourseRecommendation(
        recommendation
      );
      expect(courseRecommendation.postedByUserId.toString()).toBe(userId);
      expect(courseRecommendation.title).toBe("mockTitle");
      expect(courseRecommendation.url).toBe("http://www.mockexample.com");
      expect(Array.from(courseRecommendation.tags)).toEqual(["tag1"]);
      expect(courseRecommendation.category).toBe(CourseCategory.Engineering);
      expect(courseRecommendation.rating).toBe(0);
    });
  });

  describe("delete course recommendation", () => {
    it("deletes recommendation correctly", async () => {
      const mockUser = await UserModel.create(MOCK_USER_DATA);
      const resultUser = await mockUser.deleteInterestTags([
        "interest_a",
        "interest_c",
      ]);
      expect(resultUser.interestTags).toHaveLength(1);
      expect(Array.from(resultUser.interestTags)).toContain("interest_b");
    });
  });
});
