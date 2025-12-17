// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageCaroussel from "../components/ImageCaroussel.jsx";

import HERO from "../assets/images/hotel/HERO.jpg";

import n1 from "../assets/images/hotel/n1.jpg";
import n2 from "../assets/images/hotel/n2.jpg";
import n3 from "../assets/images/hotel/n3.jpg";
import n4 from "../assets/images/hotel/n4.gif";
import n5 from "../assets/images/hotel/n5.jpg";
import n6 from "../assets/images/hotel/n6.jpg";

import b1 from "../assets/images/hotel/b1.jpg";

import c1 from "../assets/images/hotel/c1.jpg";
import c2 from "../assets/images/hotel/c2.jpg";
import c3 from "../assets/images/hotel/c3.jpg";
import c4 from "../assets/images/hotel/c4.jpg";
import c5 from "../assets/images/hotel/c5.jpg";
import c6 from "../assets/images/hotel/c6.jpg";

// 6 Slides, alle mit gleichen Layout-Maßen
const HOTEL_SLIDES = [
  {
    id: 4,
    title: "Wintertage am Kamin",
    kicker: "MOA HOTEL",
    text1:
      "Nach einem Tag im Schnee wartet die Lounge mit Kamin, warmen Drinks und leiser Musik.",
    image: n4,
  },
  {
    id: 2,
    title: "Verantwortung übernehmen\nund Bewusstsein schaffen",
    kicker: "MOA HOTEL",
    text1:
      "Nachhaltige Architektur trifft auf modernen Komfort und bewussten Umgang mit Ressourcen.",
    image: n2,
  },
  {
    id: 3,
    title: "Ein Rückzugsort hoch über dem Tal",
    kicker: "MOA HOTEL",
    text1:
      "Weiter Blick über Berge, Stadtlichter und See – perfekt für ruhige Tage und lange Abende.",
    image: n3,
  },
  {
    id: 1,
    title: "Grand Restaurant",
    kicker: "MOA HOTEL",
    text1: "Feine Küche mit Blick auf Berge und See.",
    text2:
      "Regionale Zutaten, ruhige Atmosphäre und persönlicher Service für besondere Abende.",
    image: n1,
  },
  {
    id: 5,
    title: "Private Erlebnisse",
    kicker: "MOA HOTEL",
    text1:
      "Helikopterflüge, Spa-Suiten oder private Dinner – wir gestalten Erlebnisse nach Wunsch.",
    image: n5,
  },
  {
    id: 6,
    title: "Ankommen und Abschalten",
    kicker: "MOA HOTEL",
    text1:
      "Klare Linien, warme Materialien und viel Licht sorgen schon beim Ankommen für Ruhe.",
    image: n6,
  },
];

