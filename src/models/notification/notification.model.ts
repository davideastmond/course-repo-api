import { model } from "mongoose";
import NotificationSchema from "./notification.schema";
import {
  INotificationDocument,
  INotificationModel,
} from "./notification.types";

export const NotificationModel = model<
  INotificationDocument,
  INotificationModel
>("notifications", NotificationSchema, "notifications");
