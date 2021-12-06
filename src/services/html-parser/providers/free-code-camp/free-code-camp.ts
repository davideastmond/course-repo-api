import { ILearningProvider } from "../../types";
import { decodeString } from "../../utils";

export const FreeCodeCampProvider: ILearningProvider = {
  title: (root: any) =>
    (root.querySelector("h1.big-heading") &&
      root.querySelector("h1.big-heading").innerText) ||
    null,
  description: (root: any) => {
    const elements = root.querySelectorAll("div > p") as any[];
    if (elements && elements.length && elements.length > 0) {
      const descriptionString = [];
      for (
        let htmlElementIndex = 0;
        htmlElementIndex < elements.length;
        htmlElementIndex++
      ) {
        descriptionString.push(elements[htmlElementIndex].innerText);
        if (htmlElementIndex >= 2) break;
      }
      return decodeString(descriptionString.join(""));
    }
    return null;
  },
  keyPoints: (root: any) => {
    const elements = root.querySelectorAll("h3.big-block-title");
    if (elements && elements.length && elements.length > 0) {
      const bulletPoints = [];
      for (
        let htmlElementIndex = 0;
        htmlElementIndex < elements.length;
        htmlElementIndex++
      ) {
        bulletPoints.push(elements[htmlElementIndex].innerText.slice(0, -1));
        if (htmlElementIndex >= 2) break;
      }
      return bulletPoints;
    }
    return null;
  },
  category: (root: any): any => null,
};
