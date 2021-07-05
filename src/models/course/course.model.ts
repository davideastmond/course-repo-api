import { model } from "mongoose";
import CourseSchema from "./course.schema";
import { ICourseDocument, ICourseModel } from "./course.types";

export const CourseModel = model<ICourseDocument, ICourseModel>(
  "courses",
  CourseSchema,
  "courses"
);
