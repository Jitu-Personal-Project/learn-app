import fs from "fs-extra";
import path from "path";
import { glob } from "glob";
import prettier from "prettier";

// Ensures required directories exist
const ensureDirs = (): void => {
  const dirs: string[] = [
    "./../src/pages",
    "./../src/components",
    "./../src/styles",
    "./../src/routes",
  ];
  dirs.forEach((dir) => {
    fs.ensureDirSync(dir);
  });
};

// Format code with prettier
const formatCode = async (code: string): Promise<string> => {
  try {
    return await prettier.format(code, {
      parser: "typescript",
      semi: true,
      singleQuote: true,
      trailingComma: "es5",
      printWidth: 100,
      tabWidth: 2,
    });
  } catch (error: any) {
    console.error("Error formatting code:", error.message);
    return code;
  }
};

// Get all JSON data files
const getDataFiles = async (): Promise<string[]> => {
  try {
    const files: string[] = await glob("./data/*.ts");
    return files;
  } catch (error) {
    console.error("Error finding data files:", error);
    return [];
  }
};

// Import data from a file
const importData = async (filePath: string): Promise<any> => {
  try {
    // Extract the file name without extension for dynamic import
    const fileName: string = path.basename(filePath, ".ts");

    // For Node.js, we need to use require instead of dynamic import
    // This is a workaround as we're in a Node.js environment
    // Clear require cache to ensure we get fresh data
    delete require.cache[require.resolve(path.resolve(filePath))];

    // Require the module
    const dataModule = require(path.resolve(filePath));
    return dataModule.default;
  } catch (error) {
    console.error(`Error importing data from ${filePath}:`, error);
    return null;
  }
};

// Counter for tracking file operations
let fileCounter = 0;

// Write file with proper error handling
const writeFile = async (
  filePath: string,
  content: string
): Promise<boolean> => {
  try {
    // Ensure the directory exists
    await fs.ensureDir(path.dirname(filePath));

    // Format content if it's a JavaScript/TypeScript file
    if (
      filePath.endsWith(".js") ||
      filePath.endsWith(".jsx") ||
      filePath.endsWith(".ts") ||
      filePath.endsWith(".tsx")
    ) {
      content = await formatCode(content);
    }

    // Write the file
    await fs.writeFile(filePath, content);
    console.log(`${++fileCounter}) ✅ Created: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error writing file ${filePath}:`, error);
    return false;
  }
};

export { ensureDirs, formatCode, getDataFiles, importData, writeFile };
