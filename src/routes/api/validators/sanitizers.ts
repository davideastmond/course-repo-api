import { body } from "express-validator/check";
import { CourseCategory } from "../../../models/course/course.types";

export const categoryParamSanitizer = (): any => {
  return [
    body("category").customSanitizer((value) => {
      if (!value || value.trim() === "") {
        return CourseCategory.NoCategory as string;
      }
      return value;
    }),
  ];
};
