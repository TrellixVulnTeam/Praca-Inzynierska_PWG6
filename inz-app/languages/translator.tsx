import React from "react";

export const languages = {
    pl: require("./pl.json"),
    en: require("./en.json")
};
  
export const LanguageContext = React.createContext({
    language: languages.en,
    changeLanguage: (lang) => {}
});