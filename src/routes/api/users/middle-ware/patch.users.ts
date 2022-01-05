import { IUserDocument } from "../../../../models/user/user.types";
import { UserModel } from "../../../../models/user/user.model";

export const updateUserJobTitleDepartment = async (req: any, res: any) => {
  const { jobTitle, department } = req.body;
  if (req.params.id !== "me")
    return res.status(400).send({ error: "param id must be me" });
  try {
    const user = await UserModel.findById(req.user.id);
    user.jobTitle = jobTitle;
    user.department = department;
    await user.save();
    return res.status(200).send(user);
  } catch (exception) {
    return res.status(500).send({ error: exception.message });
  }
};

export const toggleFollowUser = async (req: any, res: any) => {
  if (!req.user)
    return res.status(400).send({ error: "User is not authenticated" });
  try {
    const user = req.user as IUserDocument;
    const { id } = req.params;
    const result = await user.toggleFollowForUser(id);
    return res.status(200).send(result);
  } catch (exception) {
    return res.status(500).send({ error: exception.message });
  }
};
