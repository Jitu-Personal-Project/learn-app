import React from "react";
import "./notePad.css";
import NotepadTitle from "./notepadTitle";
interface NotePadProps {
  closeNotepad: () => void;
  notePad: "open" | "close";
}
export default function NotePad({ closeNotepad, notePad }: NotePadProps) {
  return (
    <div className={`notepad-wrp ${notePad}`}>
      <NotepadTitle title="DSA 1" closeNotepad={closeNotepad} />
      <div className="page-inner-wrp">
        <div className="notepad-layout"></div>
      </div>
    </div>
  );
}
