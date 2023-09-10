import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationsEN from "./translations/en.json";
import translationsAR from "./translations/ar.json";

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        debug: false,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: translationsEN,
            },
            ar: {
                translation: translationsAR,
            },
            react: {
                wait: true,
            },
        },
    });

export default i18n;
