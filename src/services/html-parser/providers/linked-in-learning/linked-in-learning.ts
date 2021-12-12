import { ILearningProvider } from "../../types";
import { decodeString, removeLineBreaks } from "../../utils";

const getLinkedInKeyPoints = (root: any) => {
  const elements = root.querySelectorAll(
    ".course-skills__skill-list-item"
  ) as any[];
  if (elements && elements.length && elements.length > 0) {
    return elements
      .map((element) => {
        return removeLineBreaks(element.innerText);
      })
      .filter((e) => {
        return e.trim() !== "";
      });
  }
  return null;
};

export const LinkedInLearningProvider: ILearningProvider = {
  title: (root) =>
    (root.querySelector(".top-card-layout__title") &&
      root.querySelector(".top-card-layout__title").innerHTML &&
      root.querySelector(".top-card-layout__title").innerHTML.trim()) ||
    null,
  description: (root) => {
    const extractedData =
      root.querySelector(".course-details__description") &&
      (root.querySelector(".course-details__description") as HTMLElement)
        .innerText &&
      (
        root.querySelector(".course-details__description") as HTMLElement
      ).innerText.trim();
    return extractedData ? decodeString(extractedData) : null;
  },
  keyPoints: (root) => getLinkedInKeyPoints(root),
  category: (root) => getLinkedInKeyPoints(root),
};
