import { searchCoursesByKeyword } from "../../controllers/course/course.search";
import { searchUsersByKeyword } from "../../controllers/user/user.search";
import { ISearchResults } from "./search.types";

export async function performSearchQuery(
  queryString: string
): Promise<ISearchResults> {
  const userResults = await searchUsersByKeyword(queryString);
  const courseResults = await searchCoursesByKeyword(queryString);
  return {
    courses: courseResults,
    users: userResults,
  };
}
