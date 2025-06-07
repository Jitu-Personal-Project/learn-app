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

//------------------------------------------------------

//------------------------------------------------------
export const getPageHighlightAttributes = (
  content: ContentSection,
  idx: number
): string => {
  const contentHighlight = content.type === "highlightContext";
  if (!contentHighlight) return "";
  let attrs = `highlightTitle="${content?.title}" highlightData={${`highlightContentData${idx}`}}`;
  if (content.isReadyToListen) {
    attrs += ` isReadyToListen={${content.isReadyToListen}}`;
  }
  if (
    content.isReadyToListen &&
    content.audioSrc &&
    content.audioSrc.length > 0
  ) {
    attrs += ` audioSrc={${JSON.stringify(content.audioSrc)}}`;
  } else if (content.audioTextContent) {
    attrs += ` audioTextContent={${JSON.stringify(content.audioTextContent)}}`;
  }
  attrs += ` handelListenAudio={handelListenAudio}`;
  return attrs;
};
//------------------------------------------------------
export const generateHighlightContext = (
  content: ContentSection,
  idx: number
): string => {
  return `<HighlightContent ${getPageHighlightAttributes(content, idx)} />`;
};
//------------------------------------------------------
// Generate content rendering
export const generateContentSection = (
  pageContent: ContentSection[]
): string => {
  if (!pageContent || !Array.isArray(pageContent) || pageContent.length === 0) {
    return '<div className="page-content">No content available</div>';
  }

  return `
  <div className="page-content">
  ${pageContent
    .map((content, idx) => {
      if (isHighlightContext(content)) {
        return generateHighlightContext(content, idx);
      }
    })
    .join("")}
    </div>
    `;
};

//------------------------------------------------------
