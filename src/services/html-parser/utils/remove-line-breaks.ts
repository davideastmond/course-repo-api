export function removeLineBreaks(data: string, withString?: string) {
  return data.replace(/(\r\n|\n|\r)/gm, withString || "").trim();
}
