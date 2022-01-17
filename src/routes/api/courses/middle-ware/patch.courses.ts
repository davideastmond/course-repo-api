import { doToggleCourseLike } from "../../../../controllers/course/course.statics";

export const toggleLikes = async (req: any, res: any) => {
  try {
    const result = await doToggleCourseLike({
      forCourseId: req.params.id,
      forUserId: req.user.id,
    });
    return res.status(200).send(result);
  } catch (exception) {
    return res.status(500).send({ error: exception.message });
  }
};
