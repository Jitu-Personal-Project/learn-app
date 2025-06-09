import { isContextMatch } from "./Checks/checks";
import {
  contentItemProps,
  ContentSection,
  contentType,
  DataJsonTy,
} from "./dataType";

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
  if (content.isReadyToListen) {
    attrs += ` handelListenAudio={handelListenAudio}`;
  }
  return attrs;
};
//------------------------------------------------------
export const getArticleAttributes = (
  content: ContentSection,
  idx: number
): string => {
  if (!content) return "";
  let attrs = "";
  if (content.title) {
    attrs += ` title="${content.title}"`;
  }
  if (content.content) {
    attrs += ` content="${content.content}"`;
  }
  if (content.number) {
    attrs += ` number="${content.number}"`;
  }
  if (content.isReadyToListen) {
    attrs += ` isReadyToListen={${content.isReadyToListen}}`;
  }
  if (
    content.isReadyToListen &&
    content.audioSrc &&
    content.audioSrc.length > 0
  ) {
    attrs += ` audioSrc={${JSON.stringify(content.audioSrc)}}`;
  }
  if (content.isReadyToListen) {
    attrs += ` handelListenAudio={handelListenAudio}`;
  }
  return attrs;
};
//------------------------------------------------------
export const getDynamicImageAttributes = (
  content: contentItemProps,
  idx?: number,
  i?: number
): string => {
  if (!content) return "";
  let attrs = "";
  if (content.url && idx && i !== null) {
    attrs += ` src={dynamicImageData${idx}[${i}].url}`;
  }
  if (content.url && idx == null && i == null) {
    attrs += ` src={'${content.url}'}`;
  }
  if (content.alt && idx && i !== null) {
    attrs += ` alt={dynamicImageData${idx}[${i}].alt}`;
  }
  if (content.alt && idx == null && i == null) {
    attrs += ` alt={'${content.alt}'}`;
  }
  if (content.width) {
    attrs += ` width={'${content.width}'}`;
  }
  if (content.height) {
    attrs += ` height={'${content.height}'}`;
  }
  return attrs;
};
//------------------------------------------------------
export const generateHighlightContext = (
  content: ContentSection,
  idx: number
): string => {
  return `<HighlightContent ${getPageHighlightAttributes(content, idx)} />`;
};
export const generateArticleContext = (
  content: ContentSection,
  idx: number
): string => {
  return `<Article ${getArticleAttributes(content, idx)} />`;
};
//------------------------------------------------------
export const generateImageGalleryContext = (
  content: ContentSection,
  idx: number
): string => {
  // Assume content.content is an array of { id, url }
  return `<ImageGallery images={imageGalleryData${idx}} />`;
};
//------------------------------------------------------
export const generateDynamicImageContext = (
  content: ContentSection,
  idx: number
): string => {
  // Assume content.content is an object or array of { id, url, alt, ... }
  if (Array.isArray(content.content)) {
    return content.content
      .map(
        (img, i) =>
          `<DynamicImage  ${getDynamicImageAttributes(img, idx, i)} />`
      )
      .join("\n");
  } else if (content.content && typeof content.content === "object") {
    return `<DynamicImage ${getDynamicImageAttributes(content.content)} />`;
  }
  return "";
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
      if (isContextMatch(content, "highlightContext")) {
        return generateHighlightContext(content, idx);
      }
      if (isContextMatch(content, "article")) {
        return generateArticleContext(content, idx);
      }
      if (isContextMatch(content, "imageGallery")) {
        return generateImageGalleryContext(content, idx);
      }
      if (isContextMatch(content, "image")) {
        return generateDynamicImageContext(content, idx);
      }
    })
    .join("")}
    </div>
    `;
};

//------------------------------------------------------
