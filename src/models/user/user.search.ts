import { UserModel } from "./user.model";
import { ISecureAdaptedUser, IUser, IUserModel } from "./user.types";
import mingo from "mingo";
import { adaptToSecureUser } from "./utils";

export async function Search(
  this: IUserModel,
  query: string
): Promise<ISecureAdaptedUser[]> {
  if (!query) throw new Error("Invalid query");

  const searchString = query.trim().toLowerCase();
  const mongoSearchQuery = { "$search": searchString };
  // const usersByIndexedSearch = await UserModel.find({ "$text": mongoSearchQuery });
  // const usersByKeywordSearch = await UserModel.find({ interestTags: searchString });
  const users = await UserModel.find();
  const searchTerm = {
    "$or": [{ "$text": mongoSearchQuery }, { "interestTags": searchString }],
  };
  const mingoQuery = new mingo.Query(searchTerm);
  const cursor = mingoQuery.find(users);
  const results = cursor.all() as IUser[];
  return results.map((result) => adaptToSecureUser(result));
}
