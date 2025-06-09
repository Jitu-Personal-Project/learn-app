import React from "react";

interface DynamicImageProps {
  src: string;
  alt: string;
  title?: string;
  width?: string;
  height?: string;
}

const DynamicImage: React.FC<DynamicImageProps> = ({
  src,
  alt,
  title,
  width,
  height,
}) => {
  const getAttributes = (
    src?: string,
    alt?: string,
    title?: string,
    width?: string,
    height?: string
  ) => {
    const attrs: { [key: string]: string } = {};
    if (src && src.length > 0) {
      attrs.src = src;
    }
    if (alt && alt.length > 0) {
      attrs.alt = alt;
    }
    if (title && title.length > 0) {
      attrs.title = title;
    }
    if (width && width.length > 0) {
      attrs.width = width;
    }
    if (height && height.length > 0) {
      attrs.height = height;
    }
    return attrs;
  };
  return (
    <>
      <img {...getAttributes(src, alt, title, width, height)} />
    </>
  );
};

export default DynamicImage;
