import { Document, Model } from "mongoose";
import {
  ICourseDocument,
  ICourseRecommendationSubmission,
} from "../course/course.types";
import { IAdaptedUser } from "../utils/create-user-from-google-data";
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
}
export interface IUserModel extends Model<IUserDocument> {
  findOneByGoogleIdOrCreate: (
    this: IUserModel,
    user: IAdaptedUser
  ) => Promise<IUserDocument>;
}
