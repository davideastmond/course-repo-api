import { CourseQueryType } from "../../../../models/course/course.types";
import { CourseModel } from "../../../../models/course/course.model";

export const retrieveCoursesFromDb = async (req: any, res: any) => {
  const { limit, skip, queryType } = req.query;
  console.log("queryType is", queryType);
  try {
    if (queryType === CourseQueryType.All) {
      const coursesData = await CourseModel.find()
        .limit(parseInt(limit))
        .skip(parseInt(skip));
      return res.status(200).send(coursesData);
    } else {
      const coursesData = await CourseModel.fetchCoursesByInterest({
        limit: parseInt(limit),
        skip: parseInt(skip),
        userId: req.user.id,
      });
      return res.status(200).send(coursesData);
    }
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
