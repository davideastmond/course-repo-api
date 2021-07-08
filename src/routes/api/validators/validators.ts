import { body, param, validationResult } from "express-validator/check";

export const getParamIdValidator = (): any[] => {
  return [param("id").not().isEmpty().trim().escape()];
};

export const validate = (req: any, res: any, next: any): any => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  next();
};

export const postNewCourseValidator = (): any[] => {
  return [
    body("courseTitle").not().isEmpty().trim().escape(),
    body("courseUrl").not().isEmpty().trim().isURL(),
    body("description").not().isEmpty().trim().escape(),
    body("category").not().isEmpty().trim().escape(),
    body("tags").isArray(),
  ];
};
