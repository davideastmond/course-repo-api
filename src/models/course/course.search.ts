import { CourseModel } from "./course.model";
import { ICourseDocument } from "./course.types";

export async function searchCoursesByKeyword(
  query: string
): Promise<ICourseDocument[]> {
  if (!query) throw new Error("Invalid query");
  const expr = new RegExp(query, "i");

  return CourseModel.find({
    "$or": [
      { title: { "$regex": expr } },
      { description: { "$regex": expr } },
      { category: { "$regex": expr } },
      { url: { "$regex": expr } },
    ],
  }).limit(50); // POIJ - need a scalable solution
}
