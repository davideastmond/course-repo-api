import { NotificationModel } from "../../models/notification/notification.schema";
import {
  NotificationType,
  INotificationPushData,
  INotificationDocument,
} from "../../models/notification/notification.types";
import { UserModel } from "../../models/user/user.model";

export async function pushOne({
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

export async function markOneAsRead({
  notificationId,
  targetId,
}: {
  notificationId: string;
  targetId: string;
}): Promise<INotificationDocument[]> {
  const notification = await NotificationModel.findById(notificationId);
  const targetUser = await UserModel.findById(targetId);
  if (!notification)
    throw new Error(`Notification with id ${notificationId} not found`);
  if (!targetUser) throw new Error(`user with id ${targetId} not found`);

  notification.read = true;
  const idx = targetUser.notifications.findIndex(
    (element) => element._id.toString() === notification._id.toString()
  );
  if (idx >= 0) {
    targetUser.notifications[idx].read = true;
    targetUser.markModified("notifications");
    await targetUser.save();
    await notification.save();
    return targetUser.notifications;
  } else {
    throw new Error(
      `Notification with id ${notification._id.toString()} wasn't found on target User ${
        targetUser._id
      } notification array`
    );
  }
}

export async function deleteNotificationById({
  notificationId,
  targetId,
}: {
  notificationId: string;
  targetId: string;
}): Promise<INotificationDocument[]> {
  const targetUser = await UserModel.findById(targetId);
  await NotificationModel.deleteOne({ id: notificationId });
  const filteredNotifications = targetUser.notifications.filter(
    (notification) => notification._id.toString() !== notificationId
  );
  targetUser.notifications = filteredNotifications;
  targetUser.markModified("notifications");
  await targetUser.save();
  return targetUser.notifications;
}
