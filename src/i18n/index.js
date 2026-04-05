import { createContext, createElement, useContext, useMemo } from "react";
import en from "./en.json";
import ja from "./ja.json";
import ko from "./ko.json";
import zh from "./zh.json";

const dictionaries = { en, ja, ko, zh };

const I18nContext = createContext({
  languageRegion: "en-PH",
  language: "en",
  t: (key, fallback = key) => fallback,
});

const getLanguageFromRegion = (languageRegion = "en-PH") =>
  languageRegion.split("-")[0] || "en";

const resolveTranslation = (dictionary, key) =>
  key.split(".").reduce((value, part) => value?.[part], dictionary);

const interpolate = (text, values = {}) =>
  Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value),
    text,
  );

export const I18nProvider = ({ languageRegion, children }) => {
  const language = getLanguageFromRegion(languageRegion);

  const value = useMemo(() => {
    const dictionary = dictionaries[language] ?? dictionaries.en;

    return {
      languageRegion,
      language,
      t: (key, fallback = key, values) => {
        const resolved = resolveTranslation(dictionary, key);
        const text = typeof resolved === "string" ? resolved : fallback;
        return values ? interpolate(text, values) : text;
      },
    };
  }, [language, languageRegion]);

  return createElement(I18nContext.Provider, { value }, children);
};

export const useI18n = () => useContext(I18nContext);
