import { CourseModel } from "../course/course.model";
import { ICourseDocument } from "../course/course.types";
import { IUserDocument } from "./user.types";

export interface ICourseRecommendationData {
  title: string;
  description?: string;
  url: string;
  rating: number;
}
export async function createCourseRecommendation(
  this: IUserDocument,
  data: ICourseRecommendationData
): Promise<ICourseDocument> {
  return CourseModel.create({
    courseTitle: data.title,
    postedByUserId: this._id,
    description: data.description,
    rating: data.rating,
    courseUrl: data.url,
  });
}
