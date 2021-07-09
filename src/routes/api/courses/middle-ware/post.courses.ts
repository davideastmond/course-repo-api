import { CourseModel } from "../../../../models/course/course.model";
import mongoose from "mongoose";

export const findCourses = async (req: any, res: any, next: any) => {
  try {
    const courses = await CourseModel.find();
    if (courses && courses.length > 0) {
      return res.status(200).send(courses);
    }
    next();
  } catch (exception) {
    return res.status(500).send({ error: "Server error" });
  }
};

export const createDummyCourses = async (req: any, res: any) => {
  try {
    const courses = await CourseModel.fillWithDummyData();
    return res.status(200).send(courses);
  } catch (exception) {
    return res.status(500).send({ error: "Server error" });
  }
};

export const createCourseRecommendation = async (req: any, res: any) => {
  const { courseTitle, courseUrl, description, category, tags } = req.body;

  const placeHolderUserId = mongoose.Types.ObjectId("60e477c746e78b15614b4a34");
  try {
    await CourseModel.create({
      courseTitle,
      courseUrl,
      description,
      category,
      tags,
      postedByUserId: placeHolderUserId,
    });
    const courses = await CourseModel.find();
    return res.status(200).send(courses);
  } catch (exception) {
    return res
      .status(500)
      .send({ error: `Server error | create course | ${exception.message}` });
  }
};
