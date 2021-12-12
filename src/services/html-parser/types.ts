import { Options } from "node-html-parser";
import { CourseProvider } from "./definitions";

export type HtmlExtractionData = {
  description: string | null;
  title: string | null;
  keyPoints?: any[] | null;
  category?: string[] | null;
  provider: CourseProvider;
};

export type IProviderManifest = {
  [key in CourseProvider]: ILearningProvider;
};

export interface ILearningProvider {
  title: (
    root: Partial<HTMLElement>,
    extraParser?: (data: string, options?: Partial<Options>) => void
  ) => string | null;
  description: (
    root: Partial<HTMLElement>,
    extraParser?: (data: string, options?: Partial<Options>) => void
  ) => string | null;
  keyPoints: (
    root: Partial<HTMLElement>,
    extraParser?: (data: string, options?: Partial<Options>) => void
  ) => string[] | null;
  category: (
    root: Partial<HTMLElement>,
    extraParser?: (data: string, options?: Partial<Options>) => void
  ) => string[] | null;
}

interface IExtraParser {}
