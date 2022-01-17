import { CourseModel } from "../../models/course/course.model";
import { ILikeToggleActionResult } from "../../models/course/course.types";
import { NotificationModel } from "../../models/notification/notification.schema";
import { NotificationType } from "../../models/notification/notification.types";
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
      return {
        courses: allCourses,
        actionTaken: "unlike",
        courseChanged: course,
      };
    } else {
      // add records to course and user
      user.likedCourses[`${course._id.toString()}`] = new Date();
      course.likes[`${user._id.toString()}`] = new Date();
      user.markModified("likedCourses");
      course.markModified("likes");

      // Need to find the user who created the course recommendation that is being liked
      const targetUser = await UserModel.findById(course.postedByUserId);
      if (targetUser) {
        await NotificationModel.pushOne({
          type: NotificationType.CourseRecommendationLike,
          sourceId: user._id.toString(),
          targetId: targetUser._id.toString(),
          message: `${user.firstName} ${
            user.lastName || ""
          } liked your recommendation ${course.title}`,
        });
      }

      await user.save();
      await course.save();
      const allCourses = await CourseModel.find();
      return {
        courses: allCourses,
        actionTaken: "like",
        courseChanged: course,
      };
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
