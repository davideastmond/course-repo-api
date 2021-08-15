import mongoose from "mongoose";
import { createCourse } from "./course.methods";
import { CourseCategory } from "./course.types";
import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
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

describe("course.methods.test", () => {
  describe("create", () => {
    it("creates correctly", async () => {
      const mockUserId = mongoose.Types.ObjectId();
      const courseRecommendation = {
        title: "courseTitle",
        url: "courseUrl",
        description: "desc",
        rating: 3,
        category: CourseCategory.Design,
        tags: ["a", "b", "c"],
        notes: {},
      };
      const course = await createCourse(
        courseRecommendation,
        mockUserId.toHexString()
      );
      expect(course.title).toBe("courseTitle");
      expect(course.rating).toBe(3);
      expect(course.tags).toEqual(["a", "b", "c"]);
      expect(course.url).toBe("courseUrl");
      expect(course.postedByUserId).toBe(mockUserId.toHexString());
    });
  });
});
