import { ILearningProvider } from "../../types";

export const CourseraProvider: ILearningProvider = {
  title: (root: any) => {
    const items = root.querySelector("banner-title");
    return items;
  },
  description: (root: any) => "",
  keyPoints: (root: any) => [],
  category: (root: any) => [],
};
