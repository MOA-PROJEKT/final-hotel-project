// src/components/rooms/IntroSection.jsx
import { useTranslation } from "react-i18next";

export default function IntroSection() {
  const { t } = useTranslation("rooms");

  return (
    <section className="bg-[#f7efe7] py-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-4xl md:text-5xl font-light text-[#b38b4d] tracking-wide mt-0">
          {t("intro.title")}
        </h2>

        <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
          {t("intro.text")}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-x-8 gap-y-4">
          <a
            href="#"
            className="text-sm font-medium text-[#c52b58] underline underline-offset-4 hover:text-[#a52348] transition"
          >
            {t("intro.links.included")}
          </a>

          <a
            href="#"
            className="text-sm font-medium text-[#c52b58] underline underline-offset-4 hover:text-[#a52348] transition"
          >
            {t("intro.links.goodToKnow")}
          </a>

          <a
            href="#"
            className="text-sm font-medium text-[#c52b58] underline underline-offset-4 hover:text-[#a52348] transition"
          >
            {t("intro.links.culinaryCredit")}
          </a>
        </div>
      </div>
    </section>
  );
}
