import { DataJsonTy } from "./dataType";

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
  console.log(
    "isReadyToListenGlobally",
    JSON.stringify(data).includes('"isReadyToListen":true')
  );
  if (data && stringifyAndCompare(data, '"isReadyToListen":true')) {
    return true;
  }
  return false;
};
