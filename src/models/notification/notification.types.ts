import { Document, Model } from "mongoose";

export interface INotification {
  sourceId: string;
  targetId: string;
  url?: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  read: boolean;
  type: INotificationType;
}

export enum INotificationType {
  UserFollow = "user_follow",
  CourseRecommendationLike = "course_like",
}

export interface INotificationPushData {
  notification: INotificationDocument;
  sourceId: string;
  targetId: string;
}

export interface INotificationDocument extends INotification, Document {}
export interface INotificationModel extends Model<INotificationDocument> {
  push: ({
    type,
    sourceId,
    targetId,
    message,
    url,
  }: {
    type: INotificationType;
    sourceId: string;
    targetId: string;
    message: string;
    url?: string;
  }) => Promise<INotificationPushData>;
}
