import React from "react";
interface LayoutWrpProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  appName?: string;
  appVersion?: string;
  appDescription?: string;
  appAuthor?: string;
  appLicense?: string;
  appCopyright?: string;
  appRepository?: string;
  appHomepage?: string;
  appKeywords?: string[];
  env?: string;
  appBuildDate?: string;
  appBuildTime?: string;
  appBuildHash?: string;
}

export default function LayoutWrp({
  children,
  className,
  appName,
  appVersion,
}: LayoutWrpProps) {
  return <div className={className ? className : ""}>{children}</div>;
}
