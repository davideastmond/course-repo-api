import { UserModel } from "../../../../models/user/user.model";

export const deleteTagsByIdAndTagTitles = async (req: any, res: any) => {
  if (req.params.id !== "me")
    return res.status(400).send({ error: "param id must be me" });
  try {
    const { interestTags } = req.body;
    const user = await UserModel.findById(req.user.id);
    const result = await user.deleteInterestTags(interestTags);
    return res.status(200).send(result.interestTags);
  } catch (exception) {
    return res.status(500).send({ error: exception.message });
  }
};
