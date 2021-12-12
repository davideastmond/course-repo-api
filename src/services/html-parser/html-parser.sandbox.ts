import { CourseCategory } from "../../models/course/course.types";
import { categoryDict } from "./definitions";
import { getAutoFillDataFromURL } from "./html-parser";

const sandbox = {
  run: async (url: string) => getAutoFillDataFromURL(url),
  skip: async (url: string) => {},
};

(async () => {
  const value = await sandbox.run(
    "https://www.edx.org/course/religion-conflict-and-peace"
  );
  console.log("Value", value);
})();
