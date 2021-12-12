import { ILearningProvider } from "../../types";
import { decodeString } from "../../utils";

export const CourseraProvider: ILearningProvider = {
  title: (root: any) => {
    const items = root.querySelector(".banner-title");
    if (items) {
      return items.innerText;
    }
    return null;
  },
  description: (root: any) => {
    const items = root.querySelector(".BannerTitle > p");
    if (items) {
      return items.innerText.trim();
    }
    return null;
  },
  keyPoints: (root: any) => {
    const items = root.querySelectorAll("ul > div");

    if (items) {
      const returnArray: string[] = [];
      items.forEach((item: any) => {
        returnArray.push(decodeString(item.innerText));
      });
      return returnArray;
    }
    return null;
  },
  category: (root: any) => {
    const items = root.querySelectorAll(".content-inner li");
    if (items) {
      const returnArray: string[] = [];
      items.forEach((item: any) => {
        returnArray.push(decodeString(item.innerText));
      });
      return returnArray;
    }
    return null;
  },
};
