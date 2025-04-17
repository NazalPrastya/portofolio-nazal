import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

void i18n
  .use(HttpBackend) // Memuat terjemahan dari public/locales
  .use(LanguageDetector) // Mendeteksi bahasa pengguna
  .use(initReactI18next) // Binding untuk React
  .init({
    fallbackLng: "en", // Bahasa default jika tidak ada terjemahan
    supportedLngs: ["id", "en"], // Bahasa yang didukung
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Path ke file terjemahan
    },
    interpolation: {
      escapeValue: false, // React sudah aman dari XSS
    },
  });

export default i18n;
