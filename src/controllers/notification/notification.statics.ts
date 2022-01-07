import { NotificationModel } from "../../models/notification/notification.schema";
import {
  INotificationType,
  INotificationPushData,
} from "../../models/notification/notification.types";
import { UserModel } from "../../models/user/user.model";

export async function push({
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
}): Promise<INotificationPushData> {
  // Find the source user and find the target user
  const source = await UserModel.findById(sourceId);
  const target = await UserModel.findById(targetId);

  if (!source) throw new Error("Notification: can't find source");
  if (!target) throw new Error("Can't find target");

  // Create a new notification
  const notification = await NotificationModel.create({
    type,
    sourceId,
    targetId,
    message,
    url,
  });
  target.notifications.push(notification);
  target.markModified("notifications");
  await target.save();
  return { notification, sourceId, targetId };
}
