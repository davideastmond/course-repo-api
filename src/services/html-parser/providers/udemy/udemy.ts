import { decodeString, removeLineBreaks } from "../../utils";
import { arrangeStrings } from "./utils";

export const UdemyProvider = {
  title: (root: any) => {
    if (
      root.querySelector(".clp-lead__title") &&
      root.querySelector(".clp-lead__title").innerHTML
    ) {
      return decodeString(
        removeLineBreaks(root.querySelector(".clp-lead__title").innerHTML)
      );
    }
    return null;
  },
  description: (root: any) => {
    if (
      root.querySelector(".clp-lead__headline") &&
      root.querySelector(".clp-lead__headline").innerHTML
    ) {
      return decodeString(
        removeLineBreaks(root.querySelector(".clp-lead__headline").innerHTML)
      );
    }
    return null;
  },
  keyPoints: (root: any) => {
    const elements = root.querySelectorAll("li") as any[];
    if (elements && elements.length && elements.length > 0) {
      return elements
        .map((element) => {
          return removeLineBreaks(element.innerText);
        })
        .filter((e) => {
          return e.trim() !== "";
        })
        .slice(0, 3);
    }
    return null;
  },
  category: (root: any) => {
    const values = root.querySelectorAll(
      ".course-landing-page__topic-menu"
    ) as any[];
    const parsedValues = removeLineBreaks(values[0].innerText, " ").split(" ");
    return arrangeStrings(parsedValues);
  },
};
