import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import { UserModel } from "../../models/user/user.model";
import { createDummyUsers } from "../user/utils/create-dummy-users";
import { NotificationModel } from "../../models/notification/notification.schema";
import { INotificationType } from "../../models/notification/notification.types";

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

describe("notification tests", () => {
  test("push static method creates notification correctly and stores it on the correct collections", async () => {
    const dummyUsers = await createDummyUsers();
    const sourceId = dummyUsers[0]._id.toString();
    const targetId = dummyUsers[1]._id.toString();

    const res = await NotificationModel.push({
      type: INotificationType.UserFollow,
      sourceId,
      targetId,
      message: `${dummyUsers[0].firstName} started following you`,
    });
    const targetUser = await UserModel.findById(targetId);

    expect(res.sourceId).toBe(sourceId);
    expect(res.targetId).toBe(targetId);
    expect(targetUser.notifications.length).toBe(1);
    expect(targetUser.notifications[0].read).toBe(false);
    expect(targetUser.notifications[0]._id.toString()).toBe(
      res.notification._id.toString()
    );
  });
});
