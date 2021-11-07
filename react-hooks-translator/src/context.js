import { createContext, useState } from "react";
import translations from "./translations";

export const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
  const [value, setValue] = useState("english");

  const handleTranslate = (language, text) => {
    setValue(language);
    if (translations[language][text] === undefined) {
      return { text: "번역 불가", sound: "" };
    }
    return { text: translations[language][text], sound: translations["sound"][language][text] };
  };

  return <LanguageContext.Provider value={{ handleTranslate }}>{children}</LanguageContext.Provider>;
};
