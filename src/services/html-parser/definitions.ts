import { CourseCategory } from "../../models/course/course.types";

// Associate keywords with categories
export const categoryDict: { [key in CourseCategory]: string[] } = {
  design: [],
  engineering: ["development", "software engineering", "system design"],
  human_resources: [],
  management: [],
  marketing: [],
  product: [],
  sales: [],
  software: [],
  office_productivity: [],
  photography_video: [],
  health_fitness: [],
  personal_development: [],
  finance_accounting: [],
  teaching_academics: [],
  no_category: [],
};

export const encodingDictionary: any = {
  [`&amp;`]: "&",
  [`&#x27;`]: "'",
};
