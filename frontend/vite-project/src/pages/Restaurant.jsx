import React, { useState } from 'react'

// IMPORT ALL IMAGES (Vite requires this for images inside src/)
import img1 from '../assets/images/img_restaurant/1.jpg'
import img2 from '../assets/images/img_restaurant/2.jpg'
import img3 from '../assets/images/img_restaurant/3.jpg'
import img4 from '../assets/images/img_restaurant/4.jpg'
import img5 from '../assets/images/img_restaurant/5.jpg'
import { motion } from "framer-motion";

export default function Restaurant() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  // REPLACE STATIC PATHS WITH IMPORTED IMAGES
  const items = [
    {
      img: img1,
      subtitle: 'ESSEN UND TRINKEN',
      title: 'MOA Restaurant',
      text: 'Küchenchef Salvatore Frequente aus Sizilien und sein Team kümmern sich um die kulinarischen Belange der Gäste. Dabei haben Sie sich für neue Kreationen Inspiration in der Engadiner Natur geholt. Unterstützt wird das Konzept von der stilvollen Einrichtung des Tessiner Interior Designer Carlo Rampazzi, welcher ebenfalls auf natürliche Materialien und warmes Licht setzt.',
      schedule: [
        { label: 'Frühstück', time: '07.00 – 11.00 Uhr' },
        { label: 'Abendessen', time: '19.00 – 22.00 Uhr' },
      ],
      menus: ['Frühstück', 'À la Carte', 'Kinder-Menü'],
    },
    {
      img: img2,
      subtitle: 'ESSEN UND TRINKEN',
      title: 'MOA Bar und Lounge',
      text: 'Die perfekte Mischung aus Eleganz und Entspannung. Genießen Sie kleine Snacks, Cocktails und atemberaubende Ausblicke. Das Herzstück des Hauses. Geschaffen, um zu bleiben, zu verweilen. Kleine Snacks oder aber den berühmten Carlton Afternoon Tea, beides können Sie hier zelebrieren. Der Blick gleitet dabei durch die imposanten Fenster auf die schneebedeckten Berge.',
      schedule: [],
      menus: ['Bar-Menü', 'Tea Time', 'Snacks'],
    },
    {
      img: img4,
      subtitle: 'ESSEN UND TRINKEN',
      title: 'MOA Sonnenterrasse',
      text: `Die MOA Sonnenterrasse bietet ein unvergleichliches Ambiente, um den Tag entspannt zu genießen. Gäste können hier zum Aperitivo oder Lunch verweilen, sich mit Freunden treffen oder einfach die Sonne genießen. Unsere Terrasse ist elegant gestaltet, mit komfortablen Sitzmöglichkeiten, stilvollen Sonnenschirmen und liebevollen Dekorationen, die ein Wohlfühlgefühl erzeugen.

Ob für ein gemütliches Frühstück im Freien, ein leichtes Mittagessen oder einen entspannten Nachmittag bei Cocktails – die MOA Sonnenterrasse lädt dazu ein, die Zeit zu genießen und sich inspirieren zu lassen. 

Die offene Gestaltung der Terrasse schafft ein Gefühl von Freiheit und gleichzeitig Intimität. Gäste können die Ruhe genießen, während sie den Blick über die stilvoll gestaltete Hotelanlage schweifen lassen. `,
      schedule: [{ label: 'Mittagessen', time: '12.00 – 15.00 Uhr' }],
      menus: ['Lunch Menü', 'Aperitivo Karte', 'Getränke'],
    },
    {
      img: img5,
      subtitle: 'ESSEN UND TRINKEN',
      title: 'Fondue Gondeln',
      text: `Käsefondue und Schweizer Winter - gibt es eine treffendere Kombination? Im MOA Hotel kreieren wir daraus ein unverwechselbares Erlebnis mit unseren Fondue-Gondeln für zwei bis vier Personen.

Genießen Sie den authentischen Schweizer Käse, sorgfältig ausgewählt von unseren erfahrenen Köchen, geschmolzen zu einer cremigen, perfekt gewürzten Mischung. Jede Gondel ist stilvoll dekoriert und mit Kerzenlicht sowie kuscheligen Decken ausgestattet, sodass Sie sich warm und behaglich fühlen.

 Dazu servieren wir ausgewählte Weine, frisches Brot und saisonale Beilagen, die das Fondue-Erlebnis abrunden.

Ob für ein romantisches Abendessen oder einen geselligen Abend mit Freunden – unsere Fondue-Gondeln bieten ein einmaliges kulinarisches Abenteuer mitten im Herzen von MOA Hotel.`,
      schedule: [
        { label: 'Mittagessen', time: '12.00 – 15.00 Uhr' },
        { label: 'Abendessen', time: '18.00 – 22.00 Uhr' },
      ],
      menus: ['Fondue Menü', 'Weinkarte', 'Dessert'],
    },
  ]

  return (
    <div className="bg-[#f7efe7] py-32  md:py-16">
      <h1 className="text-center md:text-5xl text-3xl font-light text-[#b2854e] mb-12  md:mt-36 ">
        Geschmackserlebnisse für die Sinne
      </h1>

      <p className="text-center md:text-2xl text-lg font-serif mb-12 max-w-3xl mx-auto px-4 text-gray-500">
        Hochwertigste Zutaten, verarbeitet von Michelin-gekürten Köchen,
        verschmelzen zu kreativen Gerichten. Passend dazu das Ambiente: Edel,
        stilvoll und doch gelassen.
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
            {item.schedule.length > 0 && (
              <>
                <button
                  onClick={() => toggle(i)}
                  className="text-[#c50355] font-semibold uppercase text-sm tracking-wide underline"
                >
                  {openIndex === i ? 'WENIGER' : 'MEHR'}
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
              {' '}
              {/* MENU DROPDOWN */}
              <details className="group w-fit">
                {' '}
                <summary className="inline-flex items-center justify-center border border-[#c50355] bg-white px-9 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] transition hover:bg-[#c50355] hover:text-white">
                  Menü herunterladen
                  <span className="transition group-open:rotate-180">⌄</span>
                </summary>
                <ul className="bg-white shadow-lg rounded-md mt-2 border border-gray-200">
                  {item.menus.map((m, idx) => (
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
  <h2 className="text-2xl font-serif text-center text-slate-800 mb-6">Genussmomente</h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {[img1, img2, img3, img4].map((src, i) => (
      <a key={i} href="/gallery" className="block">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative overflow-hidden rounded-lg shadow-md"
        >
          <img
            src={src}
            className="object-cover h-58 w-full"
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center"
          >
            <span className="text-white text-sm uppercase tracking-wider">
              Galerie ansehen
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
