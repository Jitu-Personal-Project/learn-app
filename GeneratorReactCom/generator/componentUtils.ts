import { ContentSection, DataJsonTy } from "./dataType";

export const isHederComponent = (data: DataJsonTy): boolean => {
  if (
    data.pageInformation &&
    data.pageInformation.pageHeader &&
    data.pageInformation.pageHeader.pageTitle
  ) {
    return true;
  }
  return false;
};
export const stringifyAndCompare = (data: any, match: string): boolean => {
  const jsonString = JSON.stringify(data);
  return jsonString.includes(match);
};
export const isReadyToListenGlobally = (data: DataJsonTy): boolean => {
  if (data && stringifyAndCompare(data, '"isReadyToListen":true')) {
    return true;
  }
  return false;
};
export const isHighlightContextGlobally = (data: DataJsonTy): boolean => {
  if (data && stringifyAndCompare(data, '"type":"highlightContext"')) {
    return true;
  }
  return false;
};

export const isHighlightContext = (data: ContentSection): boolean => {
  if (data && data.type === "highlightContext") {
    return true;
  }
  return false;
};
