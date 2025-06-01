import React from "react";
import { APP_NAME } from "../../../appConst";
import "./AppName.css";

export default function AppName() {
  return (
    <div className="app-name-wrp">
      <h1 className="app-name">{APP_NAME}</h1>
    </div>
  );
}
