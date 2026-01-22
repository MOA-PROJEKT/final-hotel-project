// src/pages/Home.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ImageCaroussel from "../components/ImageCaroussel.jsx";
import { useTranslation } from "react-i18next";


import herovideodesktop from "../assets/images/hotel/herovideodesktop.mp4";

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

// Carlton-Sektionen Bilder
import d1 from "../assets/images/hotel/d1.jpg";
import d2 from "../assets/images/hotel/d2.jpg";
import d3 from "../assets/images/hotel/d3.jpg";

import g1 from "../assets/images/hotel/g1.jpg";
import g2 from "../assets/images/hotel/g2.jpg";
import g3 from "../assets/images/hotel/g3.jpg";
import g4 from "../assets/images/hotel/g4.jpg";

import e1 from "../assets/images/hotel/e1.jpg";
import e2 from "../assets/images/hotel/e2.jpg";

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
  const { t } = useTranslation("home");

  const [currentSlide, setCurrentSlide] = useState(0);

    // ✅ Video Play/Pause (wie Carlton)
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      v.play();
      setIsVideoPlaying(true);
    } else {
      v.pause();
      setIsVideoPlaying(false);
    }
  };


  const active = HOTEL_SLIDES[currentSlide];

  const goPrev = () =>
    setCurrentSlide((prev) => (prev === 0 ? HOTEL_SLIDES.length - 1 : prev - 1));

  const goNext = () =>
    setCurrentSlide((prev) => (prev === HOTEL_SLIDES.length - 1 ? 0 : prev + 1));

  // Automatisches Weiterblättern alle 7 Sekunden
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === HOTEL_SLIDES.length - 1 ? 0 : prev + 1
      );
    }, 7000);

    return () => clearInterval(intervalId);
  }, []);

  // Wiederverwendbarer Text für die 3 Carlton-Sektionen
  const winterTitle = "Ein Winter voller Möglichkeiten";
  const winterTextLong =
    "Entdecke saisonale Highlights, besondere Events und neue Winter-Momente im MOA Hotel – von Genuss bis Erlebnis.";
  const winterTextShort =
    "Entdecke saisonale Highlights, besondere Events und neue Winter-Momente im MOA Hotel.";

  // ===== Journal "Lesen" Toggle (Accordion) =====
  const [openJournal, setOpenJournal] = useState(null);
  const toggleJournal = (id) =>
    setOpenJournal((prev) => (prev === id ? null : id));

  const JOURNAL_MORE = {
    g1: "Drei Michelin-Keys stehen für außergewöhnliche Gastfreundschaft, stimmige Atmosphäre und konstante Qualität – vom ersten Empfang bis zum letzten Detail. Für uns ist es Motivation, Service und Kulinarik jeden Tag weiter zu verfeinern.",
    g2: "Wer bei uns ankommt, sucht Ruhe ohne Verzicht: großzügige Zimmer, ein Blick auf die Berge und ein Haus, das sich Zeit nimmt. Ob Kaminlounge, Concierge oder kleine Aufmerksamkeiten – hier zählt das Gefühl, wirklich willkommen zu sein.",
    g3: "Signature Moments sind Erlebnisse, die wir exklusiv für dich gestalten: private Tastings, Winter-Picknicks, individuelle Touren oder ein Dinner an einem besonderen Ort. So wird aus einer Reise ein persönlicher Moment, der bleibt.",
    g4: "Nach einem Tag in der Kälte wartet Wärme: Pool, Ruhezonen und Treatments, die Muskulatur lösen und Energie zurückbringen. Sanfte Düfte, leises Licht und stille Bereiche sorgen dafür, dass Kopf und Körper wirklich abschalten.",
    e1: "Abseits der bekannten Wege zeigen sich St. Moritz und das Engadin von ihrer stillen Seite: verschneite Waldpfade, kleine Aussichtspunkte und Orte, an denen man die Natur ganz nah spürt. Perfekt für einen Spaziergang, der den Kopf frei macht.",
    e2: "Das Grand Restaurant verbindet klassische Eleganz mit feinen, regionalen Aromen. Saisonale Menüs, ruhige Atmosphäre und ein Service, der aufmerksam bleibt, ohne aufdringlich zu sein – ideal für Abende, die in Erinnerung bleiben.",
  };

  const isOpen = (id) => openJournal === id;

  // ===== "Mehr anzeigen" (2 zusätzliche Journal-Karten) =====
  const [showMoreJournal, setShowMoreJournal] = useState(false);
