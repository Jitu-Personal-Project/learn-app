import { writeFile } from "./util";
import path from "path";

// --- Type Definitions ---

interface BulletPoint {
  id: string | number;
  icon?: string;
  textContent: string;
}

interface PageHeader {
  pageTitle: string;
  description: string;
  keywords: string;
}

interface ContentSection {
  number: string | number;
  type: string;
  title: string;
  content: string;
  bulletPoint?: BulletPoint[];
  isReadyToListen?: boolean;
  playIcon?: string;
}

interface FileInformation {
  file: {
    name: string;
    extension: string;
    folderName?: string;
  };
  cssFile?: {
    name: string;
    extension: string;
    content?: string;
  };
}

interface PageInformation {
  pageName: string;
  pageHeader?: PageHeader;
}

interface ComponentData {
  fileInformation: FileInformation;
  pageInformation: PageInformation;
  pageContent: ContentSection[];
}

// --- Functions ---

// Generate icon imports based on the icons used in the page content
const generateIconImports = (pageContent: ContentSection[]): string => {
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

// Generate bullet points rendering
const generateBulletPoints = (bulletPoints?: BulletPoint[]): string => {
  if (
    !bulletPoints ||
    !Array.isArray(bulletPoints) ||
    bulletPoints.length === 0
  ) {
    return "null";
  }

  return `
      <ul className="bullet-points">
        ${bulletPoints
          .map(
            (bullet) => `
          <li key="${bullet.id}" className="bullet-point">
            {${bullet.icon} && <${bullet.icon} className="bullet-icon" />}
            <span>${bullet.textContent}</span>
          </li>
        `
          )
          .join("")}
      </ul>
    `;
};

// Generate content rendering
const generateContentSection = (pageContent: ContentSection[]): string => {
  if (!pageContent || !Array.isArray(pageContent) || pageContent.length === 0) {
    return '<div className="page-content">No content available</div>';
  }

  return `
      <div className="page-content">
        ${pageContent
          .map(
            (content) => `
          <section key="${content.number}" className="content-section ${content.type}">
            <h2 className="content-title">${content.title}</h2>
            <div className="content-body">${content.content}</div>
            ${generateBulletPoints(content.bulletPoint)}
            ${
              content.isReadyToListen
                ? `
              <button className="listen-button">
                <PlayCircleFilledWhiteOutlinedIcon />
                Listen
              </button>
            `
                : ""
            }
          </section>
        `
          )
          .join("")}
      </div>
    `;
};

// Generate a React component based on the JSON data
const generateComponent = async (data: ComponentData): Promise<boolean> => {
  if (!data) return false;

  const { fileInformation, pageInformation, pageContent } = data;

  if (!fileInformation || !pageInformation) {
    console.error("Invalid data format: missing required fields");
    return false;
  }

  const { file, cssFile } = fileInformation;
  const { pageName, pageHeader } = pageInformation;

  const folderPath = file.folderName
    ? path.join("./../src/pages", file.folderName)
    : "./../src/pages";

  const filePath = path.join(folderPath, `${file.name}${file.extension}`);

  const iconImports = generateIconImports(pageContent);

  const cssImport = cssFile?.name
    ? `import './${cssFile.name}${cssFile.extension}';`
    : "";
  // Handle optional pageHeader
  const headerContent = pageHeader
    ? `
      <header className="page-header">
        <h1>${pageHeader.pageTitle}</h1>
        <meta name="description" content="${pageHeader.description}" />
        <meta name="keywords" content="${pageHeader.keywords}" />
      </header>
    `
    : "";
  const componentContent = `
    import React from 'react';
    ${iconImports}
   
    ${cssImport}
    
    const ${pageName} = () => {
      return (
        <div className="${pageName.toLowerCase()}-container">
           ${headerContent}
          ${generateContentSection(pageContent)}
        </div>
      );
    };
    
    export default ${pageName};
  `;

  const componentCreated = await writeFile(filePath, componentContent);

  if (cssFile?.name) {
    const cssFilePath = path.join(
      folderPath,
      `${cssFile.name}${cssFile.extension}`
    );
    const cssContent = cssFile.content || generateDefaultCss(pageName);
    await writeFile(cssFilePath, cssContent);
  }

  return componentCreated;
};

// Generate default CSS for a component
const generateDefaultCss = (componentName: string): string => {
  return `
    /* Styles for ${componentName} component */
    .${componentName.toLowerCase()}-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .page-header {
      margin-bottom: 2rem;
      border-bottom: 1px solid #eaeaea;
      padding-bottom: 1rem;
    }
    .page-header h1 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 0.5rem;
    }
    .content-section {
      margin-bottom: 2rem;
      padding: 1rem;
  
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;
    }
    .content-section:hover {
      transform: translateY(-5px);
    }
    .content-title {
      font-size: 1.8rem;
      color: #333;
      margin-bottom: 1rem;
    }
    .content-body {
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .bullet-points {
      list-style: none;
      padding-left: 0;
      margin-bottom: 1.5rem;
    }
    .bullet-point {
      display: flex;
      align-items: center;
      margin-bottom: 0.75rem;
      padding: 0.5rem;
      border-radius: 4px;
      transition: background-color 0.2s ease;
    }
    .bullet-point:hover {
      background-color: #f0f0f0;
    }
    .bullet-icon {
      margin-right: 0.75rem;
      color: #4a6cf7;
    }
    .listen-button {
      display: flex;
      align-items: center;
      background-color: #4a6cf7;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s ease;
    }
    .listen-button svg {
      margin-right: 0.5rem;
    }
    .listen-button:hover {
      background-color: #3a5cd8;
    }
    @media (max-width: 768px) {
      .${componentName.toLowerCase()}-container {
        padding: 1rem;
      }
      .page-header h1 {
        font-size: 2rem;
      }
      .content-title {
        font-size: 1.5rem;
      }
    }
  `;
};

export { generateComponent };
