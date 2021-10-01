import { IAdaptedUser } from "../utils/create-user-from-google-data";
import { UserModel } from "./user.model";
import { IUserDocument, IUserModel } from "./user.types";

export async function findOneByGoogleIdOrCreate(
  this: IUserModel,
  user: IAdaptedUser
): Promise<IUserDocument> {
  const userDocuments = await UserModel.find({
    "auth.googleId": user.auth.googleId,
  });
  if (userDocuments && userDocuments.length > 0) {
    return userDocuments[0];
  }
  return this.create(user);
}
