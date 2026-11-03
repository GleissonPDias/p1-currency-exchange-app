import { useMemo, useState } from "react";
import { LanguageContext } from "./languageContext";
import { translations } from "./translations";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("PT");

  const value = useMemo(() => {
    function t(key) {
      return translations[language][key] || key;
    }

    return { language, setLanguage, t };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
