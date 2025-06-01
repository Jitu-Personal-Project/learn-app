import React, { useState } from "react";
import HomeLayout from "./HomeLayout/HomeLayout";
import LayoutWrp from "./Components/LayoutWrp/LayoutWrp";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { APP_BUILD_HASH, APP_ENV, APP_NAME, APP_VERSION } from "../appConst";
import NoteSideWidget from "../UI/widgets/noteWidget/noteSideWidget";
import SideKickBar, {
  type MenuListItemProps,
} from "../UI/widgets/SideKickBar/SideKickBar";
import { CodeIcon } from "lucide-react";
import CreateIcon from "@mui/icons-material/Create";
import DrawerCodeEditor from "../UI/widgets/DrawerCodeEditor/DrawerCodeEditor";
export interface widgetsStatusProps {
  noteBook: "open" | "close";
  codeEditor: "open" | "close";
}

interface LayoutProps {
  className?: string;
  style?: React.CSSProperties;
  appName?: string; // Optional prop
  appVersion?: string; // Optional prop
  appDescription?: string; // Optional prop
  appAuthor?: string; // Optional prop
  appLicense?: string; // Optional prop
  appCopyright?: string; // Optional prop
  appRepository?: string; // Optional prop
  appHomepage?: string; // Optional prop
  appKeywords?: string[]; // Optional prop
  appEnv?: string; // Optional prop
  appBuildDate?: string; // Optional prop
  appBuildTime?: string; // Optional prop
  appBuildHash?: string; // Optional prop
}
// Define the Layout component
// This component serves as a wrapper for the entire application layout

export default function Layout({
  className,
  style,
  appName = APP_NAME.toLowerCase(),
  appVersion = APP_VERSION,
  appDescription,
  appAuthor,
  appLicense,
  appCopyright,
  appRepository,
  appHomepage,
  appKeywords,
  appEnv = APP_ENV,
  appBuildDate,
  appBuildTime,
  appBuildHash = APP_BUILD_HASH,
}: LayoutProps) {
  const [darkMode, setDarkMode] = React.useState(false);
  const [widgetsStatus, setWidgetsStatus] = useState<widgetsStatusProps>({
    noteBook: "close",
    codeEditor: "close",
  });

  const handelWidgetsStatus = (newStatus: widgetsStatusProps) => {
    setWidgetsStatus(newStatus);
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );
  const classes = [
    "layout-wrp full-screen overflow-hidden",
    className,
    appName,
    appEnv,
    appBuildHash,
    appVersion,
  ]
    .filter(Boolean)
    .join(" ");

  const sideKickBarMenuList: MenuListItemProps[] = [
    {
      id: 1,
      name: "Code Editor",
      icons: (
        <span style={{ display: "inline-block", transform: "scale(0.7)" }}>
          <CodeIcon />
        </span>
      ),
      bgColor: "#aa35af",
      handleClick: () => {
        if (widgetsStatus.codeEditor === "open") {
          let localWidgetsStatus = {
            ...widgetsStatus,
          };
          localWidgetsStatus.codeEditor = "close";
          handelWidgetsStatus(localWidgetsStatus);
        }

        if (widgetsStatus.codeEditor === "close") {
          const audio = new Audio("/keyboard-type.mp3");
          audio.play();
          let localWidgetsStatus = {
            ...widgetsStatus,
          };
          localWidgetsStatus.codeEditor = "open";
          handelWidgetsStatus(localWidgetsStatus);
        }
      },
    },
    {
      id: 2,
      name: "NoteBook",
      icons: <CreateIcon fontSize="small" />,
      bgColor: "#7d4db7",
      handleClick: () => {
        if (widgetsStatus.noteBook === "open") {
          let localWidgetsStatus = {
            ...widgetsStatus,
          };
          localWidgetsStatus.noteBook = "close";
          handelWidgetsStatus(localWidgetsStatus);
        }

        if (widgetsStatus.noteBook === "close") {
          const audio = new Audio("/bookOpen.mp3");
          audio.play();
          let localWidgetsStatus = {
            ...widgetsStatus,
          };
          localWidgetsStatus.noteBook = "open";
          handelWidgetsStatus(localWidgetsStatus);
        }
      },
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <LayoutWrp className={classes}>
        <NoteSideWidget
          widgetsStatus={widgetsStatus}
          handelWidgetsStatus={handelWidgetsStatus}
        />
        <SideKickBar
          menuList={sideKickBarMenuList}
          className="custom-sidekick-bar"
          alignment="left-center"
        />
        <DrawerCodeEditor
          widgetsStatus={widgetsStatus}
          handelWidgetsStatus={handelWidgetsStatus}
        />
        <HomeLayout />
      </LayoutWrp>
    </ThemeProvider>
  );
}
