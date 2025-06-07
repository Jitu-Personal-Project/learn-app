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

export interface ContentSection {
  type: "highlightContext" | string;
  title?: string;
  content?: string | { id: string | number; content: string; icon?: string }[];
  number?: string;
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
