import { param, validationResult } from "express-validator/check";

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
