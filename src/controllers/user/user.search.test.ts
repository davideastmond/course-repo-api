import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createDummyUsers } from "./utils/create-dummy-users";
import { searchUsersByKeyword } from "./user.search";

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

describe("Search => user tests", () => {
  test("searches properly", async () => {
    await createDummyUsers();
    const results = await searchUsersByKeyword("lorem");
    expect(results[0].interestTags.includes("lorem ipsum"));
  });
});
