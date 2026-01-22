import React, { useState } from 'react'

// IMPORT ALL IMAGES (Vite requires this for images inside src/)
import img1 from '../assets/images/img_restaurant/1.jpg'
import img2 from '../assets/images/img_restaurant/2.jpg'
import img3 from '../assets/images/img_restaurant/3.jpg'
import img4 from '../assets/images/img_restaurant/4.jpg'
import img5 from '../assets/images/img_restaurant/5.jpg'
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Restaurant() {
  const { t, i18n } = useTranslation("restaurant");
  // console.log("LANG:", i18n.language); // optional

  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  // Bilder bleiben im Code, Texte kommen aus i18n
  const images = [img1, img2, img4, img5];

  const items = t("items", { returnObjects: true }).map((item, idx) => ({
    ...item,
    img: images[idx],
  }));

  return (
    <div className="bg-[#f7efe7] py-32  md:py-16">
      <h1 className="text-center md:text-5xl text-3xl font-light text-[#b2854e] mb-12  md:mt-36 ">
        {t("hero.title")}
      </h1>

      <p className="text-center md:text-2xl text-lg font-serif mb-12 max-w-3xl mx-auto px-4 text-gray-500">
        {t("hero.subtitle")}
      </p>

      {items.map((item, i) => (
        <div
          key={i}
          className={`relative max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10 py-16 ${
            i % 2 === 1 ? 'md:flex-row-reverse' : ''
          }`}
        >
          {/* IMAGE */}
          <div className="md:w-1/2 relative">
            <img
              src={item.img}
              alt={item.title}
              className="w-full shadow-lg object-cover max-h-full"
            />
          </div>

          {/* TEXT CARD */}
          <div
            className={`md:w-1/2 bg-white/75 backdrop-blur-sm shadow-xl p-16 md:p-16 md:mt-20 relative z-10 
              ${i % 2 === 0 ? 'md:-ml-20' : 'md:-mr-20'}`}
          >
            <p className="text-gray-500 tracking-wide text-sm font-semibold uppercase mb-2">
              {item.subtitle}
            </p>

            <h2 className="mb-5 text-2xl sm:text-3xl font-semibold leading-snug text-slate-800">
              {item.title}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">{item.text}</p>

            {/* Accordion */}
            {item.schedule?.length > 0 && (
              <>
                <button
                  onClick={() => toggle(i)}
                  className="text-[#c50355] font-semibold uppercase text-sm tracking-wide underline"
                >
                  {openIndex === i ? t("ui.less") : t("ui.more")}
                </button>

                {openIndex === i && (
                  <div className="mt-3 bg-white/60 p-4 rounded-lg shadow-inner">
                    {item.schedule.map((s, idx) => (
                      <div key={idx} className="mb-1">
                        <span className="font-semibold">{s.label}: </span>
                        <span>{s.time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            <div className="mt-6 flex gap-4">
              {/* MENU DROPDOWN */}
              <details className="group w-fit">
                <summary className="inline-flex items-center justify-center border border-[#c50355] bg-white px-9 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] transition hover:bg-[#c50355] hover:text-white">
                  {t("ui.downloadMenu")}
                  <span className="transition group-open:rotate-180">⌄</span>
                </summary>

                <ul className="bg-white shadow-lg rounded-md mt-2 border border-gray-200">
                  {item.menus?.map((m, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </div>
        </div>
      ))}

      {/* GALLERY */}
      <div className="max-w-7xl mx-auto mt-24">
        <h2 className="text-2xl font-serif text-center text-slate-800 mb-6">
          {t("ui.galleryTitle")}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[img1, img2, img3, img4].map((src, i) => (
            <a key={i} href="/gallery" className="block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative overflow-hidden rounded-lg shadow-md"
              >
                <img src={src} className="object-cover h-58 w-full" />

                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center"
                >
                  <span className="text-white text-sm uppercase tracking-wider">
                    {t("ui.viewGallery")}
                  </span>
                </motion.div>
              </motion.div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
