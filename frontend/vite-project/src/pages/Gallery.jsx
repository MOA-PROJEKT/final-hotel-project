// src/pages/Gallery.jsx
import React from 'react'

import spaHero from '../assets/images/galerie/pool2.jpg'
import slider1 from '../assets/images/zimmer/slider1.webp'
import slider2 from '../assets/images/zimmer/slider2.webp'
import slider5 from '../assets/images/zimmer/slider5.webp'
import yoga2 from '../assets/images/wellness/yoga2.webp'
import yoga4 from '../assets/images/wellness/yoga4.webp'
import HERO from '../assets/images/hotel/HERO.jpg'
import yoga6 from '../assets/images/wellness/yoga6.webp'

import { useTranslation } from 'react-i18next'

function GalleryCard({ src, alt, height = 'h-64' }) {
  return (
    <figure
      className={`relative overflow-hidden rounded-3xl bg-slate-800/70 ${height} group`}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
    </figure>
  )
}

export default function Gallery() {
  const { t } = useTranslation('gallery')
  return (
    <main className=" text-white bg-[#f7efe7] min-h-screen">
      {/* HERO: volle Breite, Header liegt darüber */}
      <section className="relative -mt-24 sm:-mt-28 lg:-mt-32">
        <div className="relative md:h-[97vh] h-[94vh] min-h-[460px] w-full overflow-hidden">
          <img
            src={spaHero}
            alt="Infinity-Pool mit Blick auf die Berge"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-slate-950/5" />
          <div className="relative flex h-full items-center pt-[140px] justify-center px-4">
            <div className="text-center  max-w-3xl">
              <h1 className="mt-64 text-3xl sm:text-3xl lg:text-5xl font-semibold ">
                {t('hero.title')}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-16 flex items-center justify-center gap-4 sm:gap-8 px-4">
        <span className="h-px w-16 sm:w-32 bg-[#b2854e]" />
        <h2 className="font-serif text-xl md:text-3xl tracking-wide text-[#b2854e] whitespace-nowrap text-center">
          {t('section.title')}
        </h2>

        <span className="h-px w-16 sm:w-32 bg-[#b2854e]" />
      </div>

      {/* GALLERY-BEREICH – groß & edel */}
      <section className="mt-16 mx-auto max-w-7xl px-4 sm:px-8 lg:px-10 pb-20 space-y-10">
        {/* Reihe 1: links sehr groß, rechts zwei mittlere */}
        <div className="flex flex-col lg:flex-row gap-7">
          <div className="lg:flex-[3]">
            <GalleryCard
              src={slider1}
              alt="Innenpool mit Liegen und Panorama"
              height="h-[400px] sm:h-[480px] lg:h-[583px]"
            />
          </div>
          <div className="lg:flex-[2] flex flex-col gap-7">
            <GalleryCard
              src={slider2}
              alt="Spa-Massagebereich mit warmem Licht"
              height="h-[220px] sm:h-[260px] lg:h-[280px]"
            />
            <GalleryCard
              src={yoga2}
              alt="Elegantes Zimmer mit warmem Licht"
              height="h-[220px] sm:h-[260px] lg:h-[280px]"
            />
          </div>
        </div>

        {/* Reihe 2: links zwei mittlere, rechts sehr groß */}
        <div className="flex flex-col lg:flex-row gap-7">
          <div className="lg:flex-[2] flex flex-col gap-7">
            <GalleryCard
              src={slider5}
              alt="Suite mit Blick ins Grüne"
              height="h-[170px] sm:h-[190px] lg:h-[280px]"
            />
            <GalleryCard
              src={yoga2}
              alt="Sonnenterrasse am Nachmittag"
              height="h-[170px] sm:h-[190px] lg:h-[280px]"
            />
          </div>
          <div className="lg:flex-[3]">
            <GalleryCard
              src={yoga6}
              alt="Entspannter Nachmittag am Pool"
              height="h-[260px] sm:h-[300px] lg:h-[580px]"
            />
          </div>
        </div>

        {/* Reihe 3: zwei breite Karten – neue Galerie-Fotos */}
        <div className="flex flex-col md:flex-row gap-7">
          <div className="md:flex-1">
            <GalleryCard
              src={yoga4}
              alt="Exklusiver Fitnessbereich mit Blick nach draußen"
              height="h-[220px] sm:h-[240px] lg:h-[320px]"
            />
          </div>
          <div className="md:flex-1">
            <GalleryCard
              src={HERO}
              alt="Winterlicher Ausblick über das MOA Hotel"
              height="h-[220px] sm:h-[240px] lg:h-[320px]"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
