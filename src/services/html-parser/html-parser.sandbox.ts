import { getAutoFillDataFromURL } from "./html-parser";

const sandbox = {
  run: async (url: string) => getAutoFillDataFromURL(url),
  skip: async (url: string) => {},
};

(async () => {
  const value = await sandbox.run(
    "https://www.freecodecamp.org/learn/responsive-web-design/"
  );
  console.log("Value", value);
})();
