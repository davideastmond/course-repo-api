import { Schema, SchemaOptions } from "mongoose";
interface SchemaOptionsWithPojoToMixed extends SchemaOptions {
  typePojoToMixed: boolean;
}
const CourseSchema: Schema = new Schema(
  {
    postedByUserId: { type: Schema.Types.ObjectId, required: true },
    courseTitle: { type: String, required: true },
    courseUrl: { type: String, required: true },
    description: { type: String, required: true },
    reviews: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },
    tags: [String],
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

export default CourseSchema;
