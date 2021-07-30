import { Schema, SchemaOptions } from "mongoose";
import CourseNoteSchema from "./course-notes.schema";
import { fillWithDummyData } from "./course.methods";
export interface SchemaOptionsWithPojoToMixed extends SchemaOptions {
  typePojoToMixed: boolean;
}
const CourseSchema: Schema = new Schema(
  {
    postedByUserId: { type: Schema.Types.ObjectId, required: true },
    courseTitle: { type: String, required: true },
    courseUrl: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    reviews: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },
    tags: [String],
    category: {
      type: String,
      required: false,
      default: "not-categorized",
    },
    details: {
      type: [CourseNoteSchema],
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
CourseSchema.index({
  "courseTitle": "text",
  "description": "text",
  "tags": "text",
});

CourseSchema.statics.fillWithDummyData = fillWithDummyData;
export default CourseSchema;
