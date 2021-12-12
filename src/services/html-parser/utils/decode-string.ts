import { encodingDictionary } from "../definitions";
/**
 *
 * @param data input string
 */
export function decodeString(data: string) {
  let returnString = data;
  for (let [key, value] of Object.entries(encodingDictionary)) {
    const pattern = new RegExp(key, "g");
    returnString = returnString.replace(pattern, value as string);
  }
  return returnString;
}
