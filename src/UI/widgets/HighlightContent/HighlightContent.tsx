import React, { type JSX } from "react";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import FaceOutlinedIcon from "@mui/icons-material/FaceOutlined";
import { useTheme } from "@mui/material";
import type { contentItem } from "../../../types/dataType";
import "./HighlightContent.css";
interface HighlightContentProps {
  highlightTitle: string;
  highlightData: contentItem[];
}

const HighlightContent: React.FC<HighlightContentProps> = ({
  highlightTitle,
  highlightData,
}) => {
  // Create a mapping object for string to component conversion
  const iconMap: Record<string, JSX.Element> = {
    AutoStoriesOutlinedIcon: <AutoStoriesOutlinedIcon fontSize="small" />,
    PlayCircleFilledWhiteOutlinedIcon: (
      <PlayCircleFilledWhiteOutlinedIcon fontSize="small" />
    ),
    VpnKeyOutlinedIcon: <VpnKeyOutlinedIcon fontSize="small" />,
    FaceOutlinedIcon: <FaceOutlinedIcon fontSize="small" />,
    QuestionMarkOutlinedIcon: <QuestionMarkOutlinedIcon fontSize="small" />,
  };
  const theme = useTheme();
  type IconKeys = keyof typeof iconMap; // Extract valid icon keys
  return (
    <div className={`highlight-component ${theme.palette.mode}`}>
      <h4 className="highlight-title">{highlightTitle}</h4>
      <ul className={`highlight-list ${theme.palette.mode}`}>
        {highlightData.map((item: contentItem) => (
          <li key={item.id}>
            {iconMap[item.icon as IconKeys] || null} {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HighlightContent;
