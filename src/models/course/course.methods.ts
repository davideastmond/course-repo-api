import { ICourseDocument } from "./course.types";
import { MOCK_COURSES, MOCK_COURSES_2 } from "./helpers/mock-data/mock-courses";
import { CourseModel } from "./course.model";

export async function fillWithDummyData(): Promise<ICourseDocument[]> {
  const dummyCourses = await CourseModel.create(MOCK_COURSES_2);
  return dummyCourses;
}
