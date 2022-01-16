import { Request, Response } from "express";
import { NotificationModel } from "../../../../models/notification/notification.schema";
import { UserModel } from "../../../../models/user/user.model";

export const deleteTagsByIdAndTagTitles = async (req: any, res: any) => {
  if (req.params.id !== "me")
    return res.status(400).send({ error: "param id must be me" });
  try {
    const { interestTags } = req.body;
    const { id } = req.user;
    const user = await UserModel.findById(id);
    const result = await user.deleteInterestTags(interestTags);
    return res.status(200).send(result.interestTags);
  } catch (exception) {
    return res.status(500).send({ error: exception.message });
  }
};

interface ICustomRequest extends Request {
  user: {
    id: string;
  };
}

export const deleteNotificationById = async (
  req: ICustomRequest,
  res: Response
) => {
  if (!req.user)
    return res.status(400).send({ error: "User is not authenticated" });
  try {
    const notificationId = req.params.notificationId;
    const result = await NotificationModel.deleteNotificationById({
      notificationId,
      targetId: req.user.id,
    });
    return res.status(200).send(result);
  } catch (exception) {
    return res.status(500).send({ error: exception.message });
  }
};
