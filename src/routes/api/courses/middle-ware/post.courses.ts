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

export const createCourseRecommendation = async (req: any, res: any) => {
  const { title, url, rating, description, notes, category, tags } = req.body;

  const placeHolderUserId = req.user.id;
  try {
    await CourseModel.createCourse(
      {
        title,
        url,
        description,
        rating,
        category,
        tags,
        notes,
      },
      placeHolderUserId
    );
    const courses = await CourseModel.find();
    return res.status(200).send(courses);
  } catch (exception) {
    return res
      .status(500)
      .send({ error: `Server error | create course | ${exception.message}` });
  }
};
