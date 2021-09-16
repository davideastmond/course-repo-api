import { IUser, ISecureAdaptedUser } from "../user.types";

export const adaptToSecureUser = (userDocument: IUser): ISecureAdaptedUser => {
  return {
    firstName: userDocument.firstName,
    lastName: userDocument.lastName,
    _id: userDocument._id,
    jobTitle: userDocument.jobTitle,
    avatar: userDocument.avatar,
    courses: userDocument.courses,
    createdAt: userDocument.createdAt,
    updatedAt: userDocument.updatedAt,
    department: userDocument.department,
    interestTags: userDocument.interestTags,
  };
};
