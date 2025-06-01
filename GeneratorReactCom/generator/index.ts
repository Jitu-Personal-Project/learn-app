import { ensureDirs, getDataFiles, importData } from "./util";
import { generateComponent } from "./componentGenerator";
import { generateRoutes } from "./routesGenerator";
// import { generateRoutes } from "./routesGenerator";

// Main generator function
const generate = async (): Promise<void> => {
  console.log("------------------------------------------------------");
  console.log("|  🚀 Starting component and routes generation...");
  console.log("------------------------------------------------------");

  // Ensure all necessary directories exist
  ensureDirs();

  // Get all data files
  const dataFilePaths: string[] = await getDataFiles();

  if (!dataFilePaths || dataFilePaths.length === 0) {
    console.error(
      "❌ No data files found. Please add data files in the src/data directory."
    );
    return;
  }

  console.log(`📁 Found ${dataFilePaths.length} data files`);

  // Import data from all files
  const dataFiles: any[] = [];
  let count1 = 0;
  for (const filePath of dataFilePaths) {
    count1++;
    console.log(`${count1}) 📄 Processing: ${filePath}`);
    const data = await importData(filePath);
    if (data) {
      dataFiles.push(data);
    }
  }
  console.log("------------------------------------------------------");

  // Generate components for each data file
  let componentsGenerated = 0;
  for (const data of dataFiles) {
    const success: boolean = await generateComponent(data);
    if (success) {
      componentsGenerated++;
    }
  }

  console.log("------------------------------------------------------");
  console.log(`|  ✅ Generated ${componentsGenerated} components`);
  console.log("------------------------------------------------------");

  // Generate routes file
  const routesGenerated: boolean = await generateRoutes(dataFiles);
  if (routesGenerated) {
    console.log("------------------------------------------------------");
    console.log("|  ✅ Generated routes configuration");
    console.log("------------------------------------------------------");
  } else {
    console.error("❌ Failed to generate routes configuration");
  }

  console.log("🎉 🎉 🎉 🎉 🎉 🎉 🎉 Generation completed! 🎉 🎉 🎉 🎉|");
  console.log("------------------------------------------------------");
};

// Run the generator
generate().catch((error: unknown) => {
  console.error("❌ An error occurred during generation:", error);
});
