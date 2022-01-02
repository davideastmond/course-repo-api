import mongoose from "mongoose";
import _pullAll from "lodash/pullAll";

import { adaptToSecureUser } from "./utils";
import { decodeString } from "../../services/html-parser/utils";
import { CourseModel } from "../../models/course/course.model";
import {
  ICourseRecommendationSubmission,
  ICourseDocument,
} from "../../models/course/course.types";
import {
  IUserDocument,
  ISecureAdaptedUser,
} from "../../models/user/user.types";

export async function createCourseRecommendation(
  this: IUserDocument,
  data: ICourseRecommendationSubmission
): Promise<ICourseDocument> {
  const course = await CourseModel.create({
    title: decodeString(data.title),
    url: data.url,
    description: decodeString(data.description),
    rating: data.rating,
    category: data.category,
    tags: data.tags,
    notes: data.notes,
    likes: {},
    postedByUserId: this._id,
  });

  if (!this.courses.includes(course._id.toString())) {
    this.courses.push(course._id.toString());
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
    this.courses = _pullAll(
      this.courses.map((courses) => courses.toString()),
      courseIds.map((course) => course.toString())
    );

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

export async function reconcileWithCourses(
  this: IUserDocument
): Promise<IUserDocument> {
  // Find all courses for this userId and ensure they are in the user's courses array
  const allCoursesForId = await CourseModel.find({
    postedByUserId: this._id.toString(),
  });
  if (allCoursesForId.length === 0) return this;

  const coursesToBindToUser = allCoursesForId.map((course) =>
    course.id.toString()
  );
  this.courses = coursesToBindToUser;
  await this.save();
  return this;
}
