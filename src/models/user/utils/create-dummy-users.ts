import { UserModel } from "../user.model";
import { IUser, IUserDocument } from "../user.types";

// const MOCK_USERS = require("../course-repo-sanitized-users.json");
import { sanitizedUsers } from "../course-repo-sanitized-users";
export async function createDummyUsers(): Promise<IUserDocument[]> {
  return UserModel.create(sanitizedUsers as IUser[]);
}
