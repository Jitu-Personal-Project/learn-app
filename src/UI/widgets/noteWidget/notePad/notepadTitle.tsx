import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material";
import "./notepadTitle.css";
interface NotepadTitleProps {
  title: string;
  closeNotepad: () => void;
}
export default function NotepadTitle({
  title,
  closeNotepad,
}: NotepadTitleProps) {
  const theme = useTheme();
  return (
    <div className="notepad-title-wrp" title="close notepad">
      <h1 className="title">Page Title : {title}</h1>
      <div className="close-icon-wrp">
        <Tooltip title="close notepad" onClick={closeNotepad}>
          <CloseIcon className="close-icon" />
        </Tooltip>
      </div>
    </div>
  );
}
