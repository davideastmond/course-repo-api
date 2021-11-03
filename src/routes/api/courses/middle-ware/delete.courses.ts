import { IUserDocument } from "../../../../models/user/user.types";

export const deleteCourseRecommendations = async (req: any, res: any) => {
  try {
    const user = req.user as IUserDocument;
    const { courseIds } = req.body;
    const updatedUserData = await user.deleteCourseRecommendations(courseIds);
    return res.status(200).send(updatedUserData);
  } catch (exception) {
    return res
      .status(500)
      .send({ error: `Server error: ${exception.message}` });
  }
};
