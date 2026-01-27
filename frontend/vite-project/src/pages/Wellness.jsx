// src/pages/Wellness.jsx
import { useTranslation } from "react-i18next";

// Components
import WellnessSection from "../components/WellnessSection.jsx";
import ImageCarousel from "../components/ImageCaroussel.jsx";

// Images – Hero
import Hero from "../assets/images/wellness/Hero.webp";

// Images – Spa
import spaMassage from "../assets/images/wellness/spaMassage.jpg";
import spaSauna from "../assets/images/wellness/spaSauna.jpg";
import spaPool2 from "../assets/images/wellness/yoga1.avif";

// Images – Yoga & Fitness
import yogaSession from "../assets/images/wellness/yogaSession.jpg";
import fitnessGym from "../assets/images/wellness/fitnessGym.jpg";

// Images – Carousel
import yoga1 from "../assets/images/wellness/yoga11.avif";
import yoga2 from "../assets/images/wellness/yoga2.webp";
import yoga3 from "../assets/images/wellness/yoga3.webp";
import yoga4 from "../assets/images/wellness/yoga4.webp";
import yoga5 from "../assets/images/wellness/yoga5.webp";
import yoga6 from "../assets/images/wellness/yoga6.webp";

const carouselImages = [yoga1, yoga2, yoga3, yoga4, yoga5, yoga6];

export default function Wellness() {
  const { t } = useTranslation("wellness");

  const scrollDownSmooth = () => {
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
  };

  return (
    <section className="bg-[#f7efe7] text-[#1b1b1b]">
      {/* ================= HERO ================= */}
      <div id="hero" className="relative min-h-[100vh] overflow-hidden">
        <img
          src={Hero}
          alt={t("hero.alt")}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/35" />

        <div className="relative z-10 flex min-h-[90vh] items-center justify-center">
          <div className="text-center lg:mt-16 max-w-3xl text-white">
            <h1 className="mt-4 text-3xl md:text-6xl font-semibold leading-tight">
              {t("hero.title")}
            </h1>

            <button
              onClick={scrollDownSmooth}
              aria-label={t("hero.scrollDownLabel")}
              className="
                absolute bottom-[-6rem] left-1/2 -translate-x-1/2
                flex flex-col items-center
                text-white hover:text-[#c50355] opacity-80 hover:opacity-100 transition
              "
            >
              <span className="text-sm uppercase tracking-widest mb-2">
                {t("hero.discoverMore")}
              </span>

              <svg
                className="w-9 h-9 animate-bounce"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
          <p className="text-gray-500 text-2xl mt-4 max-w-3xl mx-auto">
            {t("intro.text")}
          </p>
        </div>
      </section>

      {/* ================= SPA SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-12 space-y-16 md:space-y-32">
        <WellnessSection
          index={0}
          image={spaPool2}
          tag={t("spa.pool.tag")}
          title={t("spa.pool.title")}
          description={t("spa.pool.description")}
          details={[
            {
              label: t("spa.pool.details.openingHours"),
              value: t("spa.pool.values.openingHours"),
            },
            {
              label: t("spa.pool.details.temperature"),
              value: t("spa.pool.values.temperature"),
            },
            {
              label: t("spa.pool.details.access"),
              value: t("spa.pool.values.access"),
            },
          ]}
          extraDetails={[
            {
              label: t("spa.pool.extra.bestTime.label"),
              value: t("spa.pool.extra.bestTime.value"),
            },
            {
              label: t("spa.pool.extra.towels.label"),
              value: t("spa.pool.extra.towels.value"),
            },
            {
              label: t("spa.pool.extra.privateSpa.label"),
              value: t("spa.pool.extra.privateSpa.value"),
            },
            {
              label: t("spa.pool.extra.kids.label"),
              value: t("spa.pool.extra.kids.value"),
            },
          ]}
        />

        <WellnessSection
          index={1}
          image={spaSauna}
          tag={t("spa.sauna.tag")}
          title={t("spa.sauna.title")}
          description={t("spa.sauna.description")}
          details={[
            {
              label: t("spa.sauna.details.openingHours"),
              value: t("spa.sauna.values.openingHours"),
            },
            {
              label: t("spa.sauna.details.temperature"),
              value: t("spa.sauna.values.temperature"),
            },
            {
              label: t("spa.sauna.details.restArea"),
              value: t("spa.sauna.values.restArea"),
            },
          ]}
          extraDetails={[
            {
              label: t("spa.sauna.extra.bestTime.label"),
              value: t("spa.sauna.extra.bestTime.value"),
            },
            {
              label: t("spa.sauna.extra.towels.label"),
              value: t("spa.sauna.extra.towels.value"),
            },
            {
              label: t("spa.sauna.extra.privateSpa.label"),
              value: t("spa.sauna.extra.privateSpa.value"),
            },
            {
              label: t("spa.sauna.extra.kids.label"),
              value: t("spa.sauna.extra.kids.value"),
            },
          ]}
        />

        <WellnessSection
          index={2}
          image={spaMassage}
          tag={t("spa.massage.tag")}
          title={t("spa.massage.title")}
          description={t("spa.massage.description")}
          details={[
            {
              label: t("spa.massage.details.treatments"),
              value: t("spa.massage.values.treatments"),
            },
            {
              label: t("spa.massage.details.duration"),
              value: t("spa.massage.values.duration"),
            },
            {
              label: t("spa.massage.details.appointments"),
              value: t("spa.massage.values.appointments"),
            },
          ]}
          extraDetails={[
            {
              label: t("spa.massage.extra.recommendation.label"),
              value: t("spa.massage.extra.recommendation.value"),
            },
            {
              label: t("spa.massage.extra.prep.label"),
              value: t("spa.massage.extra.prep.value"),
            },
            {
              label: t("spa.massage.extra.cancellation.label"),
              value: t("spa.massage.extra.cancellation.value"),
            },
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
          <div className="w-full max-w-7xl px-6">
            <div className="flex flex-col md:flex-row items-center relative justify-center">
              {/* Bild */}
              <div className="w-full md:w-7/12 relative">
                <img
                  src={yogaSession}
                  alt={t("yoga.imageAlt")}
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
                <h2 className="text-4xl font-bold text-[#b2854e] tracking-wide mb-4">
                  {t("yoga.title")}
                </h2>

                <h3 className="text-2xl font-semibold text-slate-700 mb-4">
                  {t("yoga.subtitle")}
                </h3>

                <p className="text-slate-700 leading-relaxed mb-4">
                  {t("yoga.text")}
                </p>

                <ul className="text-slate-700 space-y-2 list-disc list-inside">
                  <li>{t("yoga.list.0")}</li>
                  <li>{t("yoga.list.1")}</li>
                  <li>{t("yoga.list.2")}</li>
                  <li>{t("yoga.list.3")}</li>
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
                  alt={t("fitness.imageAlt")}
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
                <h2 className="text-4xl font-bold text-[#b2854e] tracking-wide mb-4">
                  {t("fitness.title")}
                </h2>

                <h3 className="text-2xl font-semibold text-slate-700 mb-4">
                  {t("fitness.subtitle")}
                </h3>

                <p className="text-slate-700 leading-relaxed mb-4">
                  {t("fitness.text")}
                </p>

                <ul className="text-slate-700 space-y-2 list-disc list-inside">
                  <li>{t("fitness.list.0")}</li>
                  <li>{t("fitness.list.1")}</li>
                  <li>{t("fitness.list.2")}</li>
                  <li>{t("fitness.list.3")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
