import { ISecureAdaptedUser, IUser } from "../../../../models/user/user.types";
import { UserModel } from "../../../../models/user/user.model";

const adaptToSecureUser = (userDocument: IUser): ISecureAdaptedUser => {
  return {
    firstName: userDocument.firstName,
    lastName: userDocument.lastName,
    _id: userDocument._id,
    jobTitle: userDocument.jobTitle,
    avatar: userDocument.avatar,
    courses: userDocument.courses,
    createdAt: userDocument.createdAt,
    updatedAt: userDocument.updatedAt,
  };
};
export const getUserById = async (req: any, res: any): Promise<void> => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: `User id ${req.params.id}` });
    }
    const adaptedUserData = adaptToSecureUser(user);
    return res.status(200).send(adaptedUserData);
  } catch (exception) {
    return res.status(500).send({ error: "Server error. Unable to get user" });
  }
};

export const getRequestingUser = async (
  req: any,
  res: any,
  next: any
): Promise<void> => {
  console.log("REQ PARAMS", req.params.id);
  if (req.params.id === "me") {
    if (!req.user.id) {
      return res
        .status(400)
        .send({ error: "Unable to get user 'me': Unauthorized request" });
    }
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).send({ error: `User id ${req.params.id} (me)` });
    }
    const adaptedUserData = adaptToSecureUser(user);
    return res.status(200).send(adaptedUserData);
  }
  next();
};
