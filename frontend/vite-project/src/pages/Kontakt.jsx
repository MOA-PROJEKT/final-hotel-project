import React from 'react'
import ContactCard1 from '../components/ContactCard1.jsx'
import contactHero from '../assets/images/hotel/contakt.jpg'

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
  {
    id: 4,
    title: 'Firma 4',
    address: 'Musterstrasse 10',
    phone: '+41 81 000 00 00',
    email: 'sales@hotel.ch',
  },
  {
    id: 5,
    title: 'Firma 5',
    address: 'Musterstrasse 10',
    phone: '+41 81 000 00 00',
    email: 'sales@hotel.ch',
  },
]

export default function Kontakt() {
  return (
    <main className="bg-[#f7efe7] min-h-screen text-[#2a2a2a] pt-20">
      {/* HERO-TEXT */}
      <section className="max-w-6xl mx-auto text-center px-6 pt-32 pb-12">
        <h1 className="text-4xl md:text-5xl font-light text-[#b38b4d] tracking-wide mt-0">
          Kontaktieren Sie uns
        </h1>
        <p className="mt-4 text-lg">
          Das Team des MOA_Hotel steht Ihnen gerne zur Verfügung.
        </p>
      </section>

      {/* KARTE (BILD) + BESUCHS-INFOS – wie Carlton */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-12 items-center px-6 pb-20">
          {/* Linke Seite: Karte als Bild */}
          <div className="w-full">
            <img
              src={contactHero}
              alt="Anreise nach St. Moritz – Karte Schweiz"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Rechte Seite: Besuchsadresse */}
          <div className="flex flex-col justify-center lg:pl-9">
            <span className="text-xs tracking-[0.35em] uppercase text-[#b38b4d] mb-2">
              Kontakt
            </span>
            <h3 className="text-2xl font-medium mb-6 text-[#2a2a2a]">
              Besuchen Sie uns
            </h3>

            <div className="space-y-2 mb-6 leading-8">
              <p>MOA_Hotel</p>
              <p>
                Via Musterstrasse 11
                <br />
                CH-7500 St. Moritz
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <p className="font-medium text-[#b38b4d] uppercase tracking-[0.2em]">
                Telefon
              </p>
              <p className="mb-4 text-base">+41 81 123 70 00</p>

              <p className="font-medium text-[#b38b4d] uppercase tracking-[0.2em]">
                E-Mail
              </p>
              <a
                href="mailto:info@hotel.ch"
                className="text-[#c50355] hover:underline text-base"
              >
                info@hotel.ch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Unser Team */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-center gap-6 mb-14">
          <span className="flex-1 border-t border-[#b38b4d]"></span>
          <h2 className="text-3xl font-semibold text-[#b38b4d] tracking-wide text-center">
            Kontaktieren Sie Unser Team
          </h2>
          <span className="flex-1 border-t border-[#b38b4d]"></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            {
              name: 'Management',
              person: 'Andrea & Markus Rieder',
              title: 'General Managers',
              tel: '+41 81 836 71 00',
              mail: 'management@moa-hotel.ch',
            },
            {
              name: 'Reservation & Revenue',
              person: 'Julia Moser',
              title: 'Director of Revenue',
              tel: '+41 81 836 71 01',
              mail: 'reservation@moa-hotel.ch',
            },
            {
              name: 'Front Office',
              person: 'Lukas Baumann',
              title: 'Front Office Manager',
              tel: '+41 81 836 71 02',
              mail: 'frontoffice@moa-hotel.ch',
            },
            {
              name: 'Human Resources',
              person: 'Martina Keller',
              title: 'HR Manager',
              tel: '+41 81 836 71 03',
              mail: 'hr@moa-hotel.ch',
            },
            {
              name: 'Food & Beverage',
              person: 'Simon Berger',
              title: 'F&B Manager',
              tel: '+41 81 836 71 04',
              mail: 'fb@moa-hotel.ch',
            },
            {
              name: 'Concierge',
              person: 'Pascal Huber',
              title: 'Chef Concierge',
              tel: '+41 81 836 71 05',
              mail: 'concierge@moa-hotel.ch',
            },
            {
              name: 'Küche',
              person: 'Daniel Frei',
              title: 'Executive Chef',
              tel: '+41 81 836 71 06',
              mail: 'kitchen@moa-hotel.ch',
            },
            {
              name: 'Housekeeping',
              person: 'Verena Blaser',
              title: 'Executive Housekeeper',
              tel: '+41 81 836 71 07',
              mail: 'housekeeping@moa-hotel.ch',
            },
            {
              name: 'Technik',
              person: 'Oliver Tanner',
              title: 'Chief Engineer',
              tel: '+41 81 836 71 08',
              mail: 'technik@moa-hotel.ch',
            },
            {
              name: 'Spa',
              person: 'Natalie Schwarz',
              title: 'Spa Manager',
              tel: '+41 81 836 71 09',
              mail: 'spa@moa-hotel.ch',
            },
          ].map((member, i) => (
            <div key={i} className="p-8 text-center min-h-[260px] space-y-6">
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="font-medium">{member.person}</p>
              <p className="text-gray-600">{member.title}</p>
              <p className="text-sm">Via Stella 22, CH-7500 St. Moritz</p>
              <p className="text-sm">Telefon {member.tel}</p>
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
            Sales Kontakt
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
            Presse Kontakt
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
                  Presse {i + 1}
                </h3>
                <p>Adresse Musterstrasse 5</p>
                <p>Tel: +41 81 000 00 00</p>
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

        <div className="flex justify-center">
          <div className="w-80 bg-white p-10 rounded-2xl shadow-md min-h-[350px] flex flex-col justify-between items-center text-center">
            <div className="space-y-3 flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-[#b38b4d] mb-2">
                Presse 4
              </h3>
              <p>Adresse Musterstrasse 5</p>
              <p>Tel: +41 81 000 00 00</p>
            </div>
            <a
              href="mailto:presse@hotel.ch"
              className="mt-6 text-[#c50355] font-medium hover:underline"
            >
              presse@hotel.ch
            </a>
          </div>
        </div>
      </section>

      {/* HOTEL KONTAKT – FORMULAR */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center gap-6 mb-10">
          <div className="flex items-center justify-center w-full gap-6">
            <span className="flex-1 border-t border-[#b38b4d]"></span>
            <h2 className="text-3xl font-semibold text-[#b38b4d] tracking-wide text-center">
              Hotel Kontakt
            </h2>
            <span className="flex-1 border-t border-[#b38b4d]"></span>
          </div>

          <p className="text-center text-gray-700 leading-relaxed max-w-md">
            Für weitere Informationen füllen Sie bitte das
            <br />
            untenstehende Formular aus.
          </p>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Vorname</label>
            <input type="text" className="border rounded-lg px-4 py-2" required />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Nachname</label>
            <input type="text" className="border rounded-lg px-4 py-2" required />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Telefon</label>
            <input type="tel" className="border rounded-lg px-4 py-2" />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">E-Mail</label>
            <input type="email" className="border rounded-lg px-4 py-2" required />
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label className="mb-1 font-medium">Nachricht</label>
            <textarea
              rows="6"
              className="border rounded-lg px-4 py-2"
              required
            ></textarea>
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-[#c50355] text-white px-10 py-3 rounded-lg text-lg  transition"
            >
              Abschicken
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
