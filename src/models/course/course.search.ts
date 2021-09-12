import { CourseModel } from "./course.model";
import { ICourseDocument } from "./course.types";

export async function searchCoursesByKeyword(
  query: string
): Promise<ICourseDocument[]> {
  if (!query) throw new Error("Invalid query");

  const searchString = query.trim().toLowerCase();
  const mongoSearchQuery = { "$search": searchString };
  return CourseModel.find({ "$text": mongoSearchQuery });
}
