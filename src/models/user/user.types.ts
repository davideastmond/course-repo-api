import { Document, Model } from "mongoose";
import { IAdaptedUser } from "../../controllers/user/utils/create-user-from-google-data";
import {
  ICourseDocument,
  ICourseRecommendationSubmission,
} from "../course/course.types";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  jobTitle: string;
  auth: {
    googleId: string;
    email: string;
    accessToken: string;
  };
  avatar?: Array<{ url: string }>;
  courses: Array<string>;
  createdAt: Date;
  updatedAt: Date;
  department: string;
  interestTags: string[];
  likedCourses: { [keyof: string]: Date };
}

export interface ISecureAdaptedUser {
  firstName: string;
  lastName: string;
  _id: string;
  jobTitle: string;
  avatar: { url: string }[];
  courses: string[];
  createdAt: Date;
  updatedAt: Date;
  department: string;
  interestTags: string[];
  likedCourses: { [keyof: string]: Date };
}
export interface IUserDocument extends IUser, Document {
  createCourseRecommendation: (
    this: IUserDocument,
    data: ICourseRecommendationSubmission
  ) => Promise<ICourseDocument>;
  deleteInterestTags: (
    this: IUserDocument,
    interestTags: string[]
  ) => Promise<IUserDocument>;
  deleteCourseRecommendations: (
    this: IUserDocument,
    courseIds: string[]
  ) => Promise<ISecureAdaptedUser>;
  reconcileWithCourses: (this: IUserDocument) => Promise<IUserDocument>;
}
export interface IUserModel extends Model<IUserDocument> {
  findOneByGoogleIdOrCreate: (
    this: IUserModel,
    user: IAdaptedUser
  ) => Promise<IUserDocument>;
}
