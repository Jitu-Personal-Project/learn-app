import React from "react";
import TopicTitle from "../TopicTitle/TopicTitle";
import { Box, Breadcrumbs, Link, Typography, useTheme } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow"; // Import the play icon
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import "./PageHeader.css";

export interface BreadcrumbItem {
  label: string;
  link: string;
}

export interface PageHeaderProps {
  pageTitle?: string;
  description?: string;
  keywords?: string;
  isReadyToListen?: boolean;
  breadcrumb?: BreadcrumbItem[];
  audioSrc?: string; // Optional audio source URL
  audioTextContent?: string;
  handelListenAudio?: (text?: string, audioPath?: string) => void;
}

export default function PageHeader({
  pageTitle,
  description,
  keywords,
  isReadyToListen,
  breadcrumb,
  audioSrc,
  audioTextContent,
  handelListenAudio,
}: PageHeaderProps) {
  const theme = useTheme();
  return (
    <header className="page-header-container">
      {breadcrumb && (
        <Box display="flex" alignItems="center" className="breadcrumb-wrapper">
          <Breadcrumbs
            aria-label="breadcrumb"
            className="page-header-breadcrumb"
            separator={<NavigateNextIcon fontSize="small" />}
          >
            {breadcrumb.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                underline="hover"
                color={idx === breadcrumb.length - 1 ? "primary" : "inherit"}
                className={`breadcrumb-link ${
                  idx === breadcrumb.length - 1 ? "active-breadcrumb" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </Breadcrumbs>
          <PlayArrowIcon fontSize="small" className="breadcrumb-play-icon" />{" "}
          {/* Add play icon */}
        </Box>
      )}
      {pageTitle && (
        <Box className="page-Info-title-wrp">
          <TopicTitle
            className={"page-Info-title"}
            title={pageTitle}
            mode="pageTitle"
          />

          <Box className="block-ele">
            {isReadyToListen && pageTitle && (
              <button
                className={`listen-audio-btn ${theme.palette.mode}`}
                onClick={() => {
                  if (handelListenAudio) {
                    handelListenAudio(audioTextContent, audioSrc);
                    if (!audioSrc && !audioTextContent) {
                      handelListenAudio(pageTitle, audioSrc);
                    }
                  } else {
                    console.warn("handelListenAudio function is not provided");
                  }
                }}
              >
                <SlowMotionVideoIcon />
              </button>
            )}
          </Box>
        </Box>
      )}
      {description && <p>{description}</p>}
      {keywords && (
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          gap={"4px"}
        >
          keywords :
          {keywords.split(",").map((item, idx) => {
            return (
              <Box key={idx} className="page-header-keywords">
                {item.trim()}
              </Box>
            );
          })}
        </Box>
      )}
    </header>
  );
}
