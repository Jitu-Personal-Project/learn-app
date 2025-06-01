import path from "path";
import { writeFile } from "./util";

// Types for route and data file
type RouteInformation = {
  name: string;
  link: string;
  icon?: string;
  exact?: boolean;
  private?: boolean;
};

type FileInformation = {
  file: {
    folderName?: string;
  };
};

type DataFile = {
  routesInformation: RouteInformation;
  fileInformation: FileInformation;
};

type Route = {
  element: string;
  name: string;
  path: string;
  icon?: string;
  exact: boolean;
  private: boolean;
};

// Generate routes array based on the JSON data
export const generateRoutes = async (
  dataFiles: DataFile[]
): Promise<boolean> => {
  if (!dataFiles || !Array.isArray(dataFiles) || dataFiles.length === 0) {
    console.error("No data files provided for routes generation");
    return false;
  }

  const routes: Route[] = [];
  const imports: string[] = [];
  const icons = new Set<string>();

  for (const data of dataFiles) {
    if (!data || !data.routesInformation) continue;

    const { routesInformation, fileInformation } = data;
    const { name, link, icon, exact, private: isPrivate } = routesInformation;

    if (!name || !link) {
      console.warn(
        `Skipping route with missing information: ${name || "Unknown"}`
      );
      continue;
    }

    if (icon) {
      icons.add(icon);
    }

    imports.push(
      `import ${name} from '../pages/${fileInformation.file.folderName ? fileInformation.file.folderName + "/" : ""}${name}';`
    );

    routes.push({
      element: `<${name} />`,
      name,
      path: link,
      icon,
      exact: exact || false,
      private: isPrivate || false,
    });
  }

  const iconImports = Array.from(icons)
    .map((icon) => `import ${icon}Icon from '@mui/icons-material/${icon}';`)
    .join("\n");

  const routesFileContent = `
${imports.join("\n")}
${iconImports}

const routes = [
  ${routes
    .map(
      (route) => `
  {
    path: '${route.path}',
    element: ${route.element},
    name: '${route.name}',
    icon: ${route.icon ? `<${route.icon}Icon />` : "null"},
    exact: ${route.exact},
    private: ${route.private},
  }
`
    )
    .join(",\n")}
];

export default routes;
`;

  const routesFilePath = path.join("./../src", "routes", "routes.tsx");
  const success = await writeFile(routesFilePath, routesFileContent);

  if (success) {
    const indexContent = `
import routes from './routes';
export default routes;
`;

    await writeFile(path.join("./../src", "routes", "index.ts"), indexContent);
  }

  return success;
};
