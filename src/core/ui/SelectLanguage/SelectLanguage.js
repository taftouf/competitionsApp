import React, { useState, useEffect } from "react";

// transaction
import { useTranslation } from "react-i18next";

// select
import { Select } from "../Select";
export const SelectLanguage = () => {
  const { i18n } = useTranslation();
  let initValue =
    i18n.language.indexOf("-") < 0
      ? i18n.language
      : i18n.language.substring(0, i18n.language.indexOf("-"));
  const [languages] = useState([
    { id: 0, name: "🇫🇷", value: "fr" },
    { id: 1, name: "🇬🇧", value: "en" },
    { id: 2, name: "🇪🇸", value: "es" },
    { id: 3, name: "🇮🇹", value: "it" },
    { id: 4, name: "🇩🇪", value: "de" },
    { id: 5, name: "🇵🇹", value: "pt" },
  ]);
  if ( languages.map((l) => l.value).indexOf(i18n.language) == -1 )
    initValue = 'en';
  const [activeLanguage, setActiveLanguage] = useState(initValue);
  

  useEffect(() => {
    i18n.changeLanguage(activeLanguage);
  }, [activeLanguage]);
  return (
    <Select
      values={languages}
      initValue={initValue}
      setNewValue={setActiveLanguage}
    />
  );
};
