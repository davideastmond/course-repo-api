import { UserModel } from "../../../../models/user/user.model";

export const updateUserInterestTags = async (
  req: any,
  res: any
): Promise<void> => {
  if (req.params.id !== "me")
    return res
      .status(400)
      .send({ error: `id must be "me" for this type of request` });
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user)
      return res.status(404).send({ error: "unable to find req.user" });
    user.interestTags = req.body.interestTags;
    await user.save();
    return res.status(200).send(user.interestTags);
  } catch (exception) {
    return res.status(500).send({ error: exception.message });
  }
};
