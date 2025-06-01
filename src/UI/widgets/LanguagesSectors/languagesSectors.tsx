import { FormControl, Select, MenuItem } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import type { LanguageObjTy } from "../../../appTypes";
import { useAppContext } from "../../../contexts/context";
import { languageOptions } from "../../../appConst";
import "./languagesSectors.css";

export default function LanguagesSectors() {
  const { appLanguage, handelAppLanguage, appCurrentTheme } = useAppContext();
  return (
    <div className="tts-learn-language-selector-wrp">
      <div className="tts-language-selector-icon">
        <TranslateIcon />
      </div>
      <div className="tts-learn-language-selector">
        <FormControl fullWidth>
          <Select
            className={`${appCurrentTheme.value}-theme-select custom-select-height ssssssssssss`}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={appLanguage.value}
            onChange={(event) => {
              const selectedLanguage = languageOptions.find(
                (option) => option.value === event.target.value
              );
              if (selectedLanguage) {
                handelAppLanguage(selectedLanguage as LanguageObjTy);
                const audio = new Audio(selectedLanguage.sound);
                audio.pause();
                audio.currentTime = 0; // Reset audio to the start
                audio.play().catch((error) => {
                  console.error("Error playing sound:", error);
                });
              }
            }}
            size="small"
          >
            {languageOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
