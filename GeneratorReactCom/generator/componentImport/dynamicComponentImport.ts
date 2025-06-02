import {
  headerComponent,
  textToSpeechComponent,
} from "../ComponentPath/ComponentPath";
import { isHederComponent, isReadyToListenGlobally } from "../componentUtils";
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
  return result;
};
