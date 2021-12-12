import { ILearningProvider } from "../../types";
import { decodeString } from "../../utils";

export const EdxProvider: ILearningProvider = {
  title: (root: any) => {
    const titleData = root.querySelector("h1");
    if (titleData) return decodeString(titleData.innerText);
    return null;
  },
  description: (root: any) => {
    const descriptionData = root.querySelector(".p > p");
    if (descriptionData) {
      return decodeString(descriptionData.innerText);
    }
    return null;
  },
  keyPoints: (root: any) => {
    const keyPointsData = root.querySelectorAll(".preview-expand-component li");
    if (keyPointsData) {
      return keyPointsData.map((data: any) => data.innerText);
    }
    return null;
  },
  category: (root: any) => {
    return [];
  },
};
