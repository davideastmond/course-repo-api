import { Schema, SchemaOptions } from "mongoose";
import { findOneByGoogleIdOrCreate } from "./user.statics";
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
    courses: { type: [Schema.Types.ObjectId], required: true, default: [] },
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
});

UserSchema.statics.findOneByGoogleIdOrCreate = findOneByGoogleIdOrCreate;
export default UserSchema;
