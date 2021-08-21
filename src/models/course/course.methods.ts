import mongoose from "mongoose";
import { UserModel } from "../user/user.model";
import { CourseModel } from "./course.model";
import { ICourseDocument, ICourseModel } from "./course.types";

export async function fetchCoursesByInterest(
  this: ICourseModel,
  data: { limit: number; skip: number; userId: mongoose.Types.ObjectId }
): Promise<ICourseDocument[]> {
  const user = await UserModel.findById(data.userId);
  if (!user) {
    throw new Error(`Unable to find user by id ${data.userId}`);
  }

  // POIJ: We can break this down further: if user has no interestTags, we can find courses by their jobTitle, department, or the tags from other
  // courses they have posted.
  if (!user.interestTags || user.interestTags.length === 0) {
    return CourseModel.find().limit(data.limit).skip(data.skip);
  }
  return CourseModel.find({ "tags": { "$in": user.interestTags } })
    .limit(data.limit)
    .skip(data.skip);
}
