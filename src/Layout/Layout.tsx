import React from "react";
import HomeLayout from "./HomeLayout/HomeLayout";
import LayoutWrp from "./Components/LayoutWrp/LayoutWrp";
import { APP_BUILD_HASH, APP_ENV, APP_NAME, APP_VERSION } from "../appConst";
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
  return (
    <LayoutWrp className={classes}>
      <HomeLayout />
    </LayoutWrp>
  );
}
