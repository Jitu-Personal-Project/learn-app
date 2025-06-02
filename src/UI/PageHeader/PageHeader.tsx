import React from "react";
import TopicTitle from "../TopicTitle/TopicTitle";
import { Box, Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow"; // Import the play icon
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
}

export default function PageHeader({
  pageTitle,
  description,
  keywords,
  isReadyToListen,
  breadcrumb,
}: PageHeaderProps) {
  return (
    <div className="page-header-container">
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
        <>
          <TopicTitle
            className={"page-Info-title"}
            title={pageTitle}
            mode="pageTitle"
          />
        </>
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
    </div>
  );
}
