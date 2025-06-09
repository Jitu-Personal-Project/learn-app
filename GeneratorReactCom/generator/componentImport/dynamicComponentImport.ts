import {
  isArticleGlobally,
  isComponentTypeGlobally,
  isHederComponent,
  isHighlightContextGlobally,
  isReadyToListenGlobally,
} from "../Checks/checks";
import {
  articleComponent,
  headerComponent,
  highlightContentComponent,
  textToSpeechComponent,
  imageGalleryComponent,
  dynamicImageComponent,
} from "../ComponentPath/ComponentPath";

import { DataJsonTy } from "../dataType";

export const dynamicComponentImport = (data: DataJsonTy) => {
  if (!data || Object.keys(data).length === 0) {
    return "no data";
  }
  if (typeof data !== "object") {
    return "Invalid data format";
  }
  let result = "";
  isHederComponent(data) && (result += headerComponent);
  isReadyToListenGlobally(data) && (result += textToSpeechComponent);
  isComponentTypeGlobally(data, "highlightContext") &&
    (result += highlightContentComponent);
  isComponentTypeGlobally(data, "article") && (result += articleComponent);
  isComponentTypeGlobally(data, "imageGallery") &&
    (result += imageGalleryComponent);
  isComponentTypeGlobally(data, "image") && (result += dynamicImageComponent);
  return result;
};
