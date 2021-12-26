import { body, param, query, validationResult } from "express-validator/check";

export const getParamIdValidator = (): any[] => {
  return [param("id").not().isEmpty().trim().escape()];
};
export const getCourseIdValidator = (): any[] => {
  return [param("courseId").not().isEmpty().trim().escape()];
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
    body("title").not().isEmpty().trim().escape(),
    body("rating").not().isEmpty(),
    body("url").not().isEmpty().trim().isURL(),
    body("description").not().isEmpty().trim().escape(),
    body("tags").isArray(),
    body("notes").exists(),
  ];
};

export const utilsURLValidator = (): any[] => {
  return [body("url").not().isEmpty().trim().isURL()];
};

export const newInterestTagValidator = (): any[] => {
  return [body("interestTags").exists().isArray()];
};

export const patchUserProfileJobTitleDepartmentValidator = (): any[] => {
  return [
    body("jobTitle").exists({ checkNull: true }).trim().escape(),
    body("department").exists({ checkNull: true }).trim().escape(),
  ];
};

export const getAllCoursesLimitSkipBodyValidator = (): any[] => {
  return [query("limit").exists().isInt(), query("skip").exists().isInt()];
};

export const searchQueryParameterValidator = (): any[] => {
  return [query("queryString").exists().trim().escape()];
};

export const deleteCourseRecommendationsValidator = (): any[] => {
  return [body("courseIds").exists({ checkNull: true }).isArray()];
};
