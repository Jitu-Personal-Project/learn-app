import exp from "constants";
import type { LanguageObjTy, ThemeItem } from "./appTypes";

export const APP_NAME = "Learnify DSA JavaScript";
export const APP_LOGO_URL = "./dsa-logo.png"; // Replace with actual logo URL
export const APP_VERSION = "1.0.0";
export const APP_AUTHOR = "Jitu Jahagirdar";
export const APP_DESCRIPTION = "Learn anything with ease and fun with our app.";
export const APP_COPYRIGHT = "Jitu Jahagirdar © 2023";
export const APP_LICENSE = "MIT";
export const APP_WEBSITE = "https://example.com";
export const APP_SUPPORT_EMAIL = "jitu123435@gmail.com";
export const APP_ENV: "development" | "test" | "production" = "development";
export const APP_BUILD_DATE = new Date().toLocaleDateString();
export const APP_BUILD_TIME = new Date().toLocaleTimeString();
export const APP_BUILD_HASH = "abc123"; // Replace with actual hash
export const APP_REPOSITORY =
  "https://github.com/Jitu-Personal-Project/learn-app.git";

//----------------- App languageOptions  -----------------//

export const defaultLanguage: LanguageObjTy = {
  name: "English",
  value: "en-US",
};

export const languageOptions: LanguageObjTy[] = [
  {
    name: "English",
    value: "en-US",
    sound: "/english.mp3",
  },
  {
    name: "Hindi",
    value: "hi-IN",
    sound: "/hindi.mp3",
  },
];
export const defaultTheme: ThemeItem = {
  name: "Light",
  idx: 0,
  value: "light",
  sound: "/changeTheme.mp3",
};

export const themeOptions: ThemeItem[] = [
  {
    name: "Light",
    idx: 0,
    value: "light",
    sound: "/sunshine.mp3",
  },
  {
    name: "Dark",
    idx: 1,
    value: "dark",
    sound: "/changeTheme.mp3",
  },
  {
    name: "Transparent",
    idx: 2,
    value: "transparent",
    sound: "/transparent-theme.mp3",
  },
];
//--------------------------------------------------------------//
