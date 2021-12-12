import mongoose, { Document, Model } from "mongoose";

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
  ArtsHumanities = "arts_humanities",
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

export type TakeAwayStripDataCollection = {
  [key in number]: string;
};

export type CourseRecommendationTakeAwayPackage = {
  [key in number]: {
    learningBlurb: string;
    takeAways: TakeAwayStripDataCollection;
  };
};

export interface ICourseRecommendationSubmission {
  rating: number;
  title: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  notes: CourseRecommendationTakeAwayPackage;
}

export enum CourseQueryType {
  All = "all",
  ByTags = "by_tags",
}

export interface ICourseDocument extends ICourse, Document {}
export interface ICourseModel extends Model<ICourseDocument> {
  createCourse: (
    submission: ICourseRecommendationSubmission,
    postedByUserId: string
  ) => Promise<ICourseDocument>;
  fetchCoursesByInterest: (data: {
    limit: number;
    skip: number;
    userId: mongoose.Types.ObjectId;
  }) => Promise<ICourseDocument[]>;
  fetchCoursesByCategory: (data: {
    category: CourseCategory | string;
    limit: number;
    skip: number;
  }) => Promise<ICourseDocument[]>;
}
