import mongoose from "mongoose";
import _difference from "lodash/difference";
import { CourseModel } from "../course/course.model";
import {
  ICourseDocument,
  ICourseRecommendationSubmission,
} from "../course/course.types";
import { ISecureAdaptedUser, IUserDocument } from "./user.types";
import { adaptToSecureUser } from "./utils";

export async function createCourseRecommendation(
  this: IUserDocument,
  data: ICourseRecommendationSubmission
): Promise<ICourseDocument> {
  const course = await CourseModel.create({
    title: data.title,
    url: data.url,
    description: data.description,
    rating: data.rating,
    category: data.category,
    tags: data.tags,
    notes: data.notes,
    postedByUserId: this._id,
  });

  if (!this.interestTags.includes(course._id)) {
    this.interestTags.push(course._id);
  }
  await this.save();
  return course;
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

export async function deleteCourseRecommendations(
  this: IUserDocument,
  courseIds: string[]
): Promise<ISecureAdaptedUser> {
  if (!courseIds || courseIds.length === 0)
    throw new Error("No course ids specified in the delete request");

  if (courseIds.every((id) => this.courses.includes(id))) {
    this.courses = _difference(this.courses, courseIds);
    await CourseModel.deleteMany({
      "postedByUserId": this.id,
      "_id": { "$in": courseIds },
    });
    await this.save();
    return adaptToSecureUser(this);
  } else {
    throw new Error(
      "not all of the ids requested to be deleted are in the user's courses property"
    );
  }
}
