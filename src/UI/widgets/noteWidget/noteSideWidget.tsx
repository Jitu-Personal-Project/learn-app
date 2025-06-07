import React, { useRef, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import CodeIcon from "@mui/icons-material/Code";
import NotePad from "./notePad/notePad";
import "./noteSideWidget.css";
import type { widgetsStatusProps } from "../../../Layout/Layout";

interface NoteSideWidgetProps {
  widgetsStatus: widgetsStatusProps;
  handelWidgetsStatus: (arg: any) => void;
  actionButton?: boolean;
}

const NoteSideWidget = ({
  widgetsStatus,
  handelWidgetsStatus,
  actionButton,
}: NoteSideWidgetProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{
    startX: number;
    startY: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const openNotepad = () => {
    let localWidgetsStatus = {
      ...widgetsStatus,
    };
    localWidgetsStatus.noteBook = "open";
    handelWidgetsStatus(localWidgetsStatus);
  };

  const closeNotepad = () => {
    let localWidgetsStatus = {
      ...widgetsStatus,
    };
    localWidgetsStatus.noteBook = "close";
    handelWidgetsStatus(localWidgetsStatus);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const element = e.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current) return;

    const { startX, startY } = dragRef.current;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    setPosition((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));

    dragRef.current.startX = e.clientX;
    dragRef.current.startY = e.clientY;
  };

  const handleMouseUp = () => {
    if (dragRef.current) {
      setPosition({ x: 0, y: 0 });
      openNotepad();
      // Play sound
      const audio = new Audio("/bookOpen.mp3");
      audio.play();
    }
    dragRef.current = null;
    console.log("you cn do");
  };

  return (
    <>
      {actionButton === true && (
        <div
          className="note-widgets-wrp"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="note-widgets-container">
            <div
              onMouseDown={handleMouseDown}
              className="draggable note-widgets"
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: dragRef.current
                  ? "none"
                  : "transform 0.3s ease-out",
              }}
            >
              <div className="note-title">NoteBook</div>

              <CreateIcon fontSize="small" className="note-icon" />
            </div>
          </div>
        </div>
      )}
      <NotePad closeNotepad={closeNotepad} notePad={widgetsStatus.noteBook} />
    </>
  );
};

export default NoteSideWidget;
