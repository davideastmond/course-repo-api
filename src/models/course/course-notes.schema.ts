import { Schema } from "mongoose";
import { SchemaOptionsWithPojoToMixed } from "./course.schema";

const CourseNoteSchema: Schema = new Schema(
  {
    learningBlurb: {
      type: String,
      required: true,
      default: "",
    },
    takeAways: {
      type: Schema.Types.Mixed,
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
    strict: false,
    typePojoToMixed: false,
  } as SchemaOptionsWithPojoToMixed
);

CourseNoteSchema.index({
  "title": "text",
});

export default CourseNoteSchema;
