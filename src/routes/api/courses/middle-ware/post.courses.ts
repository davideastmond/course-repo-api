import { CourseModel } from "../../../../models/course/course.model";

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
