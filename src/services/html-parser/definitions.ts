import { CourseCategory } from "../../models/course/course.types";

// Associate keywords with categories
export const categoryDict: { [key in CourseCategory]: string[] } = {
  design: ["adobe", "photoshop", "in design", "illustrator"],
  engineering: ["development", "software engineering", "system design"],
  human_resources: ["HR", "leadership", "human resources"],
  management: ["leadership", "team-building"],
  marketing: ["marketing", "analytics", "advertising"],
  product: ["product management", "planning"],
  sales: ["sales techniques", "strategies", "selling"],
  software: ["excel", "powerpoint"],
  office_productivity: ["excel", "spreadsheets"],
  photography_video: [],
  health_fitness: ["nutrition", "workouts", "training", "sports", "fitness"],
  personal_development: ["leadership", "learning", "adult learning"],
  finance_accounting: ["budget"],
  teaching_academics: ["pedagogy", "psychology", "adult learning"],
  arts_humanities: [
    "languages",
    "arts",
    "music",
    "film",
    "television",
    "theatre",
    "fine arts",
    "performing arts",
    "literature",
    "criticism",
  ],
  no_category: [],
};

export const encodingDictionary: any = {
  [`&amp;`]: "&",
  [`&#x27;`]: "'",
};

export enum CourseProvider {
  Udemy = "udemy",
  LinkedInLearning = "linkedin",
  FreeCodeCamp = "freecodecamp",
  Coursera = "coursera",
  Edx = "edx",
}
