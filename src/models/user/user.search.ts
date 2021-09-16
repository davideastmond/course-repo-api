import { UserModel } from "./user.model";
import { ISecureAdaptedUser } from "./user.types";
import { adaptToSecureUser } from "./utils";

export async function searchUsersByKeyword(
  query: string
): Promise<ISecureAdaptedUser[]> {
  if (!query) throw new Error("Invalid query");
  const expr = new RegExp(query, "i");

  const searchString = query.trim().toLowerCase();
  const mongoSearchQuery = { "$search": searchString };
  const usersByIndexedSearch = await UserModel.find({
    "$text": mongoSearchQuery,
  }).limit(50);
  const usersByKeywordSearch = await UserModel.find({
    interestTags: expr,
  }).limit(50);
  return usersByIndexedSearch
    .map((result) => adaptToSecureUser(result))
    .concat(usersByKeywordSearch.map((result) => adaptToSecureUser(result)));
}
