// src/i18n/index.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import deNav from "../locales/de/nav.json";
import enNav from "../locales/en/nav.json";

import deAuth from "../locales/de/auth.json";
import enAuth from "../locales/en/auth.json";

import deBookings from "../locales/de/bookings.json";
import enBookings from "../locales/en/bookings.json";

import deAdmin from "../locales/de/admin.json";
import enAdmin from "../locales/en/admin.json";

import deCommon from "../locales/de/common.json";
import enCommon from "../locales/en/common.json";

import deRooms from "../locales/de/rooms.json";
import enRooms from "../locales/en/rooms.json";

import deFooter from "../locales/de/footer.json";
import enFooter from "../locales/en/footer.json";

import deHome from "../locales/de/home.json";
import enHome from "../locales/en/home.json";




i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "de",
    supportedLngs: ["de", "en"],
    ns: ["common", "nav", "auth", "bookings", "admin", "rooms", "footer", "home"],
    defaultNS: "common",
    resources: {
      de: {
        common: deCommon,
        nav: deNav,
        auth: deAuth,
        bookings: deBookings,
        admin: deAdmin,
        rooms: deRooms,
        footer: deFooter,
        home: deHome,

      },
      en: {
        common: enCommon,
        nav: enNav,
        auth: enAuth,
        bookings: enBookings,
        admin: enAdmin,
        rooms: enRooms,
        footer: enFooter,
        home: enHome
      },
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "lang",
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
