import axios from "axios";
import { parse } from "node-html-parser";

type HtmlExtractionData = {
  description: string | null;
  title: string | null;
  keyPoints?: any[] | null;
};

enum CourseProvider {
  Udemy = "udemy",
  LinkedInLearning = "linkedin",
  FreeCodeCamp = "freecodecamp",
}

const providerDict: {
  [key in CourseProvider]: {
    title: (root: any) => string | null;
    description: (root: any) => string | null;
    keyPoints: (root: any) => string[] | null;
  };
} = {
  [CourseProvider.Udemy]: {
    title: (root) =>
      (root.querySelector(".clp-lead__title") &&
        root.querySelector(".clp-lead__title").innerHTML) ||
      null,
    description: (root) =>
      (root.querySelector(".clp-lead__headline") &&
        root.querySelector(".clp-lead__headline").innerHTML) ||
      null,
    keyPoints: (root) => {
      const elements = root.querySelectorAll("li") as any[];
      if (elements && elements.length && elements.length > 0) {
        return elements
          .map((element) => {
            return element.innerText;
          })
          .filter((e) => {
            return e.trim() !== "";
          });
      }
      return null;
    },
  },
  [CourseProvider.LinkedInLearning]: {
    title: (root) =>
      (root.querySelector(".top-card-layout__title") &&
        root.querySelector(".top-card-layout__title").innerHTML) ||
      null,
    description: (root) =>
      (root.querySelector(".course-details__description") &&
        root.querySelector(".course-details__description").innerText) ||
      null,
    keyPoints: (root) => {
      const elements = root.querySelectorAll(
        ".course-skills__skill-list-item"
      ) as any[];
      if (elements && elements.length && elements.length > 0) {
        return elements
          .map((element) => {
            return element.innerText.replace(/(\r\n|\n|\r)/gm, "").trim();
          })
          .filter((e) => {
            return e.trim() !== "";
          });
      }
      return null;
    },
  },
  [CourseProvider.FreeCodeCamp]: {
    title: (root) =>
      (root.querySelector("h1.big-heading") &&
        root.querySelector("h1.big-heading").innerText) ||
      null,
    description: (root) => {
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
        return descriptionString.join("");
      }
      return null;
    },
    keyPoints: (root) => {
      const elements = root.querySelectorAll("h3.big-block-title");
      if (elements && elements.length && elements.length > 0) {
        const bulletPoints = [];
        for (
          let htmlElementIndex = 0;
          htmlElementIndex < elements.length;
          htmlElementIndex++
        ) {
          bulletPoints.push(elements[htmlElementIndex].innerText);
          if (htmlElementIndex >= 2) break;
        }
        return bulletPoints;
      }
      return null;
    },
  },
};

function getProviderSelectors({
  provider,
  root,
}: {
  provider: CourseProvider;
  root: any;
}): HtmlExtractionData {
  return {
    title: providerDict[provider].title(root),
    description: providerDict[provider].description(root),
    keyPoints: providerDict[provider].keyPoints(root),
  };
}

const getHtml = async ({ url }: { url: string }): Promise<string | null> => {
  try {
    const request = await axios({
      url: url,
      method: "GET",
    });
    if (request.status === 200) {
      return request.data;
    }
  } catch (exception) {
    throw new Error(`getHTML: unable to GET data from URL: ${url}`);
  }
};

const extractHTMLData = ({
  htmlData,
  provider,
}: {
  htmlData: string;
  provider: CourseProvider;
}) => {
  const root = parse(htmlData);
  const { title, description, keyPoints } = getProviderSelectors({
    provider,
    root,
  });
  return { description, title, keyPoints };
};

const getProvider = ({ url }: { url: string }): CourseProvider | null => {
  const domain = new URL(url.toLowerCase());
  for (const values of Object.values(CourseProvider)) {
    if (domain.toString().includes(values)) return values as CourseProvider;
  }
  return null;
};

export async function getAutoFillDataFromURL(url: string) {
  const provider = getProvider({ url });
  if (provider) {
    const htmlData = await getHtml({ url });
    return extractHTMLData({ htmlData, provider });
  }
  throw new Error(
    `Unable to auto-complete: provider likely not supported for URL ${url}`
  );
}
