import { CourseModel } from "../../../../models/course/course.model";

export const retrieveAllCoursesFromDb = async (req: any, res: any) => {
  const { limit, skip } = req.query;
  console.log(`limit ${limit} skip ${skip}`);
  try {
    const coursesData = await CourseModel.find()
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    return res.status(200).send(coursesData);
  } catch (exception) {
    return res.status(500).send({
      error: exception.message,
    });
  }
};

export const getCourseDetailById = async (req: any, res: any) => {
  try {
    const course = await CourseModel.findById(req.params.id);
    return res.status(200).send(course);
  } catch (exception) {
    return res.status(500).send({
      error: exception.message,
    });
  }
};
