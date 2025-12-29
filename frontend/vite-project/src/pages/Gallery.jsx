// src/pages/Gallery.jsx
import React from 'react'

import spaHero from '../assets/images/galerie/pool2.jpg'
import spaPool2 from '../assets/images/galerie/pool.webp'
import spaSauna from '../assets/images/galerie/zimmer.webp'
import spaMassage from '../assets/images/wellness/spaMassage.jpg'
import yoga1 from '../assets/images/galerie/bet.webp'
import yoga2 from '../assets/images/galerie/sonne.webp'
import fitness from '../assets/images/galerie/fitness.webp'
import snow from '../assets/images/galerie/schnee.webp'
import pool3 from '../assets/images/galerie/pool3.webp'

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
  return (
    <main className=" text-white bg-[#f7efe7] min-h-screen">
      {/* HERO: volle Breite, Header liegt darüber */}
      <section className="relative -mt-24 sm:-mt-28 lg:-mt-32">
        <div className="relative h-[90vh] min-h-[460px] w-full overflow-hidden">
          <img
            src={spaHero}
            alt="Infinity-Pool mit Blick auf die Berge"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-slate-950/5" />
          <div className="relative flex h-full items-center pt-[140px] justify-center px-4">
            <div className="text-center  max-w-3xl">
             
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
                Moments at MOA
              </h1>
              <p className="mt-4 text-sm sm:text-base text-slate-100/85">
                Ihr privater Rückzugsort in den Alpen: ruhige Pools, warme
                Lichter und weiche Texturen. Eine Auswahl an Eindrücken aus
                unserem Spa- &amp; Wellnessbereich.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY-BEREICH – groß & edel */}
      <section className="mt-16 mx-auto max-w-7xl px-4 sm:px-8 lg:px-10 pb-20 space-y-10">
        {/* Reihe 1: links sehr groß, rechts zwei mittlere */}
        <div className="flex flex-col lg:flex-row gap-7">
          <div className="lg:flex-[3]">
            <GalleryCard
              src={spaPool2}
              alt="Innenpool mit Liegen und Panorama"
              height="h-[400px] sm:h-[480px] lg:h-[583px]"
            />
          </div>
          <div className="lg:flex-[2] flex flex-col gap-7">
            <GalleryCard
              src={spaMassage}
              alt="Spa-Massagebereich mit warmem Licht"
              height="h-[220px] sm:h-[260px] lg:h-[280px]"
            />
            <GalleryCard
              src={spaSauna}
              alt="Elegantes Zimmer mit warmem Licht"
              height="h-[220px] sm:h-[260px] lg:h-[280px]"
            />
          </div>
        </div>

        {/* Reihe 2: links zwei mittlere, rechts sehr groß */}
        <div className="flex flex-col lg:flex-row gap-7">
          <div className="lg:flex-[2] flex flex-col gap-7">
            <GalleryCard
              src={yoga1}
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
              src={pool3}
              alt="Entspannter Nachmittag am Pool"
              height="h-[260px] sm:h-[300px] lg:h-[580px]"
            />
          </div>
        </div>

        {/* Reihe 3: zwei breite Karten – neue Galerie-Fotos */}
        <div className="flex flex-col md:flex-row gap-7">
          <div className="md:flex-1">
            <GalleryCard
              src={fitness}
              alt="Exklusiver Fitnessbereich mit Blick nach draußen"
              height="h-[220px] sm:h-[240px] lg:h-[320px]"
            />
          </div>
          <div className="md:flex-1">
            <GalleryCard
              src={snow}
              alt="Winterlicher Ausblick über das MOA Hotel"
              height="h-[220px] sm:h-[240px] lg:h-[320px]"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
