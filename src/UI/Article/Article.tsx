import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import TopicTitle from "../TopicTitle/TopicTitle";
import "./conceptArticle.css";

interface ArticleProps {
  title?: string;
  content?: string;
  number?: number | string;
  isReadyToListen?: boolean;
  audioTextContent?: string;
  audioSrc?: string;
  handelListenAudio?: (text?: string, audioPath?: string) => void;
}

export default function Article({
  title,
  content,
  number,
  isReadyToListen,
  audioTextContent,
  audioSrc,
  handelListenAudio,
}: ArticleProps) {
  const theme = useTheme();
  return (
    <Box className="concept-article-widgets">
      <Typography variant="h5" component="h3" className="concept-title">
        {number && (
          <Box component="span" className="concept-number" sx={{ mr: 1 }}>
            {number}
          </Box>
        )}
        {title && <TopicTitle title={title} />}
      </Typography>
      <Box className="concept-text">
        <Typography className="concept-text-wrp" variant="body1" component="p">
          <Box className="block-ele">
            {isReadyToListen && (
              <button
                className={`listen-audio-btn ${theme.palette.mode}`}
                onClick={() => {
                  if (handelListenAudio) {
                    handelListenAudio(audioTextContent, audioSrc);
                    if (!audioSrc && !audioTextContent) {
                      handelListenAudio(content, "");
                    }
                  } else {
                    console.warn("handelListenAudio function is not provided");
                  }
                }}
              >
                <SlowMotionVideoIcon />
              </button>
            )}
            {content}
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
