import heroImage from "../../assets/images/zimmer/hero.webp";
import { useTranslation } from "react-i18next";

export default function RoomsHero() {
  const { t } = useTranslation("rooms");

  const scrollToIntro = () => {
    const el = document.getElementById("rooms-intro");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative h-[70vh] w-full pt-24 overflow-hidden">
      <img
        src={heroImage}
        alt={t("hero.alt")}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-beige/30" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-white text-4xl sm:text-5xl font-semibold tracking-wide mb-4">
          {t("hero.title")}
        </h1>

        <button
          type="button"
          onClick={scrollToIntro}
          className="inline-flex items-center gap-2 mt-4 px-6 py-3 border border-white text-white font-medium uppercase tracking-wider hover:bg-white hover:text-slate-950 transition"
        >
          {t("hero.cta")}
          <svg
            width="26"
            height="14"
            viewBox="0 0 26 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 0.999023L13.0208 13.0198L25.0416 0.999023"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
