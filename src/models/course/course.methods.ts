import { CourseModel } from "./course.model";
import {
  ICourse,
  ICourseDocument,
  ICourseRecommendationSubmission,
} from "./course.types";

/**
 *
 * @param submission Object that has data needed to create a course
 * @param postedByUserId User Id
 */
export async function createCourse(
  submission: ICourseRecommendationSubmission,
  postedByUserId: string
): Promise<ICourseDocument> {
  const { title, url, description, rating, category, tags, notes } = submission;
  const courseRecommendation = {
    title,
    url,
    description,
    rating,
    category,
    tags,
    notes,
    postedByUserId,
  };

  return CourseModel.create(courseRecommendation);
}
