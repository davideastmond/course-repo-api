import { Document, Model } from "mongoose";

export interface INotification {
  sourceId: string;
  targetId: string;
  url?: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  read: boolean;
  type: NotificationType;
}

export enum NotificationType {
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
  pushOne: ({
    type,
    sourceId,
    targetId,
    message,
    url,
  }: {
    type: NotificationType;
    sourceId: string;
    targetId: string;
    message: string;
    url?: string;
  }) => Promise<INotificationPushData>;
  markOneAsRead: ({
    notificationId,
    targetId,
  }: {
    notificationId: string;
    targetId: string;
  }) => Promise<INotificationDocument[]>;
  deleteNotificationById: ({
    notificationId,
    targetId,
  }: {
    notificationId: string;
    targetId: string;
  }) => Promise<INotificationDocument[]>;
}
