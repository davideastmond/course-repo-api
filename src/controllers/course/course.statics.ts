import { CourseModel } from "../../models/course/course.model";
import {
  ICourse,
  ICourseDocument,
  ILikeToggleActionResult,
} from "../../models/course/course.types";
import { UserModel } from "../../models/user/user.model";
import { IUserDocument } from "../../models/user/user.types";

export async function doToggleCourseLike({
  forUserId,
  forCourseId,
}: {
  forUserId: string;
  forCourseId: string;
}): Promise<ILikeToggleActionResult> {
  // Source of truth will be the user's course's liked
  const user = await UserModel.findById(forUserId);
  const course = await CourseModel.findById(forCourseId);

  if (!user) throw new Error("Course like toggle: user not found");
  if (!course) throw new Error("Course like toggle: course not found");
  if (user && course) {
    // Determine if course is already liked
    if (isCourseLikedByUser({ user, courseId: course._id.toString() })) {
      delete user.likedCourses[`${course._id.toString()}`];
      delete course.likes[`${user._id.toString()}`];
      user.markModified("likedCourses");
      course.markModified("likes");
      await user.save();
      await course.save();
      const allCourses = await CourseModel.find();
      return { courses: allCourses, actionTaken: "unlike" };
    } else {
      // add records to course and user
      user.likedCourses[`${course._id.toString()}`] = new Date();
      course.likes[`${user._id.toString()}`] = new Date();
      user.markModified("likedCourses");
      course.markModified("likes");
      await user.save();
      await course.save();
      const allCourses = await CourseModel.find();
      return { courses: allCourses, actionTaken: "like" };
    }
  }
}

function isCourseLikedByUser({
  user,
  courseId,
}: {
  user: IUserDocument;
  courseId: string;
}): boolean {
  return !!user.likedCourses[courseId];
}
