import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { defaultLanguage, defaultTheme, themeOptions } from "../appConst";
import type { LanguageObjTy, ThemeItem } from "../appTypes";

interface AppContextType {
  appCurrentTheme: ThemeItem;
  toggleTheme: () => void;
  appLanguage: LanguageObjTy;
  handelAppLanguage: (newLanguage: LanguageObjTy) => void;
  isSidebar: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  handelSidebar: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appCurrentTheme, setAppCurrentTheme] =
    useState<ThemeItem>(defaultTheme);
  const [isSidebar, setIsSidebar] = useState(false);
  const [appLanguage, setAppLanguage] = useState<LanguageObjTy>({
    name: "English",
    value: "en-US",
  });
  const toggleTheme = () => {
    // Find the index of the current theme and calculate the next theme index
    const currentThemeIndex = themeOptions.findIndex(
      (theme) => theme.value === appCurrentTheme.value
    );
    const nextThemeIndex = (currentThemeIndex + 1) % themeOptions.length;
    const nextTheme = themeOptions[nextThemeIndex];
    setAppCurrentTheme(nextTheme);
    // Optionally, you can play a sound or perform other actions here
    if (nextTheme.sound) {
      const audio = new Audio(nextTheme.sound);
      audio.pause();
      audio.currentTime = 0; // Reset audio to the start
      audio.play().catch((error) => {
        console.error("Error playing sound:", error);
      });
    }
    // Save the new theme to localStorage or perform other actions as needed
    localStorage.setItem("appTheme", JSON.stringify(nextTheme));
    console.log("Theme changed to:", nextTheme.name, appCurrentTheme);
  };
  const openSidebar = () => {
    setIsSidebar(true);
  };

  const closeSidebar = () => {
    setIsSidebar(false);
  };
  const handelSidebar = (value: boolean) => {
    setIsSidebar(value);
  };
  const handelAppLanguage = (newLanguage: LanguageObjTy) => {
    setAppLanguage(newLanguage);
  };

  useEffect(() => {
    if (defaultLanguage) {
      setAppLanguage(defaultLanguage);
    } else {
      setAppLanguage({
        name: "English",
        value: "en-US",
      });
    }
    () => {
      setAppLanguage(defaultLanguage);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        appCurrentTheme,
        toggleTheme,
        appLanguage,
        handelAppLanguage,
        isSidebar,
        openSidebar,
        closeSidebar,
        handelSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
