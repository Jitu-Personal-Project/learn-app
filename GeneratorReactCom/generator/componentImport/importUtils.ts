import { ContentSection } from "../dataType";

export const generateIconImports = (pageContent: ContentSection[]): string => {
  const icons = new Set<string>();

  pageContent.forEach((content) => {
    if (content.bulletPoint && Array.isArray(content.bulletPoint)) {
      content.bulletPoint.forEach((bullet) => {
        if (bullet.icon) {
          icons.add(bullet.icon);
        }
      });
    }
    if (content.playIcon && content.playIcon.includes("Icon")) {
      const iconName = content.playIcon.replace(/[</>]/g, "");
      icons.add(iconName);
    }
  });

  if (icons.size === 0) return "";

  return Array.from(icons)
    .map(
      (icon) =>
        `import ${icon} from '@mui/icons-material/${icon.replace("OutlinedIcon", "")}';`
    )
    .join("\n");
};
