import { encodingDictionary } from "../../../definitions";

export const arrangeStrings = (inputArray: string[]): string[] => {
  let currentString = "";
  const returnString: string[] = [];
  let skip = false;
  inputArray.forEach((word) => {
    if (word.trim() !== "") {
      skip = false;
      if (encodingDictionary[word.trim()]) {
        currentString = currentString.concat(
          ` ${encodingDictionary[word.trim()]}`
        );
      } else {
        currentString = currentString.concat(` ${word.trim()}`).trim();
      }
    } else {
      if (!skip) {
        returnString.push(currentString.trim());
        currentString = "";
        skip = true;
      }
    }
  });
  returnString.push(currentString.trim());
  return returnString.filter((str) => str != "");
};
