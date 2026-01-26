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

import profileDE from "../locales/de/profile.json";
import profileEN from "../locales/en/profile.json";

import deRestaurant from "../locales/de/restaurant.json";
import enRestaurant from "../locales/en/restaurant.json";

import deGallery from "../locales/de/gallery.json";
import enGallery from "../locales/en/gallery.json";

import deContact from "../locales/de/contact.json";
import enContact from "../locales/en/contact.json";

// ✅ richtig: wellness (mit 2 x s)
import deWellness from "../locales/de/wellnes.json";
import enWellness from "../locales/en/wellnes.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "de",
    supportedLngs: ["de", "en"],

    ns: [
      "common",
      "nav",
      "auth",
      "bookings",
      "admin",
      "rooms",
      "footer",
      "home",
      "profile",
      "restaurant",
      "gallery",
      "contact",
      "wellness",
    ],
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
        profile: profileDE,
        restaurant: deRestaurant,
        gallery: deGallery,
        contact: deContact,
        wellness: deWellness,
      },
      en: {
        common: enCommon,
        nav: enNav,
        auth: enAuth,
        bookings: enBookings,
        admin: enAdmin,
        rooms: enRooms,
        footer: enFooter,
        home: enHome,
        profile: profileEN,
        restaurant: enRestaurant,
        gallery: enGallery,
        contact: enContact,
        wellness: enWellness,
      },
    },

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "lang",
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
