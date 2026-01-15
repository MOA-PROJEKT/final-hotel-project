import React, { useState } from 'react'

// Components
import WellnessSection from '../components/WellnessSection.jsx'
import ImageCarousel from '../components/ImageCaroussel.jsx'

// Images – Hero
import Hero from '../assets/images/wellness/Hero.webp'

// Images – Spa
import spaMassage from '../assets/images/wellness/spaMassage.jpg'
import spaSauna from '../assets/images/wellness/spaSauna.jpg'
import spaPool2 from '../assets/images/wellness/spaPool2.jpg'

// Images – Yoga & Fitness
import yogaSession from '../assets/images/wellness/yogaSession.jpg'
import fitnessGym from '../assets/images/wellness/fitnessGym.jpg'

// Images – Carousel
import yoga1 from '../assets/images/wellness/yoga1.webp'
import yoga2 from '../assets/images/wellness/yoga2.webp'
import yoga3 from '../assets/images/wellness/yoga3.webp'
import yoga4 from '../assets/images/wellness/yoga4.webp'
import yoga5 from '../assets/images/wellness/yoga5.webp'
import yoga6 from '../assets/images/wellness/yoga6.webp'

const carouselImages = [yoga1, yoga2, yoga3, yoga4, yoga5, yoga6]

export default function Wellness() {
  return (
    <section className="bg-[#f7efe7] text-[#1b1b1b]">
      {/* ================= HERO ================= */}
      <div id="hero" className="relative min-h-[100vh] overflow-hidden">
        <img
          src={Hero}
          alt="hero bild"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/35" />

        <div className="relative z-10 flex min-h-[90vh]  items-center justify-center">
          <div className="text-center lg:mt-16 max-w-3xl text-white">
            <h1 className="mt-4 text-4xl  sm:text-5xl md:text-6xl font-semibold leading-tight">
              Wellness, Spa & Fitness
            </h1>

            <button
              onClick={() => {
                const scrollDuration = 1500
                const targetScroll = window.innerHeight
                const start = window.scrollY
                const startTime = performance.now()

                function scrollStep(timestamp) {
                  const elapsed = timestamp - startTime
                  const progress = Math.min(elapsed / scrollDuration, 1)
                  const ease =
                    progress < 0.5
                      ? 2 * progress * progress
                      : -1 + (4 - 2 * progress) * progress
                  window.scrollTo(0, start + targetScroll * ease)
                  if (progress < 1) {
                    requestAnimationFrame(scrollStep)
                  }
                }
                requestAnimationFrame(scrollStep)
              }}
              aria-label="Nach unten scrollen"
              className="
    absolute bottom-[-6rem] left-1/2 -translate-x-1/2
    flex flex-col items-center
    text-white hover:text-[#c50355] opacity-80 hover:opacity-100 transition
  "
            >
              <span className="text-sm uppercase tracking-widest  mb-2">
                Mehr Entdecken
              </span>

              <svg
                className="w-9 h-9 animate-bounce "
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ================= INTRO ================= */}
      <section>
        <div className="flex flex-col items-center text-center px-6 pt-16">
          <p
            className="
            text-gray-500 text-2xl mt-4 max-w-3xl mx-auto"
          >
            Entdecken Sie unsere exklusive Wellnesswelt – von entspannenden Spa-
            Anwendungen über ruhige Yoga-Sessions bis hin zu einem modernen
            Fitnessbereich für ein ganzheitliches Wohlfühlerlebnis.
          </p>
        </div>
      </section>

      {/* ================= SPA SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 pt-12 space-y-32">
        <WellnessSection
          index={0}
          image={spaPool2}
          tag="MOA Hotel – Pool"
          title="Entspannung mit Blick ins Wasser"
          description="Der Innenpool im MOA Hotel bietet Ruhe, angenehme Temperaturen und eine elegante Atmosphäre zum Abschalten."
          details={[
            { label: 'Öffnungszeiten', value: '07:00 – 21:00 Uhr' },
            { label: 'Temperatur', value: '28 °C' },
            { label: 'Zugang', value: 'Hotelgäste' },
          ]}
        />

        <WellnessSection
          index={1}
          image={spaSauna}
          tag="MOA Hotel – Sauna"
          title="Wohltuende Wärme für Körper & Geist"
          description="Unsere Sauna ist ein Rückzugsort zur Regeneration und Entspannung – perfekt nach einem aktiven Tag."
          details={[
            { label: 'Öffnungszeiten', value: '14:00 – 22:00 Uhr' },
            { label: 'Temperatur', value: '80 – 90 °C' },
            { label: 'Ruhebereich', value: 'inklusive' },
          ]}
        />

        <WellnessSection
          index={2}
          image={spaMassage}
          tag="MOA Hotel – Massage"
          title="Individuelle Massagen für Ihr Wohlbefinden"
          description="Genießen Sie maßgeschneiderte Massagen, die Körper und Geist in Einklang bringen."
          details={[
            { label: 'Behandlungen', value: 'Ganzkörper, Aroma, Hot Stone' },
            { label: 'Dauer', value: '30 – 90 Minuten' },
            { label: 'Termine', value: 'nach Vereinbarung' },
          ]}
        />
      </section>

      {/* ================= IMAGE CAROUSEL ================= */}
      <section className="py-10 -mb-8">
        <ImageCarousel images={carouselImages} />
      </section>

      <section className="relative overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          {/* ================= YOGA SECTION ================= */}
          <div className="w-full max-w-7xl px-6 ">
            <div className="flex flex-col md:flex-row items-center relative justify-center">
              {/* Bild */}
              <div className="w-full md:w-7/12 relative">
                <img
                  src={yogaSession}
                  alt="Yoga Session"
                  className="w-full h-96 md:h-[500px] object-cover shadow-xl"
                />
              </div>

              {/* Textbox überlappend */}
              <div
                className="
            bg-white/80 md:bg-white/90
            backdrop-blur-md md:backdrop-blur-[3px]
            shadow-lg
            h-auto md:h-[520px]
            p-10 md:p-14
            w-full md:w-[450px]
            -mt-16 md:mt-0
            relative
            z-10
            md:-ml-10
          "
              >
                <h2 className="text-4xl font-bold  text-slate-900 tracking-wide mb-4">
                  Yoga & Meditation
                </h2>
                <h3 className="text-2xl font-semibold text-slate-700  mb-4">
                  Tägliche Yoga-Stunden
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Finden Sie innere Ruhe und Balance in unserem speziell
                  gestalteten Yoga-Bereich. Perfekt für Anfänger und
                  Fortgeschrittene.
                </p>
                <ul className="text-slate-700 space-y-2 list-disc list-inside">
                  <li>Morgen-Yoga für Energie</li>
                  <li>Entspannungs-Yoga am Abend</li>
                  <li>Meditation & Atemübungen</li>
                  <li>Private Yoga-Sessions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ================= FITNESS SECTION ================= */}
          <div className="w-full max-w-7xl px-6 py-24">
            <div className="flex flex-col md:flex-row-reverse items-center relative justify-center">
              {/* Bild */}
              <div className="w-full md:w-7/12 relative">
                <img
                  src={fitnessGym}
                  alt="Fitness Studio"
                  className="w-full h-96 md:h-[500px] object-cover shadow-xl"
                />
              </div>

              {/* Textbox überlappend */}
              <div
                className="
            bg-white/80 md:bg-white/90
            backdrop-blur-md md:backdrop-blur-[3px]
            shadow-lg
            h-auto md:h-[520px]
            p-10 md:p-14
            w-full md:w-[450px]
            -mt-16 md:mt-0
            relative
            z-10
            md:-mr-10
          "
              >
                <h2 className="text-4xl font-bold text-slate-900 tracking-wide mb-4">
                  Fitness & Gym
                </h2>
                <h3 className="text-2xl font-semibold text-slate-700 mb-4">
                  Modernes Fitnessstudio
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Unser Fitnessbereich ist ausgestattet mit neuesten Geräten,
                  Functional Training Zonen und einem freundlichen Team, das Sie
                  unterstützt.
                </p>
                <ul className="text-slate-700 space-y-2 list-disc list-inside">
                  <li>Laufbänder & Crosstrainer</li>
                  <li>Freihantelbereich</li>
                  <li>Kraftgeräte & Functional Training</li>
                  <li>Personal Trainer auf Anfrage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
