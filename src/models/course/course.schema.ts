import { Schema, SchemaOptions } from "mongoose";
import { fetchCoursesByInterest } from "./course.methods";
export interface SchemaOptionsWithPojoToMixed extends SchemaOptions {
  typePojoToMixed: boolean;
}
const CourseSchema: Schema = new Schema(
  {
    postedByUserId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    reviews: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },
    tags: {
      type: [String],
      required: true,
      default: [],
    },
    category: {
      type: String,
      required: false,
      default: "no_category",
    },
    notes: {
      type: Schema.Types.Mixed,
      required: false,
      default: {},
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

CourseSchema.statics.fetchCoursesByInterest = fetchCoursesByInterest;
export default CourseSchema;
