import { Schema, SchemaOptions } from "mongoose";
export interface SchemaOptionsWithPojoToMixed extends SchemaOptions {
  typePojoToMixed: boolean;
}
const CourseSchema: Schema = new Schema(
  {
    postedByUserId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true, index: true },
    url: { type: String, required: true },
    description: { type: String, required: true, index: true },
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
      //index: true,
    },
    category: {
      type: String,
      required: true,
      default: "no_category",
    },
    notes: {
      type: Schema.Types.Mixed,
      required: false,
      default: {},
    },
    likes: {
      type: Schema.Types.Mixed,
      required: true,
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
  "title": "text",
  "description": "text",
  "category": "text",
  "notes": "text",
  "url": "text",
});

export default CourseSchema;
