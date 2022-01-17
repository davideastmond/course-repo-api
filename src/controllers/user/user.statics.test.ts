import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MOCK_USER_DATA } from "./mock-user-data";
import { UserModel } from "../../models/user/user.model";

let mongoServer: any;
let spy: any;
const options: mongoose.ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

beforeAll(async () => {
  spy = jest.spyOn(UserModel, "create");
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

describe("findOneByGoogleIdOrCreate tests", () => {
  test("finds existing user from db", async () => {
    const testUser = {
      ...MOCK_USER_DATA,
      auth: {
        ...MOCK_USER_DATA.auth,
        googleId: "ABCDEFtest",
      },
    };
    await UserModel.create(testUser);
    const googleUser = await UserModel.findOneByGoogleIdOrCreate(testUser);
    expect(googleUser.auth.googleId).toBe("ABCDEFtest");
  });

  test("creates new user in db", async () => {
    const testUser = {
      ...MOCK_USER_DATA,
      auth: {
        ...MOCK_USER_DATA.auth,
        googleId: "ABCDEFtest",
      },
    };
    const googleUser = await UserModel.findOneByGoogleIdOrCreate(testUser);
    expect(googleUser).toBeDefined();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
