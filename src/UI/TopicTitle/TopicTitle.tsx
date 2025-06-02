import React from "react";
import { Box, Typography } from "@mui/material";
import "./TopicTitle.css";

interface TopicTitleProps {
  title?: string;
  subTitle?: string;
  mode?: "pageTitle" | "topicTitle";
  className?: string;
}

export default function TopicTitle({
  title,
  subTitle,
  mode,
  className,
}: TopicTitleProps) {
  return (
    <Box
      className={`topic-title-wrp ${className ? className : ""} ${
        mode
          ? mode == "pageTitle"
            ? "page-title"
            : "concept-title"
          : "concept-title"
      }`}
    >
      {title && (
        <Typography
          className={`title`}
          variant="h1"
          component="h1"
          margin={0}
          padding={0}
        >
          {title}
        </Typography>
      )}
      {subTitle && (
        <Typography
          className="concept-subtitle"
          variant="h6"
          component="h2"
          color="textSecondary"
        >
          {subTitle}
        </Typography>
      )}
    </Box>
  );
}
