import mongoose, { Document, Model } from "mongoose";

export enum CourseCategory {
  Design = "design",
  Engineering = "engineering",
  HumanResources = "human_resources",
  Management = "management",
  Marketing = "marketing",
  Product = "product",
  Sales = "sales",
}
export interface ICourse extends Document {
  category?: CourseCategory | string;
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

export type CourseCreationData = {
  category?: CourseCategory | string;
  postedByUserId: mongoose.Types.ObjectId;
  courseTitle: string;
  courseUrl: string;
  description: string;
  reviews: {
    [keyof: string]: string;
  };
  rating: number;
  tags: Array<string>;
};

export interface ICourseDocument extends ICourse, Document {}
export interface ICourseModel extends Model<ICourseDocument> {
  fillWithDummyData: () => Promise<ICourseDocument[]>;
}
