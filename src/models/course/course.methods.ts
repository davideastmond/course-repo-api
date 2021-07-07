import { ICourseDocument } from "./course.types";
import { MOCK_COURSES } from "./helpers/mock-data/mock-courses";
import { CourseModel } from "./course.model";

export async function fillWithDummyData(): Promise<ICourseDocument[]> {
  const dummyCourses = await CourseModel.create(MOCK_COURSES);
  return dummyCourses;
}
