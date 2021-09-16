import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MOCK_COURSES, MOCK_COURSES_2 } from "./helpers/mock-data";
import { CourseModel } from "./course.model";
import { searchCoursesByKeyword } from "./course.search";
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

describe("Search -> Course", () => {
  test("search courses returns correctly", async () => {
    await CourseModel.create(MOCK_COURSES.concat(MOCK_COURSES_2));
    const results = await searchCoursesByKeyword("automation");
    expect(results[0].category).toBe("marketing");
    expect(results[0]).toHaveProperty("_id");
    expect(results[0]).toHaveProperty("tags");
    expect(results[0].tags.includes("automation")).toBe(true);
  });
});
