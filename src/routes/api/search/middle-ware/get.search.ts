import { performSearchQuery } from "../../../../services/search/search-query";

export const performSearch = async (req: any, res: any) => {
  try {
    const results = await performSearchQuery(req.query.queryString);
    return res.status(200).send(results);
  } catch (exception) {
    return res.status(500).send({ error: exception.message });
  }
};
