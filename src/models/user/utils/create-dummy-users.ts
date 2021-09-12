import { UserModel } from "../user.model";
import { IUser, IUserDocument } from "../user.types";

const MOCK_USERS = require("../course-repo-sanitized-users.json");
export async function createDummyUsers(): Promise<IUserDocument[]> {
  return UserModel.create(MOCK_USERS as IUser[]);
}
