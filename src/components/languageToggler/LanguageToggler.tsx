import React from "react";
import { languages } from "../../constants/constants";
import "./languageToggler.scss";

interface LanguageTogglerProps {
  chooseLanguage: (e: React.MouseEvent<HTMLButtonElement>) => void;
  currentLanguage: "eng" | "укр";
}

function LanguageToggler({
  chooseLanguage,
  currentLanguage,
}: LanguageTogglerProps) {
  return (
    <div className="languageToggler">
      {languages.map((lang) => (
        <button
          className={`langBtn ${currentLanguage === lang && "currentLang"}`}
          key={lang}
          id={lang}
          onClick={(e) => chooseLanguage(e)}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}

export default LanguageToggler;
