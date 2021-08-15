import { CourseModel } from "../course/course.model";
import {
  ICourseDocument,
  ICourseRecommendationSubmission,
} from "../course/course.types";
import { IUserDocument } from "./user.types";

export async function createCourseRecommendation(
  this: IUserDocument,
  data: ICourseRecommendationSubmission
): Promise<ICourseDocument> {
  return CourseModel.create({
    title: data.title,
    url: data.url,
    description: data.description,
    rating: data.rating,
    category: data.category,
    tags: data.tags,
    notes: data.notes,
    postedByUserId: this._id,
  });
}

export async function deleteInterestTags(
  this: IUserDocument,
  interestTags: string[]
): Promise<IUserDocument> {
  if (!interestTags || interestTags.length === 0) return this;
  const filteredTags = this.interestTags.filter((tag) => {
    return !interestTags.includes(tag);
  });

  this.interestTags = filteredTags;
  await this.save();
  return this;
}
