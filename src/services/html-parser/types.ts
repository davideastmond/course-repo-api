export type HtmlExtractionData = {
  description: string | null;
  title: string | null;
  keyPoints?: any[] | null;
  category?: string[] | null;
  provider: CourseProvider;
};

export enum CourseProvider {
  Udemy = "udemy",
  LinkedInLearning = "linkedin",
  FreeCodeCamp = "freecodecamp",
}

export type IProviderManifest = {
  [key in CourseProvider]: ILearningProvider;
};

export interface ILearningProvider {
  title: (root: Partial<HTMLElement>) => string | null;
  description: (root: Partial<HTMLElement>) => string | null;
  keyPoints: (root: Partial<HTMLElement>) => string[] | null;
  category: (root: Partial<HTMLElement>) => string[] | null;
}
