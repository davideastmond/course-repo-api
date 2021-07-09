import { CourseModel } from "../../../../models/course/course.model";

export const retrieveAllCoursesFromDb = async (req: any, res: any) => {
  try {
    const coursesData = await CourseModel.find();
    return res.status(200).send(coursesData);
  } catch (exception) {
    return res.status(500).send({
      error: exception.message,
    });
  }
};
