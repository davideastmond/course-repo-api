import { getAutoFillDataFromURL } from "../../../../services/html-parser/html-parser";

export const attemptToAutoCompleteFromURL = async (req: any, res: any) => {
  const { url } = req.body;
  try {
    const results = await getAutoFillDataFromURL(url);
    return res.status(200).send(results);
  } catch (exception) {
    return res.status(500).send({ error: exception.message });
  }
};
