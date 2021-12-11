import axios from "axios";
import { parse } from "node-html-parser";
import {
  FreeCodeCampProvider,
  LinkedInLearningProvider,
  UdemyProvider,
  CourseraProvider,
} from "./providers";

import { CourseProvider, HtmlExtractionData, IProviderManifest } from "./types";

const providerManifest: IProviderManifest = {
  [CourseProvider.Udemy]: UdemyProvider,
  [CourseProvider.LinkedInLearning]: LinkedInLearningProvider,
  [CourseProvider.FreeCodeCamp]: FreeCodeCampProvider,
  [CourseProvider.Coursera]: CourseraProvider,
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
    provider,
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
  courseProvider,
}: {
  htmlData: string;
  courseProvider: CourseProvider;
}) => {
  const root = parse(htmlData);
  const { title, description, keyPoints, category, provider } =
    getProviderSelectors({
      provider: courseProvider,
      root,
    });
  return { description, title, keyPoints, category, provider };
};

const getProvider = ({ url }: { url: string }): CourseProvider | null => {
  const domain = new URL(url.toLowerCase());
  for (const values of Object.values(CourseProvider)) {
    if (domain.toString().includes(values)) return values as CourseProvider;
  }
  return null;
};

export async function getAutoFillDataFromURL(url: string) {
  const courseProvider = getProvider({ url });
  if (courseProvider) {
    const htmlData = await getHtml({ url });
    return extractHTMLData({ htmlData, courseProvider });
  }
  throw new Error(
    `Unable to auto-complete: provider likely not supported for URL ${url}`
  );
}