const CAROUSEL_IMAGES = [c1, c2, c3, c4, c5, c6];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const active = HOTEL_SLIDES[currentSlide];

  const goPrev = () =>
    setCurrentSlide((prev) =>
      prev === 0 ? HOTEL_SLIDES.length - 1 : prev - 1
    );

  const goNext = () =>
    setCurrentSlide((prev) =>
      prev === HOTEL_SLIDES.length - 1 ? 0 : prev + 1
    );

  // Automatisches Weiterblättern alle 7 Sekunden
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === HOTEL_SLIDES.length - 1 ? 0 : prev + 1
      );
    }, 7000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="bg-[#f7efe7] text-slate-900">
      {/* HERO – großes Startbild */}
      <section id="hero" className="relative min-h-[90vh] overflow-hidden">
        <img
          src={HERO}
          alt="MOA Hotel Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-slate-900/35" />

        <div className="relative z-10 flex min-h-[90vh] items-center justify-center">
          <div className="mx-auto max-w-3xl px-4 text-center text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
              Your private hideaway in the heart of the Alps.
            </h1>

            <div className="mt-10 flex justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center border-2 border-[#c50355] bg-white/5 px-10 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] backdrop-blur-sm transition hover:bg-[#c50355] hover:text-white"
              >
                Buchen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOTEL – wie Carlton: Bild links, halbtransparente Box rechts */}
      <section id="hotel" className="relative z-20 bg-[#f7efe7] py-28">
        <div className="mx-auto max-w-7xl px-4">
          {/* Wintersaison-Intro */}
          <div className="mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900">
              Wintersaison: 12. Dezember 2025 – 22. März 2026
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-700 max-w-2xl mx-auto">
              Hoch über dem See gelegen, ist das MOA Hotel das edelste Refugium
              der Region – mit weitem Blick über Berge, Stadtlichter und den
              winterlichen See.
            </p>
          </div>

          {/* Bild + Card */}
          <div className="relative mx-auto max-w-6xl pt-10">
            {/* Bild – etwas höher, nicht zu breit, nach links geschoben */}
            <div className="shadow-[0_30px_80px_rgba(15,23,42,0.18)] overflow-hidden h-[19rem] sm:h-[21rem] md:h-[23rem] lg:h-[28rem] w-full md:w-[75%]">
              <img
                src={active.image}
                alt="Hotel Impression"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Card – rechts, halb auf dem Bild, halb außerhalb */}
            <div className="mt-8 md:mt-4 md:absolute md:right-[6%] md:top-[-20px] md:w-[52%] lg:w-[52%]">
              <div className="bg-white/50 backdrop-blur-[2px] px-8 py-9 sm:px-10 sm:py-11 shadow-[0_30px_80px_rgba(15,23,42,0.18)] md:h-[19rem] lg:h-[25rem] flex flex-col">
                <div className="mb-6">
                  <p className="text-[11px] tracking-[0.35em] uppercase text-slate-400">
                    {active.kicker}
                  </p>
                  <div className="mt-4 h-px w-16 bg-slate-300" />
                </div>

                <div className="max-w-md">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 whitespace-pre-line">
                    {active.title}
                  </h3>

                  {active.text1 && (
                    <p className="mt-4 text-sm sm:text-base text-slate-700">
                      {active.text1}
                    </p>
                  )}

                  {active.text2 && (
                    <p className="mt-2 text-sm sm:text-base text-slate-700">
                      {active.text2}
                    </p>
                  )}
                </div>

                {/* Button immer unten auf gleicher Höhe */}
                <div className="mt-auto pt-6">
                  <Link
                    to="/restaurant"
                    className="inline-flex items-center justify-center border-2 border-[#c50355] bg-transparent px-10 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] hover:bg-[#c50355] hover:text-white transition"
                  >
                    Mehr erfahren
                  </Link>
                </div>
              </div>
            </div>
          </div>

                  {/* Slider-Kontrollen */}
           <div className="mt-10 flex items-center justify-center gap-6">
  {/* Pfeil links */}
  <button
    type="button"
    onClick={goPrev}
    aria-label="Vorheriges Bild"
    className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e4d1c2] bg-white text-[#c50355] shadow-[0_8px_20px_rgba(15,23,42,0.18)] transition-colors hover:bg-[#c50355] hover:border-[#c50355] hover:text-white"
  >
    <span className="relative -top-[3px] text-2xl leading-none">
      &#8592;
    </span>
  </button>

  {/* Zähler in der Mitte */}
  <span className="flex h-10 min-w-[3.2rem] items-center justify-center text-[13px] tracking-[0.3em] uppercase text-slate-600">
    {currentSlide + 1} / {HOTEL_SLIDES.length}
  </span>

  {/* Pfeil rechts */}
  <button
    type="button"
    onClick={goNext}
    aria-label="Nächstes Bild"
    className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e4d1c2] bg-white text-[#c50355] shadow-[0_8px_20px_rgba(15,23,42,0.18)] transition-colors hover:bg-[#c50355] hover:border-[#c50355] hover:text-white"
  >
    <span className="relative -top-[3px] text-2xl leading-none">
      &#8594;
    </span>
  </button>
</div>
        </div>
      </section>





 {/* MOVING MOUNTAINS */}
<section
  id="moving-mountains"
  className="relative z-20 bg-[#f7eee5] py-24"
>
  <div className="mx-auto max-w-6xl px-4">
    {/* Bild + Box übereinander */}
    <div className="relative mx-auto max-w-5xl shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
      {/* Hintergrundbild – normale Ecken */}
      <img
        src={b1}
        alt="Moving Mountains – Winter in den Bergen"
        className="block h-[650px] w-full object-cover"
      />


      {/* halb transparente Box wie beim Original */}
      <div
        className="
          absolute left-[-8%] top-[-10%]
          w-[70%] h-[55%] max-w-[740px]
          bg-white/50 backdrop-blur-[2px]
          px-16 py-10
          shadow-[0_30px_70px_rgba(15,23,42,0.28)]
        "
      >
        <p className="mb-4 text-xs tracking-[0.35em] uppercase text-slate-400">
          Moving Mountains
        </p>

        <h2 className="mb-5 text-2xl sm:text-3xl font-semibold leading-snug text-slate-900">
          Moving Mountains – unser ganzheitliches Programm
        </h2>

        <p className="mb-6 text-sm sm:text-base leading-relaxed text-slate-700">
          Ein Konzept, das Vitalität stärkt, die Natur neu erlebbar macht
          und die Freude an Bewegung, Genuss und Entspannung verbindet.
        </p>

        <button
          type="button"
          className="inline-flex items-center justify-center border border-[#c50355] bg-white px-9 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] transition hover:bg-[#c50355] hover:text-white"
        >
          Mehr entdecken
        </button>
      </div>
    </div>
  </div>
</section>


{/* carusel */}

<section>

<ImageCaroussel images={CAROUSEL_IMAGES} />

</section>




      {/* RESTAURANT */}
      <section id="restaurant" className="relative z-20 bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 grid gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
          <div className="h-80 rounded-3xl bg-gradient-to-tr from-slate-800 via-slate-700 to-slate-500 shadow-lg md:h-[26rem] lg:h-[30rem]" />

          <div>
            <p className="mb-3 text-xs tracking-[0.3em] uppercase text-slate-500">
              Dining
            </p>
            <h2 className="mb-3 text-3xl sm:text-4xl font-semibold text-slate-900">
              Alpine flavours, crafted with a modern touch.
            </h2>
            <p className="mb-4 text-base text-slate-700">
              From slow breakfasts with sunrise views to multi-course tasting
              menus in the evening – our kitchens celebrate seasonal produce
              from the region.
            </p>
            <p className="text-base text-slate-700">
              Two signature restaurants, an intimate bar and a terrace
              overlooking the valley offer the right setting for every moment.
            </p>

            <div className="mt-8">
              <Link
                to="/restaurant"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
              >
                Mehr erfahren
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WELLNESS */}
      <section
        id="wellness"
        className="relative z-20 bg-slate-900 py-24 text-slate-50"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
            <div>
              <p className="mb-3 text-xs tracking-[0.3em] uppercase text-slate-300">
                Spa &amp; Wellness
              </p>
              <h2 className="mb-3 text-3xl sm:text-4xl font-semibold">
                A spa that feels like a quiet mountain sanctuary.
              </h2>
              <p className="mb-4 text-base text-slate-200/90">
                Pools with panoramic windows, steam and sauna areas, tailored
                treatments and cosy relaxation zones – all designed to slow down
                body and mind.
              </p>
              <p className="text-base text-slate-200/90">
                Our therapists create individual rituals that combine alpine
                botanicals with modern techniques.
              </p>

              <div className="mt-8">
                <Link
                  to="/wellness"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-100"
                >
                  Mehr erfahren
                </Link>
              </div>
            </div>

            <div className="h-80 rounded-3xl bg-gradient-to-tr from-slate-700 via-slate-500 to-slate-300 md:h-[26rem] lg:h-[30rem]" />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative z-20 bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-xs tracking-[0.3em] uppercase text-slate-500">
                Gallery
              </p>
              <h2 className="mb-2 text-3xl sm:text-4xl font-semibold text-slate-900">
                A glimpse into MOA Haven.
              </h2>
              <p className="max-w-xl text-base text-slate-700">
                Lobby scenes, winter terraces, suites and spa moments – a
                selection of impressions from the hotel.
              </p>
            </div>
            <a
              href="#contact"
              className="hidden rounded-full border border-slate-300 px-5 py-2 text-xs font-medium text-slate-900 hover:bg-slate-100 md:inline-flex"
            >
              Ask for media kit
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="h-48 rounded-2xl bg-slate-300 sm:h-56 md:h-64" />
            <div className="h-48 rounded-2xl bg-slate-200 sm:h-56 md:h-64" />
            <div className="h-48 rounded-2xl bg-slate-300 sm:h-56 md:h-64" />
            <div className="h-48 rounded-2xl bg-slate-200 sm:h-56 md:h-64" />
            <div className="h-48 rounded-2xl bg-slate-300 sm:h-56 md:h-64" />
            <div className="h-48 rounded-2xl bg-slate-200 sm:h-56 md:h-64" />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-20 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <p className="mb-3 text-xs tracking-[0.3em] uppercase text-slate-500">
                Contact
              </p>
              <h2 className="mb-3 text-3xl sm:text-4xl font-semibold text-slate-900">
                Plan your stay with our team.
              </h2>
              <p className="mb-4 text-base text-slate-700">
                Whether it&apos;s a weekend escape, a winter holiday or a
                private celebration – our reservation team will help you tailor
                your time at MOA Haven.
              </p>

              <div className="space-y-2 text-sm text-slate-700">
                <p>MOA Haven Hotel</p>
                <p>Example Street 12 · 12345 Alpine City</p>
                <p>Phone: +41 00 000 00 00</p>
                <p>Email: info@moa-haven.example</p>
              </div>

              <div className="mt-8">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
                >
                  Kontakt aufnehmen
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-slate-900">
                Opening times &amp; seasons
              </h3>
              <ul className="mb-4 space-y-2 text-xs sm:text-[0.82rem] text-slate-700">
                <li>• Winter season: mid-December to late March</li>
                <li>• Check-in from 15:00 · Check-out until 11:00</li>
                <li>• Private ski shuttle and concierge service on request</li>
              </ul>
              <p className="mb-3 text-xs text-slate-600">
                For group bookings, corporate events or celebrations, please
                contact our events team directly.
              </p>
              <a
                href="#contact"
                className="text-xs font-medium text-slate-900 underline underline-offset-4"
              >
                events@moa-haven.example
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
