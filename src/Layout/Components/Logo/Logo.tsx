import React from "react";
import { APP_LOGO_URL } from "../../../appConst";
import "./Logo.css";

export default function Logo() {
  return (
    <>
      {APP_LOGO_URL && <img className="app-logo" src={APP_LOGO_URL} alt="" />}
    </>
  );
}
