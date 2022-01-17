import { Schema, SchemaOptions, model } from "mongoose";
import {
  deleteNotificationById,
  markOneAsRead,
  pushOne,
} from "../../controllers/notification/notification.statics";

import {
  INotificationDocument,
  INotificationModel,
} from "./notification.types";
interface SchemaOptionsWithPojoToMixed extends SchemaOptions {
  typePojoToMixed: boolean;
}

const NotificationSchema: Schema = new Schema(
  {
    sourceId: { type: Schema.Types.ObjectId, required: true },
    targetId: { type: Schema.Types.ObjectId, required: true },
    url: { type: String, required: false },
    message: { type: String, required: true },
    read: { type: Boolean, required: true, default: false },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
    strict: false,
    typePojoToMixed: false,
  } as SchemaOptionsWithPojoToMixed
);

NotificationSchema.statics.pushOne = pushOne;
NotificationSchema.statics.markOneAsRead = markOneAsRead;
NotificationSchema.statics.deleteNotificationById = deleteNotificationById;

export const NotificationModel = model<
  INotificationDocument,
  INotificationModel
>("notifications", NotificationSchema, "notifications");
export default NotificationSchema;
