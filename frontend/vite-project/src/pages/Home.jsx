// src/pages/Home.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ImageCaroussel from "../components/ImageCaroussel.jsx";
import { useTranslation } from "react-i18next";

import b1 from "../assets/images/hotel/b1.jpg";

import n1 from "../assets/images/hotel/n1.jpg";
import n2 from "../assets/images/hotel/n2.jpg";
import n3 from "../assets/images/hotel/n3.jpg";
import n4 from "../assets/images/hotel/n4.jpg";
import n5 from "../assets/images/hotel/n5.jpg";
import n6 from "../assets/images/hotel/n6.jpg";

import HERO from "../assets/images/hotel/HERO.jpg";

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

const CAROUSEL_IMAGES = [c1, c2, c3, c4, c5, c6];

export default function Home() {
  const { t } = useTranslation("home");

  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ Slides: NUR Keys + Images (keine Texte hardcoded)
  const HOTEL_SLIDES = useMemo(
    () => [
      {
        id: 4,
        titleKey: "hotelSlides.4.title",
        kickerKey: "hotelSlides.kicker",
        text1Key: "hotelSlides.4.text1",
        image: n4,
      },
      {
        id: 2,
        titleKey: "hotelSlides.2.title",
        kickerKey: "hotelSlides.kicker",
        text1Key: "hotelSlides.2.text1",
        image: n2,
      },
      {
        id: 3,
        titleKey: "hotelSlides.3.title",
        kickerKey: "hotelSlides.kicker",
        text1Key: "hotelSlides.3.text1",
        image: n3,
      },
      {
        id: 1,
        titleKey: "hotelSlides.1.title",
        kickerKey: "hotelSlides.kicker",
        text1Key: "hotelSlides.1.text1",
        text2Key: "hotelSlides.1.text2",
        image: n1,
      },
      {
        id: 5,
        titleKey: "hotelSlides.5.title",
        kickerKey: "hotelSlides.kicker",
        text1Key: "hotelSlides.5.text1",
        image: n5,
      },
      {
        id: 6,
        titleKey: "hotelSlides.6.title",
        kickerKey: "hotelSlides.kicker",
        text1Key: "hotelSlides.6.text1",
        image: n6,
      },
    ],
    []
  );

  const active = HOTEL_SLIDES[currentSlide];

  const goPrev = () =>
    setCurrentSlide((prev) => (prev === 0 ? HOTEL_SLIDES.length - 1 : prev - 1));

  const goNext = () =>
    setCurrentSlide((prev) => (prev === HOTEL_SLIDES.length - 1 ? 0 : prev + 1));

  // Automatisches Weiterblättern alle 7 Sekunden
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev === HOTEL_SLIDES.length - 1 ? 0 : prev + 1));
    }, 7000);

    return () => clearInterval(intervalId);
  }, [HOTEL_SLIDES.length]);

  // ===== Journal "Lesen" Toggle (Accordion) =====
  const [openJournal, setOpenJournal] = useState(null);
  const toggleJournal = (id) => setOpenJournal((prev) => (prev === id ? null : id));
  const isOpen = (id) => openJournal === id;

  // ===== "Mehr anzeigen" (2 zusätzliche Journal-Karten) =====
  const [showMoreJournal, setShowMoreJournal] = useState(false);
  const [animateMoreJournal, setAnimateMoreJournal] = useState(false);

  const toggleMoreJournal = () => {
    // ✅ Öffnen
    if (!showMoreJournal) {
      setShowMoreJournal(true);

      setTimeout(() => {
        setAnimateMoreJournal(true);

        setTimeout(() => {
          const el = document.getElementById("more-journal");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }, 10);

      return;
    }

    // ✅ Schließen
    const topEl = document.getElementById("journal-top");
    if (topEl) topEl.scrollIntoView({ behavior: "smooth", block: "start" });

    setAnimateMoreJournal(false);
    setTimeout(() => setShowMoreJournal(false), 550);
  };

  return (
    <main className="bg-[#f7efe7] text-slate-900">
      {/* HERO – großes Startbild */}
      <section id="hero" className="relative min-h-[100vh] overflow-hidden">
        {/* ✅ Hero Bild statt Video */}
        <img
          src={HERO}
          alt={t("hero.altHeroImage")}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-slate-900/35" />

        <div className="relative z-10 flex min-h-[90vh] items-center justify-center">
          <div className="mx-auto pt-16 max-w-3xl px-4 text-center text-white">
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">{t("hero.title")}</h1>

            <div className="mt-10 flex justify-center">
              <Link
                to="/rooms"
                className="inline-flex items-center justify-center border-2 border-[#c50355] bg-[#c50355] px-10 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm transition hover:bg-transparent hover:text-[#c50355]"
              >
                {t("hero.book")}
              </Link>
            </div>

            {/* ✅ "Mehr Entdecken" Button */}
            <button
              onClick={() => {
                const scrollDuration = 1500;
                const targetScroll = window.innerHeight;
                const start = window.scrollY;
                const startTime = performance.now();

                function scrollStep(timestamp) {
                  const elapsed = timestamp - startTime;
                  const progress = Math.min(elapsed / scrollDuration, 1);
                  const ease =
                    progress < 0.5
                      ? 2 * progress * progress
                      : -1 + (4 - 2 * progress) * progress;

                  window.scrollTo(0, start + targetScroll * ease);
                  if (progress < 1) requestAnimationFrame(scrollStep);
                }

                requestAnimationFrame(scrollStep);
              }}
              aria-label={t("hero.scrollDownLabel")}
              className="
                absolute bottom-[-6rem] left-1/2 -translate-x-1/2
                flex flex-col items-center
                text-white hover:text-[#c50355] opacity-80 hover:opacity-100 transition
              "
            >
              <span className="text-sm uppercase tracking-widest mb-2">{t("hero.discoverMore")}</span>

              <svg
                className="w-9 h-9 animate-bounce"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* HOTEL – wie Carlton: Bild links, halbtransparente Box rechts */}
      <section id="hotel" className="relative z-20 bg-[#f7efe7] py-28">
        <div className="mx-auto max-w-7xl px-4">
          {/* Wintersaison-Intro */}
          <div className="mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900">
              {t("seasonIntro.title")}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-700 max-w-2xl mx-auto">
              {t("seasonIntro.text")}
            </p>
          </div>

          {/* Bild + Card */}
          <div className="relative mx-auto max-w-6xl pt-10">
            <div className="shadow-[0_30px_80px_rgba(15,23,42,0.18)] overflow-hidden h-[19rem] sm:h-[21rem] md:h-[23rem] lg:h-[28rem] w-full md:w-[75%]">
              <img src={active.image} alt={t("hotel.altImpression")} className="h-full w-full object-cover" />
            </div>

            <div className="mt-8 md:mt-4 md:absolute md:right-[6%] md:top-[-20px] md:w-[52%] lg:w-[52%]">
              <div className="bg-white/50 backdrop-blur-[2px] px-8 py-9 sm:px-10 sm:py-11 shadow-[0_30px_80px_rgba(15,23,42,0.18)] md:h-[19rem] lg:h-[25rem] flex flex-col">
                <div className="mb-6">
                  <p className="text-[11px] tracking-[0.35em] uppercase text-slate-400">
                    {t(active.kickerKey)}
                  </p>
                  <div className="mt-4 h-px w-16 bg-slate-300" />
                </div>

                <div className="max-w-md">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 whitespace-pre-line">
                    {t(active.titleKey)}
                  </h3>

                  {active.text1Key && (
                    <p className="mt-4 text-sm sm:text-base text-slate-700">{t(active.text1Key)}</p>
                  )}

                  {active.text2Key && (
                    <p className="mt-2 text-sm sm:text-base text-slate-700">{t(active.text2Key)}</p>
                  )}
                </div>

                <div className="mt-auto pt-6">
                  <Link
                    to="/restaurant"
                    className="inline-flex items-center justify-center border-2 border-[#c50355] bg-transparent px-10 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] hover:bg-[#c50355] hover:text-white transition"
                  >
                    {t("buttons.learnMore")}
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
              aria-label={t("hotel.prev")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e4d1c2] bg-white text-[#c50355] shadow-[0_8px_20px_rgba(15,23,42,0.18)] transition-colors hover:bg-[#c50355] hover:border-[#c50355] hover:text-white"
            >
              <span className="relative -top-[3px] text-2xl leading-none">&#8592;</span>
            </button>

            <span className="flex h-10 min-w-[3.2rem] items-center justify-center text-[13px] tracking-[0.3em] uppercase text-slate-600">
              {t("hotel.slideCounter", { current: currentSlide + 1, total: HOTEL_SLIDES.length })}
            </span>

            <button
              type="button"
              onClick={goNext}
              aria-label={t("hotel.next")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e4d1c2] bg-white text-[#c50355] shadow-[0_8px_20px_rgba(15,23,42,0.18)] transition-colors hover:bg-[#c50355] hover:border-[#c50355] hover:text-white"
            >
              <span className="relative -top-[3px] text-2xl leading-none">&#8594;</span>
            </button>
          </div>
        </div>
      </section>

      {/* MOVING MOUNTAINS */}
      <section id="moving-mountains" className="relative z-20 bg-[#f7eee5] py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative mx-auto max-w-5xl shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
            <img src={b1} alt={t("movingMountains.alt")} className="block h-[650px] w-full object-cover" />

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
                {t("movingMountains.kicker")}
              </p>

              <h2 className="mb-5 text-2xl sm:text-3xl font-semibold leading-snug text-slate-900">
                {t("movingMountains.title")}
              </h2>

              <p className="mb-6 text-sm sm:text-base leading-relaxed text-slate-700">
                {t("movingMountains.text")}
              </p>

              <button
                type="button"
                className="inline-flex items-center justify-center border border-[#c50355] bg-white px-9 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] transition hover:bg-[#c50355] hover:text-white"
              >
                {t("buttons.discoverMore")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* carousel */}
      <section>
        <ImageCaroussel images={CAROUSEL_IMAGES} />
      </section>

      {/* ====== CARLTON-STYLE SEKTION 1 (d1) ====== */}
      <section id="whats-on" className="relative z-20 bg-[#f7efe7] py-14">
        <div className="mx-auto max-w-6xl px-4">
          {/* Header mit Linien (nur hier) */}
          <div className="mb-24 flex items-center justify-center gap-8">
            <span className="h-px w-32 bg-[#d9c9bb]" />
            <h2 className="font-serif text-2xl tracking-wide text-[#b08b6c]">{t("sections.news")}</h2>
            <span className="h-px w-32 bg-[#d9c9bb]" />
          </div>

          <div className="relative mx-auto max-w-5xl">
            {/* Bild rechts */}
            <div className="w-full md:ml-auto md:w-[82%] shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
              <img src={d1} alt={t("whatsOn.alt")} className="block h-[340px] sm:h-[460px] md:h-[560px] w-full object-cover" />
            </div>

            {/* Desktop Overlay */}
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
                  {t("common.kickerHotel")}
                </p>
              </div>

              <h3 className="font-serif text-4xl leading-[1.05] text-slate-900">{t("winter.title")}</h3>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-700">{t("winter.textLong")}</p>

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
                  {t("buttons.toRestaurant")}
                </Link>
              </div>
            </div>

            {/* Mobile Box */}
            <div className="mt-6 block bg-white/90 px-7 py-8 shadow-[0_30px_70px_rgba(15,23,42,0.18)] md:hidden">
              <p className="text-[11px] tracking-[0.35em] uppercase text-slate-400">{t("common.kickerHotel")}</p>
              <h3 className="mt-3 font-serif text-3xl text-slate-900">{t("winter.title")}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">{t("winter.textShort")}</p>
              <Link
                to="/restaurant"
                className="mt-6 inline-flex items-center justify-center border border-[#c50355] px-12 py-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#c50355] transition hover:bg-[#c50355] hover:text-white"
              >
                {t("buttons.toRestaurant")}
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
              <img src={d2} alt={t("section2.alt")} className="block h-[340px] sm:h-[460px] md:h-[560px] w-full object-cover" />
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
                  {t("common.kickerHotel")}
                </p>
              </div>

              <h3 className="font-serif text-4xl leading-[1.05] text-slate-900">{t("winter.title")}</h3>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-700">{t("winter.textLong")}</p>

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
                  {t("buttons.toRestaurant")}
                </Link>
              </div>
            </div>

            {/* Mobile Box */}
            <div className="mt-6 block bg-white/90 px-7 py-8 shadow-[0_30px_70px_rgba(15,23,42,0.18)] md:hidden">
              <p className="text-[11px] tracking-[0.35em] uppercase text-slate-400">{t("common.kickerHotel")}</p>
              <h3 className="mt-3 font-serif text-3xl text-slate-900">{t("winter.title")}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">{t("winter.textShort")}</p>
              <Link
                to="/restaurant"
                className="mt-6 inline-flex items-center justify-center border border-[#c50355] px-12 py-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#c50355] transition hover:bg-[#c50355] hover:text-white"
              >
                {t("buttons.toRestaurant")}
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
              <img src={d3} alt={t("section3.alt")} className="block h-[340px] sm:h-[460px] md:h-[560px] w-full object-cover" />
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
                  {t("common.kickerHotel")}
                </p>
              </div>

              <h3 className="font-serif text-4xl leading-[1.05] text-slate-900">{t("winter.title")}</h3>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-700">{t("winter.textLong")}</p>

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
                  {t("buttons.toRestaurant")}
                </Link>
              </div>
            </div>

            {/* Mobile Box */}
            <div className="mt-6 block bg-white/90 px-7 py-8 shadow-[0_30px_70px_rgba(15,23,42,0.18)] md:hidden">
              <p className="text-[11px] tracking-[0.35em] uppercase text-slate-400">{t("common.kickerHotel")}</p>
              <h3 className="mt-3 font-serif text-3xl text-slate-900">{t("winter.title")}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">{t("winter.textShort")}</p>
              <Link
                to="/restaurant"
                className="mt-6 inline-flex items-center justify-center border border-[#c50355] px-12 py-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#c50355] transition hover:bg-[#c50355] hover:text-white"
              >
                {t("buttons.toRestaurant")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Journal Header */}
      <div className="mb-24 flex items-center justify-center gap-8">
        <span className="h-px w-32 bg-[#d9c9bb]" />
        <h2 className="font-serif text-2xl tracking-wide text-[#b08b6c]">{t("sections.journal")}</h2>
        <span className="h-px w-32 bg-[#d9c9bb]" />
      </div>

      {/* Journal */}
      <section className="relative z-20 bg-[#f7efe7] pb-28">
        <div className="mx-auto max-w-7xl px-4">
          <div id="journal-top" className="grid gap-x-24 gap-y-20 md:grid-cols-2">
            <div className="space-y-20">
              {/* g1 */}
              <article>
                <div className="overflow-hidden shadow-[0_40px_90px_rgba(15,23,42,0.14)]">
                  <img src={g1} alt={t("journal.g1.alt")} className="h-[260px] sm:h-[320px] md:h-[360px] w-full object-cover" />
                </div>

                <div className="mt-10">
                  <div className="flex items-center gap-7">
                    <span className="h-px w-20 bg-[#d9c9bb]" />
                    <p className="text-[10px] tracking-[0.35em] uppercase text-slate-500">{t("journal.kicker")}</p>
                  </div>

                  <h3 className="mt-6 font-serif text-3xl leading-snug text-slate-900">{t("journal.g1.title")}</h3>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700">{t("journal.g1.intro")}</p>

                  <div
                    className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
                      isOpen("g1") ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl text-base leading-relaxed text-slate-700">{t("journal.g1.more")}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleJournal("g1")}
                    className="mt-10 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] hover:opacity-80"
                  >
                    {isOpen("g1") ? t("buttons.less") : t("buttons.read")}
                  </button>
                </div>
              </article>

              {/* g3 */}
              <article>
                <div className="overflow-hidden shadow-[0_40px_90px_rgba(15,23,42,0.14)]">
                  <img src={g3} alt={t("journal.g3.alt")} className="h-[280px] sm:h-[340px] md:h-[390px] w-full object-cover" />
                </div>

                <div className="mt-10">
                  <div className="flex items-center gap-7">
                    <span className="h-px w-20 bg-[#d9c9bb]" />
                    <p className="text-[10px] tracking-[0.35em] uppercase text-slate-500">{t("journal.kicker")}</p>
                  </div>

                  <h3 className="mt-6 font-serif text-3xl leading-snug text-slate-900">{t("journal.g3.title")}</h3>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700">{t("journal.g3.intro")}</p>

                  <div
                    className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
                      isOpen("g3") ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl text-base leading-relaxed text-slate-700">{t("journal.g3.more")}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleJournal("g3")}
                    className="mt-10 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] hover:opacity-80"
                  >
                    {isOpen("g3") ? t("buttons.less") : t("buttons.read")}
                  </button>
                </div>
              </article>
            </div>

            <div className="space-y-20 md:mt-28 md:pl-8">
              {/* g2 */}
              <article>
                <div className="overflow-hidden shadow-[0_40px_90px_rgba(15,23,42,0.14)]">
                  <img src={g2} alt={t("journal.g2.alt")} className="h-[300px] sm:h-[360px] md:h-[420px] w-full object-cover" />
                </div>

                <div className="mt-10">
                  <div className="flex items-center gap-7">
                    <span className="h-px w-20 bg-[#d9c9bb]" />
                    <p className="text-[10px] tracking-[0.35em] uppercase text-slate-500">{t("journal.kicker")}</p>
                  </div>

                  <h3 className="mt-6 font-serif text-3xl leading-snug text-slate-900">{t("journal.g2.title")}</h3>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700">{t("journal.g2.intro")}</p>

                  <div
                    className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
                      isOpen("g2") ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl text-base leading-relaxed text-slate-700">{t("journal.g2.more")}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleJournal("g2")}
                    className="mt-10 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] hover:opacity-80"
                  >
                    {isOpen("g2") ? t("buttons.less") : t("buttons.read")}
                  </button>
                </div>
              </article>

              {/* g4 */}
              <article>
                <div className="overflow-hidden shadow-[0_40px_90px_rgba(15,23,42,0.14)]">
                  <img src={g4} alt={t("journal.g4.alt")} className="h-[260px] sm:h-[320px] md:h-[380px] w-full object-cover" />
                </div>

                <div className="mt-10">
                  <div className="flex items-center gap-7">
                    <span className="h-px w-20 bg-[#d9c9bb]" />
                    <p className="text-[10px] tracking-[0.35em] uppercase text-slate-500">{t("journal.kicker")}</p>
                  </div>

                  <h3 className="mt-6 font-serif text-3xl leading-snug text-slate-900">{t("journal.g4.title")}</h3>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700">{t("journal.g4.intro")}</p>

                  <div
                    className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
                      isOpen("g4") ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl text-base leading-relaxed text-slate-700">{t("journal.g4.more")}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleJournal("g4")}
                    className="mt-10 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] hover:opacity-80"
                  >
                    {isOpen("g4") ? t("buttons.less") : t("buttons.read")}
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
                {/* e1 */}
                <article>
                  <div className="overflow-hidden shadow-[0_40px_90px_rgba(15,23,42,0.14)]">
                    <img src={e1} alt={t("journal.e1.alt")} className="h-[300px] sm:h-[360px] md:h-[420px] w-full object-cover" />
                  </div>

                  <div className="mt-10">
                    <div className="flex items-center gap-7">
                      <span className="h-px w-20 bg-[#d9c9bb]" />
                      <p className="text-[10px] tracking-[0.35em] uppercase text-slate-500">{t("journal.e1.kicker")}</p>
                    </div>

                    <h3 className="mt-6 font-serif text-3xl leading-snug text-slate-900">{t("journal.e1.title")}</h3>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700">{t("journal.e1.intro")}</p>

                    <div
                      className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
                        isOpen("e1") ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-xl text-base leading-relaxed text-slate-700">{t("journal.e1.more")}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleJournal("e1")}
                      className="mt-10 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] hover:opacity-80"
                    >
                      {isOpen("e1") ? t("buttons.less") : t("buttons.read")}
                    </button>
                  </div>
                </article>

                {/* e2 */}
                <article className="md:mt-28 md:pl-8">
                  <div className="overflow-hidden shadow-[0_40px_90px_rgba(15,23,42,0.14)]">
                    <img src={e2} alt={t("journal.e2.alt")} className="h-[260px] sm:h-[320px] md:h-[380px] w-full object-cover" />
                  </div>

                  <div className="mt-10">
                    <div className="flex items-center gap-7">
                      <span className="h-px w-20 bg-[#d9c9bb]" />
                      <p className="text-[10px] tracking-[0.35em] uppercase text-slate-500">{t("journal.e2.kicker")}</p>
                    </div>

                    <h3 className="mt-6 font-serif text-3xl leading-snug text-slate-900">{t("journal.e2.title")}</h3>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700">{t("journal.e2.intro")}</p>

                    <div
                      className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
                        isOpen("e2") ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-xl text-base leading-relaxed text-slate-700">{t("journal.e2.more")}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleJournal("e2")}
                      className="mt-10 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] hover:opacity-80"
                    >
                      {isOpen("e2") ? t("buttons.less") : t("buttons.read")}
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
              {showMoreJournal ? t("buttons.showLess") : t("buttons.showMore")}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
