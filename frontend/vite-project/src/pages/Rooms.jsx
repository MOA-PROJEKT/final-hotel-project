// src/pages/Rooms.jsx

import { rooms } from '../data/rooms'
import RoomList from '../components/rooms/RoomList'
import RoomsHero from '../components/rooms/RoomsHero'
import RoomsSlider from '../components/rooms/RoomsSlider'

export default function Rooms() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <div>
        <RoomsHero />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="bg-[#faf5f0] text-neutral-800 min-h-screen">
        {/* Этот section — якорь для кнопки "Mehr entdecken" */}
        <section id="rooms-intro" className="mx-auto max-w-7xl px-4 py-20">
          {/* ================= HEADLINE ================= */}
          <header className="max-w-3xl mb-16">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 mb-4">
              Zimmer &amp; Suiten
            </p>

            <h1 className="mb-6 text-3xl sm:text-4xl font-semibold text-neutral-900">
              Ruhen Sie sich aus – mit Weitblick und Raum zum Ankommen.
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Jedes Zimmer im MOA Hotel ist ein Rückzugsort. Hochwertige
              Materialien, ruhige Farbwelten und durchdachte Details schaffen
              eine Atmosphäre, in der Entspannung ganz selbstverständlich wird –
              vom ersten Moment an.
            </p>
          </header>

          {/* ================= INFO LINKS ================= */}
          {/* ВАЖНО:
              Сейчас это просто кнопки.
              Позже:
              - "Inklusivleistungen" → Modal
              - "Gut zu wissen" → Scroll / FAQ
              - "Culinary Credit" → Restaurants-Seite
          */}
          <div className="mb-24 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: 'Inklusivleistungen',
                description:
                  'Alle Leistungen, die Ihren Aufenthalt besonders angenehm machen.',
              },
              {
                title: 'Gut zu wissen',
                description:
                  'Wichtige Informationen rund um Ihren Aufenthalt im MOA Hotel.',
              },
              {
                title: 'Culinary Credit',
                description:
                  'Kulinarische Erlebnisse, flexibel einlösbar in unseren Restaurants.',
              },
            ].map((item) => (
              <button
                key={item.title}
                className="text-left rounded-2xl border border-neutral-300 bg-white px-6 py-5 hover:shadow-md transition"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-2">
                  {item.title}
                </p>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </button>
            ))}
          </div>

          {/* ================= ROOMS SLIDER ================= */}
          {/* Слайдер с атмосферными изображениями */}
          <RoomsSlider />

          {/* ================= ROOMS GRID ================= */}
          {/* Карточки комнат — твоя существующая логика */}
          <RoomList rooms={rooms} />
        </section>
      </main>
    </>
  )
}
