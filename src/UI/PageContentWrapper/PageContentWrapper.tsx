import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import clsx from "clsx"; // Install with `npm install clsx` if not already installed
import styles from "./PageContentWrapper.module.css"; // Assuming CSS Modules are used

export interface PageContentWrapperProps {
  children?: React.ReactNode;
  className?: string;
}

export default function PageContentWrapper({
  className = "",
  children,
}: PageContentWrapperProps) {
  const theme = useTheme();

  return (
    <Box
      className={clsx(
        styles.pageContentWrapper,
        styles.pageContentWrapper,
        theme.palette.mode,
        className
      )}
    >
      {children ?? (
        <div className={styles.pageContentPlaceholder}>
          No content available
        </div>
      )}
    </Box>
  );
}