const [animateMoreJournal, setAnimateMoreJournal] = useState(false);

const toggleMoreJournal = () => {
  // ✅ Öffnen
  if (!showMoreJournal) {
    setShowMoreJournal(true);

    // kurz warten damit die neuen Artikel im DOM sind
    setTimeout(() => {
      setAnimateMoreJournal(true);

      // dann langsam dahin scrollen
      setTimeout(() => {
        const el = document.getElementById("more-journal");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }, 10);

    return;
  }

  // ✅ Schließen: erst hochscrollen, dann zuklappen, dann entfernen
  const topEl = document.getElementById("journal-top");
  if (topEl) topEl.scrollIntoView({ behavior: "smooth", block: "start" });

  setAnimateMoreJournal(false);
  setTimeout(() => setShowMoreJournal(false), 550);
};


  return (
    <main className="bg-[#f7efe7] text-slate-900">
     {/* HERO – großes Startbild */}
<section id="hero" className="relative min-h-[100vh] overflow-hidden">
  <video
  ref={videoRef}
  src={herovideodesktop}
  autoPlay
  loop
  muted
  playsInline
  preload="metadata"
  className="absolute inset-0 h-full w-full object-cover"
/> 
  <div className="absolute inset-0 bg-slate-900/35" />

  {/* ✅ Play / Pause Button (unten links) */}
<button
  type="button"
  onClick={toggleVideo}
  aria-label={isVideoPlaying ? "Video pausieren" : "Video abspielen"}
  className="
    absolute bottom-6 left-6 z-20
    flex h-10 w-10 items-center justify-center
    rounded-full bg-black/15 backdrop-blur-sm
    text-white/70 hover:bg-black/50
    border border-white/10
    transition
  "
>
  {isVideoPlaying ? (
    // Pause Icon
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  ) : (
    // Play Icon
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7-11-7z" />
    </svg>
  )}
</button>


  <div className="relative z-10 flex min-h-[90vh] items-center justify-center">
    <div className="mx-auto pt-16 max-w-3xl px-4 text-center text-white">
      <h1 className="text-3xl  md:text-5xl font-semibold leading-tight">
        {t("hero.title")}
      </h1>

      <div className="mt-10 flex justify-center">
        <Link
          to="/rooms"
          className="inline-flex items-center justify-center border-2 border-[#c50355] bg-[#c50355] px-10 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm transition hover:bg-transparent hover:text-[#c50355]"
        >
          {t("hero.book")}
        </Link>
      </div>

      {/* ✅ HINZUGEFÜGT: "Mehr Entdecken" Button wie in Wellness */}
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
            if (progress < 1) requestAnimationFrame(scrollStep)
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
        <span className="text-sm uppercase tracking-widest mb-2">
          Mehr Entdecken
        </span>

        <svg
          className="w-9 h-9 animate-bounce"
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
      {/* ✅ Ende Button */}
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
            <div className="shadow-[0_30px_80px_rgba(15,23,42,0.18)] overflow-hidden h-[19rem] sm:h-[21rem] md:h-[23rem] lg:h-[28rem] w-full md:w-[75%]">
              <img
                src={active.image}
                alt="Hotel Impression"
                className="h-full w-full object-cover"
              />
            </div>

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

            <span className="flex h-10 min-w-[3.2rem] items-center justify-center text-[13px] tracking-[0.3em] uppercase text-slate-600">
              {currentSlide + 1} / {HOTEL_SLIDES.length}
            </span>

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
      <section id="moving-mountains" className="relative z-20 bg-[#f7eee5] py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative mx-auto max-w-5xl shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
            <img
              src={b1}
              alt="Moving Mountains – Winter in den Bergen"
              className="block h-[650px] w-full object-cover"
            />

            <div
  className="
    absolute left-[-8%] top-[-10%]
    w-[80%] h-[80%] md:h-[55%] max-w-[740px]
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

      {/* ====== CARLTON-STYLE SEKTION 1 (d1) ====== */}
      <section id="whats-on" className="relative z-20 bg-[#f7efe7] py-14">
        <div className="mx-auto max-w-6xl px-4">
          {/* Header mit Linien (nur hier) */}
          <div className="mb-24 flex items-center justify-center gap-8">
            <span className="h-px w-32 bg-[#d9c9bb]" />
            <h2 className="font-serif text-2xl tracking-wide text-[#b08b6c]">
              Aktuelles
            </h2>
            <span className="h-px w-32 bg-[#d9c9bb]" />
          </div>

          <div className="relative mx-auto max-w-5xl">
            {/* Bild rechts */}
            <div className="w-full md:ml-auto md:w-[82%] shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
              <img
                src={d1}
                alt="Aktuelles – Winter"
                className="block h-[340px] sm:h-[460px] md:h-[560px] w-full object-cover"
              />
            </div>

            {/* Desktop Overlay (nur ab md, damit Mobile nicht kaputt geht) */}
            <div
              className="
                hidden md:block
                absolute left-[-4%] top-[11%] 
                w-[72%] max-w-[580px] h-[80%]  
                bg-white/90
                px-14 py-12
                shadow-[0_18px_50px_rgba(15,23,42,0.12)]
              "
            >
              <div className="mb-6">
                <div className="h-px w-16 bg-slate-300/70" />
                <p className="mt-4 text-[11px] tracking-[0.35em] uppercase text-slate-400">
                  MOA HOTEL
                </p>
              </div>

              <h3 className="font-serif text-4xl leading-[1.05] text-slate-900">
                {winterTitle}
              </h3>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-700">
                {winterTextLong}
              </p>

              <div className="mt-10">
                <Link
                  to="/restaurant"
                  className="
                    inline-flex items-center justify-center
                    border border-[#c50355]
                    px-14 py-4
                    text-xs sm:text-sm font-semibold uppercase tracking-[0.25em]
                    text-[#c50355]
                    transition hover:bg-[#c50355] hover:text-white
                  "
                >
                  Zum Restaurant
                </Link>
              </div>
            </div>

            {/* Mobile Box unter Bild */}
            <div className="mt-6 block bg-white/90 px-7 py-8 shadow-[0_30px_70px_rgba(15,23,42,0.18)] md:hidden">
              <p className="text-[11px] tracking-[0.35em] uppercase text-slate-400">
                MOA HOTEL
              </p>
              <h3 className="mt-3 font-serif text-3xl text-slate-900">
                {winterTitle}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                {winterTextShort}
              </p>
              <Link
                to="/restaurant"
                className="mt-6 inline-flex items-center justify-center border border-[#c50355] px-12 py-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#c50355] transition hover:bg-[#c50355] hover:text-white"
              >
                Zum Restaurant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CARLTON-STYLE SEKTION 2 (d2) – REVERSE ====== */}
      <section id="section-2" className="relative z-20 bg-[#f7efe7] py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative mx-auto max-w-5xl">
            {/* Bild links */}
            <div className="w-full md:mr-auto md:w-[82%] shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
              <img
                src={d2}
                alt="Winter Highlight"
                className="block h-[340px] sm:h-[460px] md:h-[560px] w-full object-cover"
              />
            </div>

            {/* Desktop Overlay rechts */}
            <div
              className="
                hidden md:block
                absolute right-[-4%] top-[6%]
                w-[72%] max-w-[580px] h-[80%] 
                bg-white/90
                px-14 py-12
                shadow-[0_18px_50px_rgba(15,23,42,0.12)]
              "
            >
              <div className="mb-6">
                <div className="h-px w-16 bg-slate-300/70" />
                <p className="mt-4 text-[11px] tracking-[0.35em] uppercase text-slate-400">
                  MOA HOTEL
                </p>
              </div>

              <h3 className="font-serif text-4xl leading-[1.05] text-slate-900">
                {winterTitle}
              </h3>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-700">
                {winterTextLong}
              </p>

              <div className="mt-10">
                <Link
                  to="/restaurant"
                  className="
                    inline-flex items-center justify-center
                    border border-[#c50355]
                    px-14 py-4
                    text-xs sm:text-sm font-semibold uppercase tracking-[0.25em]
                    text-[#c50355]
                    transition hover:bg-[#c50355] hover:text-white
                  "
                >
                  Zum Restaurant
                </Link>
              </div>
            </div>

            {/* Mobile Box unter Bild */}
            <div className="mt-6 block bg-white/90 px-7 py-8 shadow-[0_30px_70px_rgba(15,23,42,0.18)] md:hidden">
              <p className="text-[11px] tracking-[0.35em] uppercase text-slate-400">
                MOA HOTEL
              </p>
              <h3 className="mt-3 font-serif text-3xl text-slate-900">
                {winterTitle}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                {winterTextShort}
              </p>
              <Link
                to="/restaurant"
                className="mt-6 inline-flex items-center justify-center border border-[#c50355] px-12 py-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#c50355] transition hover:bg-[#c50355] hover:text-white"
              >
                Zum Restaurant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CARLTON-STYLE SEKTION 3 (d3) – OHNE HEADER ====== */}
      <section id="section-3" className="relative z-20 bg-[#f7efe7] py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative mx-auto max-w-5xl">
            {/* Bild rechts */}
            <div className="w-full md:ml-auto md:w-[82%] shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
              <img
                src={d3}
                alt="Winter Highlight"
                className="block h-[340px] sm:h-[460px] md:h-[560px] w-full object-cover"
              />
            </div>

            {/* Desktop Overlay links */}
            <div
              className="
                hidden md:block
                absolute left-[-4%] top-[11%] 
                w-[72%] max-w-[580px] h-[80%]  
                bg-white/90
                px-14 py-12
                shadow-[0_18px_50px_rgba(15,23,42,0.12)]
              "
            >
              <div className="mb-6">
                <div className="h-px w-16 bg-slate-300/70" />
                <p className="mt-4 text-[11px] tracking-[0.35em] uppercase text-slate-400">
                  MOA HOTEL
                </p>
              </div>

              <h3 className="font-serif text-4xl leading-[1.05] text-slate-900">
                {winterTitle}
              </h3>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-700">
                {winterTextLong}
              </p>

              <div className="mt-10">
                <Link
                  to="/restaurant"
                  className="
                    inline-flex items-center justify-center
                    border border-[#c50355]
                    px-14 py-4
                    text-xs sm:text-sm font-semibold uppercase tracking-[0.25em]
                    text-[#c50355]
                    transition hover:bg-[#c50355] hover:text-white
                  "
                >
                  Zum Restaurant
                </Link>
              </div>
            </div>

            {/* Mobile Box unter Bild */}
            <div className="mt-6 block bg-white/90 px-7 py-8 shadow-[0_30px_70px_rgba(15,23,42,0.18)] md:hidden">
              <p className="text-[11px] tracking-[0.35em] uppercase text-slate-400">
                MOA HOTEL
              </p>
              <h3 className="mt-3 font-serif text-3xl text-slate-900">
                {winterTitle}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                {winterTextShort}
              </p>
              <Link
                to="/restaurant"
                className="mt-6 inline-flex items-center justify-center border border-[#c50355] px-12 py-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#c50355] transition hover:bg-[#c50355] hover:text-white"
              >
                Zum Restaurant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Boxen  carlton hotel journal*/}
      <div className="mb-24 flex items-center justify-center gap-8">
        <span className="h-px w-32 bg-[#d9c9bb]" />
        <h2 className="font-serif text-2xl tracking-wide text-[#b08b6c]">
          Moa Hotel Journal
        </h2>
        <span className="h-px w-32 bg-[#d9c9bb]" />
      </div>

      <section className="relative z-20 bg-[#f7efe7] pb-28">
        <div className="mx-auto max-w-7xl px-4">
          <div id="journal-top" className="grid gap-x-24 gap-y-20 md:grid-cols-2">

            <div className="space-y-20">
              <article>
                <div className="overflow-hidden shadow-[0_40px_90px_rgba(15,23,42,0.14)]">
                  <img
                    src={g1}
                    alt="Journal Beitrag 1"
                    className="h-[260px] sm:h-[320px] md:h-[360px] w-full object-cover"
                  />
                </div>

                <div className="mt-10">
                  <div className="flex items-center gap-7">
                    <span className="h-px w-20 bg-[#d9c9bb]" />
                    <p className="text-[10px] tracking-[0.35em] uppercase text-slate-500">
                      MOA HOTEL
                    </p>
                  </div>

                  <h3 className="mt-6 font-serif text-3xl leading-snug text-slate-900">
                    Drei Michelin-Keys – Auszeichnung für Exzellenz
                  </h3>

                  <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700">
                    Eine Anerkennung für Service, Atmosphäre und außergewöhnliche
                    Erlebnisse – und ein Ansporn, jeden Tag noch besser zu werden.
                  </p>

                  <div
                    className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
                      isOpen("g1")
                        ? "mt-4 grid-rows-[1fr] opacity-100"
                        : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl text-base leading-relaxed text-slate-700">
                        {JOURNAL_MORE.g1}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleJournal("g1")}
                    className="mt-10 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] hover:opacity-80"
                  >
                    {isOpen("g1") ? "Weniger" : "Lesen"}
                  </button>
                </div>
              </article>

              <article>
                <div className="overflow-hidden shadow-[0_40px_90px_rgba(15,23,42,0.14)]">
                  <img
                    src={g3}
                    alt="Journal Beitrag 3"
                    className="h-[280px] sm:h-[340px] md:h-[390px] w-full object-cover"
                  />
                </div>

                <div className="mt-10">
                  <div className="flex items-center gap-7">
                    <span className="h-px w-20 bg-[#d9c9bb]" />
                    <p className="text-[10px] tracking-[0.35em] uppercase text-slate-500">
                      MOA HOTEL
                    </p>
                  </div>

                  <h3 className="mt-6 font-serif text-3xl leading-snug text-slate-900">
                    Signature Moments: außergewöhnlich – und ganz persönlich
                  </h3>

                  <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700">
                    Private Winter-Erlebnisse, Concierge-Service und kleine
                    Details, die aus einem Aufenthalt eine Erinnerung machen.
                  </p>

                  <div
                    className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
                      isOpen("g3")
                        ? "mt-4 grid-rows-[1fr] opacity-100"
                        : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl text-base leading-relaxed text-slate-700">
                        {JOURNAL_MORE.g3}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleJournal("g3")}
                    className="mt-10 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] hover:opacity-80"
                  >
                    {isOpen("g3") ? "Weniger" : "Lesen"}
                  </button>
                </div>
              </article>
            </div>

            <div className="space-y-20 md:mt-28 md:pl-8">
              <article>
                <div className="overflow-hidden shadow-[0_40px_90px_rgba(15,23,42,0.14)]">
                  <img
                    src={g2}
                    alt="Journal Beitrag 2"
                    className="h-[300px] sm:h-[360px] md:h-[420px] w-full object-cover"
                  />
                </div>

                <div className="mt-10">
                  <div className="flex items-center gap-7">
                    <span className="h-px w-20 bg-[#d9c9bb]" />
                    <p className="text-[10px] tracking-[0.35em] uppercase text-slate-500">
                      MOA HOTEL
                    </p>
                  </div>

                  <h3 className="mt-6 font-serif text-3xl leading-snug text-slate-900">
                    Unter den Besten: ein Hotel für besondere Ansprüche
                  </h3>

                  <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700">
                    Architektur, Lage und Kulinarik treffen auf Ruhe, Wärme und
                    erstklassigen Service – mitten in den Bergen.
                  </p>

                  <div
                    className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
                      isOpen("g2")
                        ? "mt-4 grid-rows-[1fr] opacity-100"
                        : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl text-base leading-relaxed text-slate-700">
                        {JOURNAL_MORE.g2}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleJournal("g2")}
                    className="mt-10 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] hover:opacity-80"
                  >
                    {isOpen("g2") ? "Weniger" : "Lesen"}
                  </button>
                </div>
              </article>

              <article>
                <div className="overflow-hidden shadow-[0_40px_90px_rgba(15,23,42,0.14)]">
                  <img
                    src={g4}
                    alt="Journal Beitrag 4"
                    className="h-[260px] sm:h-[320px] md:h-[380px] w-full object-cover"
                  />
                </div>

                <div className="mt-10">
                  <div className="flex items-center gap-7">
                    <span className="h-px w-20 bg-[#d9c9bb]" />
                    <p className="text-[10px] tracking-[0.35em] uppercase text-slate-500">
                      MOA HOTEL
                    </p>
                  </div>

                  <h3 className="mt-6 font-serif text-3xl leading-snug text-slate-900">
                    Spa & Wellness: Entspannung auf einem neuen Niveau
                  </h3>

                  <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700">
                    Pool, Ruhezonen und Treatments – gestaltet für Regeneration,
                    Stille und neue Energie nach einem Wintertag.
                  </p>

                  <div
                    className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
                      isOpen("g4")
                        ? "mt-4 grid-rows-[1fr] opacity-100"
                        : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl text-base leading-relaxed text-slate-700">
                        {JOURNAL_MORE.g4}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleJournal("g4")}
                    className="mt-10 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] hover:opacity-80"
                  >
                    {isOpen("g4") ? "Weniger" : "Lesen"}
                  </button>
                </div>
              </article>
            </div>
          </div>

          {/* ====== 2 zusätzliche Journal-Karten (e1/e2) ====== */}
          {showMoreJournal && (
  <div
    id="more-journal"
    className={`
      mt-20 overflow-hidden
      transition-[max-height,opacity,transform] duration-500 ease-out
      ${
        animateMoreJournal
          ? "max-h-[2200px] opacity-100 translate-y-0"
          : "max-h-0 opacity-0 -translate-y-2"
      }
    `}
  >
    <div className="grid gap-x-24 gap-y-20 md:grid-cols-2">
      {/* ===== Artikel e1 ===== */}
      <article>
        <div className="overflow-hidden shadow-[0_40px_90px_rgba(15,23,42,0.14)]">
          <img
            src={e1}
            alt="Journal Beitrag 5"
            className="h-[300px] sm:h-[360px] md:h-[420px] w-full object-cover"
          />
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-7">
            <span className="h-px w-20 bg-[#d9c9bb]" />
            <p className="text-[10px] tracking-[0.35em] uppercase text-slate-500">
              REST
            </p>
          </div>

          <h3 className="mt-6 font-serif text-3xl leading-snug text-slate-900">
            Die Hidden Places von St. Moritz
          </h3>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700">
            St. Moritz ist mit seinem belebten Dorfkern und den berühmten Pisten
            eine weltweit beliebte Reisedestination. Auch abseits der
            touristischen Hotspots bietet die Region inspirierende Orte.
          </p>

          <div
            className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
              isOpen("e1")
                ? "mt-4 grid-rows-[1fr] opacity-100"
                : "mt-0 grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="max-w-xl text-base leading-relaxed text-slate-700">
                {JOURNAL_MORE.e1}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => toggleJournal("e1")}
            className="mt-10 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] hover:opacity-80"
          >
            {isOpen("e1") ? "Weniger" : "Lesen"}
          </button>
        </div>
      </article>

      {/* ===== Artikel e2 ===== */}
      <article className="md:mt-28 md:pl-8">
        <div className="overflow-hidden shadow-[0_40px_90px_rgba(15,23,42,0.14)]">
          <img
            src={e2}
            alt="Journal Beitrag 6"
            className="h-[260px] sm:h-[320px] md:h-[380px] w-full object-cover"
          />
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-7">
            <span className="h-px w-20 bg-[#d9c9bb]" />
            <p className="text-[10px] tracking-[0.35em] uppercase text-slate-500">
              CARLTON HOTEL
            </p>
          </div>

          <h3 className="mt-6 font-serif text-3xl leading-snug text-slate-900">
            Inspiration aus der Natur: Das Grand Restaurant
          </h3>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700">
            Das Grand Restaurant ist eine Hommage an die Natur und die
            kulinarischen Köstlichkeiten des Engadins. Regionale Produkte, feine
            Aromen und ruhige Eleganz prägen den Abend.
          </p>

          <div
            className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
              isOpen("e2")
                ? "mt-4 grid-rows-[1fr] opacity-100"
                : "mt-0 grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="max-w-xl text-base leading-relaxed text-slate-700">
                {JOURNAL_MORE.e2}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => toggleJournal("e2")}
            className="mt-10 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] hover:opacity-80"
          >
            {isOpen("e2") ? "Weniger" : "Lesen"}
          </button>
        </div>
      </article>
    </div>
  </div>
)}


          <div className="mt-24 flex justify-center">
            <button
              type="button"
              onClick={toggleMoreJournal}
              className="border border-[#c50355] px-14 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] transition hover:bg-[#c50355] hover:text-white"
            >
              {showMoreJournal ? "Weniger anzeigen" : "Mehr anzeigen"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
