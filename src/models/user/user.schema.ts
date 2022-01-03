import { Schema, SchemaOptions } from "mongoose";
import {
  deleteInterestTags,
  createCourseRecommendation,
  deleteCourseRecommendations,
  reconcileWithCourses,
} from "../../controllers/user/user.methods";
import { findOneByGoogleIdOrCreate } from "../../controllers/user/user.statics";

interface SchemaOptionsWithPojoToMixed extends SchemaOptions {
  typePojoToMixed: boolean;
}

const UserSchema: Schema = new Schema(
  {
    firstName: String,
    lastName: String,
    jobTitle: {
      type: String,
      default: "",
      required: false,
    },
    auth: {
      googleId: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: true,
      },
      accessToken: {
        type: String,
        required: false,
      },
    },
    avatar: {
      type: [{ url: String }],
    },
    courses: { type: [String], required: true, default: [] },
    interestTags: { type: [String], required: true, default: [], index: true },
    likedCourses: { type: Schema.Types.Mixed, required: true, default: {} },
    department: {
      type: String,
      required: false,
      default: "",
    },
    following: { type: Schema.Types.Mixed, required: true, default: {} },
    followedBy: { type: Schema.Types.Mixed, required: true, default: {} },
  },
  {
    timestamps: true,
    strict: false,
    typePojoToMixed: false,
  } as SchemaOptionsWithPojoToMixed
);
UserSchema.index({
  "firstName": "text",
  "lastName": "text",
  "jobTitle": "text",
  "department": "text",
});

UserSchema.statics.findOneByGoogleIdOrCreate = findOneByGoogleIdOrCreate;
UserSchema.methods.deleteInterestTags = deleteInterestTags;
UserSchema.methods.createCourseRecommendation = createCourseRecommendation;
UserSchema.methods.deleteCourseRecommendations = deleteCourseRecommendations;
UserSchema.methods.reconcileWithCourses = reconcileWithCourses;
export default UserSchema;
