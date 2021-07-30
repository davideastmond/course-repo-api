import { Schema } from "mongoose";
import { SchemaOptionsWithPojoToMixed } from "./course.schema";

const CourseNoteSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: "",
    },
    notes: {
      type: [String],
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
