import axios from "axios";
import { parse } from "node-html-parser";
import {
  FreeCodeCampProvider,
  LinkedInLearningProvider,
  UdemyProvider,
} from "./providers";

import { CourseProvider, HtmlExtractionData, IProviderManifest } from "./types";

const providerManifest: IProviderManifest = {
  [CourseProvider.Udemy]: UdemyProvider,
  [CourseProvider.LinkedInLearning]: LinkedInLearningProvider,
  [CourseProvider.FreeCodeCamp]: FreeCodeCampProvider,
};

function getProviderSelectors({
  provider,
  root,
}: {
  provider: CourseProvider;
  root: any;
}): HtmlExtractionData {
  return {
    title: providerManifest[provider].title(root),
    description: providerManifest[provider].description(root),
    keyPoints: providerManifest[provider].keyPoints(root),
    category: providerManifest[provider].category(root),
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
    throw new Error(
      `getHTML: unable to GET data from URL: ${url}, response is ${exception}`
    );
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
  const { title, description, keyPoints, category } = getProviderSelectors({
    provider,
    root,
  });
  return { description, title, keyPoints, category };
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

const sandbox = {
  run: async (url: string) => getAutoFillDataFromURL(url),
};

(async () => {
  const value = await sandbox.run(
    "https://www.freecodecamp.org/learn/responsive-web-design/"
  );
  console.log("Value", value);
})();
