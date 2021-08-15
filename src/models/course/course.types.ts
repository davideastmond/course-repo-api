import mongoose, { Document, Model } from "mongoose";
import { ICourseNote } from "./course-notes.types";

export enum CourseCategory {
  Design = "design",
  Engineering = "engineering",
  HumanResources = "human_resources",
  Management = "management",
  Marketing = "marketing",
  Product = "product",
  Sales = "sales",
  SoftwareIT = "software",
  OfficeProductivity = "office_productivity",
  PhotographyVideo = "photography_video",
  HealthFitness = "health_fitness",
  PersonalDevelopment = "personal_development",
  FinanceAccounting = "finance_accounting",
  TeachingAcademics = "teaching_academics",
  NoCategory = "no_category",
}
export interface ICourse {
  category?: CourseCategory | string;
  postedByUserId: mongoose.Types.ObjectId;
  title: string;
  url: string;
  description: string;
  reviews: {
    [keyof: string]: string;
  };
  rating: number;
  tags: Array<string>;
  notes: { [keyof: string]: { [key in number]: string } };
  createdAt: Date;
  updatedAt: Date;
}

export type CourseCreationData = {
  category?: CourseCategory | string;
  postedByUserId: mongoose.Types.ObjectId;
  title: string;
  url: string;
  description: string;
  reviews: {
    [keyof: string]: string;
  };
  rating: number;
  tags: Array<string>;
};

export type ITakeAwayStripDataCollection = {
  [key in number]: string;
};

export type ICourseRecommendationTakeAwayPackage = {
  [key in number]: {
    learningBlurb: string;
    takeAways: ITakeAwayStripDataCollection;
  };
};

export interface ICourseRecommendationSubmission {
  rating: number;
  title: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  notes: ICourseRecommendationTakeAwayPackage;
}

export interface ICourseDocument extends ICourse, Document {}
export interface ICourseModel extends Model<ICourseDocument> {
  createCourse: (
    submission: ICourseRecommendationSubmission,
    postedByUserId: string
  ) => Promise<ICourseDocument>;
}
