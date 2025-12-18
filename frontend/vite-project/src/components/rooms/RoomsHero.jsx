// src/components/rooms/RoomsHero.jsx

import heroImage from '../../assets/images/zimmer/hero.webp' // <-- ТВОЯ HERO

export default function RoomsHero() {
  return (
    <section className="relative h-[70vh] w-full pt-24 overflow-hidden">
      {/* HERO IMAGE – можно заменить позже */}
      <img
        src={heroImage}
        alt="Zimmer & Suiten"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay — позже сделаем бежевым */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Текст */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="text-white text-4xl sm:text-5xl font-semibold tracking-wide">
          Zimmer & Suites
        </h1>
      </div>
    </section>
  )
}
