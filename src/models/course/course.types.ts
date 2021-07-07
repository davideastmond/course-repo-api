import mongoose, { Document, Model } from "mongoose";
export interface ICourse extends Document {
  postedByUserId: mongoose.Types.ObjectId;
  courseTitle: string;
  courseUrl: string;
  description: string;
  reviews: {
    [keyof: string]: string;
  };
  rating: number;
  tags: Array<string>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICourseDocument extends ICourse, Document {}
export interface ICourseModel extends Model<ICourseDocument> {}
