import { UserModel } from "../../models/user/user.model";
import { IUser, IUserDocument, IUserModel } from "../../models/user/user.types";

export async function findOneByGoogleIdOrCreate(
  this: IUserModel,
  user: IUser
): Promise<IUserDocument> {
  const userDocuments = await UserModel.find({
    "auth.googleId": user.auth.googleId,
  });
  if (userDocuments && userDocuments.length > 0) {
    return userDocuments[0];
  }
  return this.create(user);
}
