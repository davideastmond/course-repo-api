import { UserModel } from "../../../../models/user/user.model";

export const getUserById = async (req: any, res: any): Promise<void> => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: `User id ${req.params.id}` });
    }
    return res.status(200).send({
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
      jobTitle: user.jobTitle,
      avatar: user.avatar,
      courses: user.courses,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (exception) {
    return res.status(500).send({ error: "Server error. Unable to get user" });
  }
};
