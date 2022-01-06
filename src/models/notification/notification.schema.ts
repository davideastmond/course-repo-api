import { Schema, SchemaOptions } from "mongoose";
export interface SchemaOptionsWithPojoToMixed extends SchemaOptions {
  typePojoToMixed: boolean;
}

const NotificationSchema: Schema = new Schema(
  {
    sourceId: { type: Schema.Types.ObjectId, required: true },
    targetId: { type: Schema.Types.ObjectId, required: true },
    url: { type: String, required: false },
    message: { type: String, required: true },
    read: { type: Boolean, required: true, default: false },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
    strict: false,
    typePojoToMixed: false,
  } as SchemaOptionsWithPojoToMixed
);

export default NotificationSchema;
