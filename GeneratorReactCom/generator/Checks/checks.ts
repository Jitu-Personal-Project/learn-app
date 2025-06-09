import { ContentSection, contentType, DataJsonTy } from "../dataType";

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
export const isArticleGlobally = (data: DataJsonTy): boolean => {
  if (data && stringifyAndCompare(data, '"type":"article"')) {
    return true;
  }
  return false;
};

export const isComponentTypeGlobally = (
  data: DataJsonTy,
  componentType: contentType["type"]
): boolean => {
  if (
    data.pageContent &&
    data.pageContent.some((c) => c.type === componentType)
  ) {
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

export const isContextMatch = (
  content: ContentSection,
  match: contentType["type"]
): boolean => {
  if (content && content.type === match) {
    return true;
  }
  return false;
};
