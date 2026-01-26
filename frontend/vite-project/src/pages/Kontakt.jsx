import React from 'react'
import ContactCard1 from '../components/ContactCard1.jsx'
import contactHero from '../assets/images/hotel/contakt.jpg'
import { useTranslation } from "react-i18next";

const SALES_CONTACTS = [
  {
    id: 1,
    title: 'Firma 1',
    address: 'Musterstrasse 10',
    phone: '+41 81 000 00 00',
    email: 'sales@hotel.ch',
  },
  {
    id: 2,
    title: 'Firma 2',
    address: 'Musterstrasse 10',
    phone: '+41 81 000 00 00',
    email: 'sales@hotel.ch',
  },
  {
    id: 3,
    title: 'Firma 3',
    address: 'Musterstrasse 10',
    phone: '+41 81 000 00 00',
    email: 'sales@hotel.ch',
  },
]

export default function Kontakt() {
  const { t } = useTranslation("contact");

  return (
    <main className="bg-[#f7efe7] min-h-screen text-[#2a2a2a] pt-20">
      {/* HERO-TEXT */}
      <section className="max-w-6xl mx-auto text-center px-6 md:pt-32 pt-12  pb-10">
        <h1 className="text-4xl md:text-5xl font-light text-[#b2854e] tracking-wide mt-0">
          {t("hero.title")}
        </h1>
        <p className="mt-4 text-lg">
          {t("hero.subtitle")}
        </p>
      </section>

      {/* KARTE (BILD) + BESUCHS-INFOS – wie Carlton */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-12 items-center px-6 pb-20">
          {/* Linke Seite: Karte als Bild */}
          <div className="w-full">
            <img
              src={contactHero}
              alt={t("mapAlt")}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Rechte Seite: Besuchsadresse */}
          <div className="flex flex-col justify-center lg:pl-9">
            <span className="text-xs tracking-[0.35em] uppercase text-[#b38b4d] mb-2">
              {t("visit.label")}
            </span>
            <h3 className="text-2xl font-medium mb-6 text-[#2a2a2a]">
              {t("visit.title")}
            </h3>

            <div className="space-y-2 mb-6 leading-8">
              <p>MOA_Hotel</p>
              <p>
                Via Musterstrasse 11
                <br />
                CH-7000 St. Moritz
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <p className="font-medium text-[#b38b4d] uppercase tracking-[0.2em]">
                {t("visit.phoneLabel")}
              </p>
              <p className="mb-4 text-base">+41 11 123 45 67</p>

              <p className="font-medium text-[#b38b4d] uppercase tracking-[0.2em]">
                {t("visit.emailLabel")}
              </p>
              <a
                href="mailto:moa@hotel.ch"
                className="text-[#c50355] hover:underline text-base"
              >
                moa@hotel.ch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Unser Team */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-center gap-6 mb-14">
          <span className="flex-1 border-t border-[#b38b4d]"></span>
          <h2 className="text-3xl font-semibold text-[#b38b4e] tracking-wide text-center">
            {t("team.title")}
          </h2>
          <span className="flex-1 border-t border-[#b38b4d]"></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            {
              name: t("team.departments.management.name"),
              person: 'Andrea & Markus Rieder',
              title: t("team.departments.management.role"),
              tel: '+41 81 836 71 00',
              mail: 'management@moa-hotel.ch',
            },
            {
              name: t("team.departments.reservation.name"),
              person: 'Julia Moser',
              title: t("team.departments.reservation.role"),
              tel: '+41 81 836 71 01',
              mail: 'reservation@moa-hotel.ch',
            },
            {
              name: t("team.departments.frontOffice.name"),
              person: 'Lukas Baumann',
              title: t("team.departments.frontOffice.role"),
              tel: '+41 81 836 71 02',
              mail: 'frontoffice@moa-hotel.ch',
            },
            {
              name: t("team.departments.hr.name"),
              person: 'Martina Keller',
              title: t("team.departments.hr.role"),
              tel: '+41 81 836 71 03',
              mail: 'hr@moa-hotel.ch',
            },
            {
              name: t("team.departments.fb.name"),
              person: 'Simon Berger',
              title: t("team.departments.fb.role"),
              tel: '+41 81 836 71 04',
              mail: 'fb@moa-hotel.ch',
            },

            {
              name: t("team.departments.kitchen.name"),
              person: 'Daniel Frei',
              title: t("team.departments.kitchen.role"),
              tel: '+41 81 836 71 06',
              mail: 'kitchen@moa-hotel.ch',
            },
            {
              name: t("team.departments.housekeeping.name"),
              person: 'Verena Blaser',
              title: t("team.departments.housekeeping.role"),
              tel: '+41 81 836 71 07',
              mail: 'housekeeping@moa-hotel.ch',
            },

            {
              name: t("team.departments.spa.name"),
              person: 'Natalie Schwarz',
              title: t("team.departments.spa.role"),
              tel: '+41 81 836 71 09',
              mail: 'spa@moa-hotel.ch',
            },
          ].map((member, i) => (
            <div key={i} className="p-8 text-center min-h-[260px] space-y-6">
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="font-medium">{member.person}</p>
              <p className="text-gray-600">{member.title}</p>
              <p className="text-sm">{t("team.addressLine")}</p>
              <p className="text-sm">{t("team.phoneInline")} {member.tel}</p>
              <a
                href={`mailto:${member.mail}`}
                className="text-[#c50355] hover:underline block"
              >
                {member.mail}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* SALES KONTAKT – alle Boxen gleich breit */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-center gap-6 mb-14">
          <span className="flex-1 border-t border-[#b38b4d]" />
          <h2 className="text-3xl font-semibold text-[#b38b4d] tracking-wide">
            {t("sales.title")}
          </h2>
          <span className="flex-1 border-t border-[#b38b4d]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {SALES_CONTACTS.map((item) => (
            <ContactCard1 key={item.id} {...item} />
          ))}
        </div>
      </section>

      {/* PRESSE KONTAKT */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-center gap-6 mb-12">
          <span className="flex-1 border-t border-[#b38b4d]" />
          <h2 className="text-3xl font-semibold text-[#b38b4d] tracking-wide text-center">
            {t("press.title")}
          </h2>
          <span className="flex-1 border-t border-[#b38b4d]" />
        </div>

        <div className="flex justify-center gap-6 flex-wrap mb-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-80 bg-white p-10 rounded-2xl shadow-md min-h-[350px] flex flex-col justify-between items-center text-center"
            >
              <div className="space-y-3 flex flex-col items-center">
                <h3 className="text-2xl font-semibold text-[#b38b4d] mb-2">
                  {t("press.boxTitle")} {i + 1}
                </h3>
                <p>{t("press.address")}</p>
                <p>{t("press.tel")}: +41 81 000 00 00</p>
              </div>
              <a
                href="mailto:presse@hotel.ch"
                className="mt-6 text-[#c50355] font-medium hover:underline"
              >
                presse@hotel.ch
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* HOTEL KONTAKT – FORMULAR */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center gap-6 mb-10">
          <div className="flex items-center justify-center w-full gap-6">
            <span className="flex-1 border-t border-[#b38b4d]"></span>
            <h2 className="text-3xl font-semibold text-[#b38b4d] tracking-wide text-center">
              {t("form.title")}
            </h2>
            <span className="flex-1 border-t border-[#b38b4d]"></span>
          </div>

          <p className="text-center text-gray-700 leading-relaxed max-w-md">
            {t("form.subtitle1")}
            <br />
            {t("form.subtitle2")}
          </p>
        </div>

        <form
          action="https://formspree.io/f/maqqoaal"
          method="POST"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {/* Redirect zur Danke-Seite */}
          <input type="hidden" name="_redirect" value="https://hotel-projekt.vite.app/danke" />

          <div className="flex flex-col">
            <label className="mb-1 font-medium">{t("form.firstName")}</label>
            <input
              type="text"
              name="vorname"
              className="border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">{t("form.lastName")}</label>
            <input
              type="text"
              name="nachname"
              className="border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">{t("form.phone")}</label>
            <input
              type="tel"
              name="telefon"
              className="border rounded-lg px-4 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">{t("form.email")}</label>
            <input
              type="email"
              name="email"
              className="border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label className="mb-1 font-medium">{t("form.message")}</label>
            <textarea
              name="nachricht"
              rows="6"
              className="border rounded-lg px-4 py-2"
              required
            ></textarea>
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-[#c50355] text-white px-10 py-3 rounded-lg text-lg transition"
            >
              {t("form.submit")}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
