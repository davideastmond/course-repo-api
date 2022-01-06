import { Document, Model } from "mongoose";
import { IAdaptedUser } from "../../controllers/user/utils/create-user-from-google-data";
import {
  ICourseDocument,
  ICourseRecommendationSubmission,
} from "../course/course.types";
import { INotificationDocument } from "../notification/notification.types";

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
  following: { [keyof: string]: Date };
  followedBy: { [keyof: string]: Date };
  notifications: {
    unread: Array<INotificationDocument>;
    read: Array<string>;
  };
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
  following: { [keyof: string]: Date };
  followedBy: { [keyof: string]: Date };
}

export type TToggleFollowReturnData = {
  sourceUser: ISecureAdaptedUser;
  targetUser: ISecureAdaptedUser;
  actionTaken: ToggleFollowAction;
};

export enum ToggleFollowAction {
  Follow = "follow",
  Unfollow = "unfollow",
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
  toggleFollowForUser: (
    this: IUserDocument,
    targetUserId: string
  ) => Promise<TToggleFollowReturnData>;
}
export interface IUserModel extends Model<IUserDocument> {
  findOneByGoogleIdOrCreate: (
    this: IUserModel,
    user: IAdaptedUser
  ) => Promise<IUserDocument>;
}
