import { getAutoFillDataFromURL } from "./html-parser";

const sandbox = {
  run: async (url: string) => getAutoFillDataFromURL(url),
  skip: async (url: string) => {},
};

(async () => {
  const value = await sandbox.run(
    "https://www.coursera.org/specializations/aws-python-serverless-development"
  );
  console.log("Value", value);
})();
