import { imageGalleryComponent } from "./ComponentPath/ComponentPath";

export interface FileInfo {
  folderName?: string;
  name: string;
  extension?: string;
  componentType?: string;
  content?: string;
  methods?: any[];
}

export interface PageHeader {
  pageTitle: string;
  description?: string;
  keywords?: string;
  isReadyToListen?: boolean;
  audioSrc?: string;
  audioTextContent?: string;
}

export interface BulletPoint {
  id: string;
  textContent: string;
  icon: string;
}
export interface contentType {
  type:
    | "highlightContext"
    | "article"
    | "code"
    | "quiz"
    | "image"
    | "imageGallery"
    | "video"
    | "audio";
}
export interface contentItemProps {
  id?: string | number;
  content?: string;
  icon?: string;
  url?: string;
  alt?: string;
  width?: string;
  height?: string;
}
export interface ContentSection {
  type: contentType["type"];
  title?: string;
  content?: string | contentItemProps[] | contentItemProps;
  number?: number | string;
  isReadyToListen?: boolean;
  audioSrc?: string;
  audioTextContent?: string;
  playIcon?: string;
  bulletPoint?: BulletPoint[];
}

export interface RoutesInfo {
  element: string;
  name: string;
  link: string;
  icon: string;
  exact: boolean;
  private: boolean;
}

export interface DataJsonTy {
  fileInformation: {
    file: FileInfo;
    cssFile: FileInfo;
    apiFile: FileInfo;
    dataFile: FileInfo;
  };
  pageInformation: {
    pageName: string;
    pageNumber: string;
    pageType: string;
    pageHeader?: PageHeader;
  };
  pageContent: ContentSection[];
  routesInformation: RoutesInfo;
}
