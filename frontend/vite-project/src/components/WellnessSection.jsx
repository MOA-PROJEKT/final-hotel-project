import React, { useState } from 'react'

export default function WellnessSection({
  image,
  tag,
  title,
  description,
  details,
  index = 0,
}) {
  const isEven = index % 2 === 1
  const [open, setOpen] = useState(false)

  return (
    <section className="relative my-10">
      <div
        className={`
          flex flex-col md:flex-row items-start justify-center
          ${isEven ? 'md:flex-row-reverse' : ''}
        `}
      >
        {/* Bild */}
        <div className="w-full md:w-7/12">
          <img
            src={image}
            alt={title}
            className="
              w-full object-cover
              h-[320px] sm:h-[420px] md:h-[720px]
              shadow-[0_30px_80px_rgba(0,0,0,0.18)]
            "
          />
        </div>

        {/* Textbox */}
        <div
          className={`
            bg-white/90 backdrop-blur-[3px]
            shadow-lg
            w-full md:w-[480px]
            h-auto md:h-[620px]
            p-6 sm:p-10 md:p-14
            mt-6 md:mt-12
            relative
            z-10
            ${isEven ? 'md:-mr-10' : 'md:-ml-10'}
          `}
        >
          {/* Tag */}
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-px bg-[#b2854e]" />
            <p className="text-sm tracking-widest uppercase text-[#b2854e]">
              {tag}
            </p>
          </div>

          {/* Titel */}
          <h2 className="text-3xl font-bold text-slate-700 tracking-wide mb-4">
            {title}
          </h2>

          {/* Beschreibung */}
          <p className="text-l font-semibold text-slate-600 mb-4">
            {description}
          </p>

          {/* Details */}
          <div className="space-y-4 text-sm text-slate-600 mb-12">
            {details.map((item, i) => (
              <div
                key={i}
                className="
                  border-b border-gray-200 pb-3
                  flex flex-col sm:flex-row sm:justify-between
                  gap-1
                "
              >
                <span className="font-medium">{item.label}</span>
                <span className="sm:text-right break-words">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Button → Dropdown */}
          <div className="relative mt-6">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="
                w-full flex justify-between items-center
                border border-[#c50355]
                px-6 sm:px-12 py-3
                text-xs sm:text-sm font-semibold uppercase tracking-[0.25em]
                text-[#c50355]
                hover:bg-[#c50355]
                hover:text-white
                transition
              "
            >
              {open ? 'Infos ausblenden' : 'Mehr Infos anzeigen'}
              <span
                className={`transform transition-transform ${
                  open ? 'rotate-180' : 'rotate-0'
                }`}
              >
                ▼
              </span>
            </button>

            {open && (
              <div className="mt-2 border border-gray-200 rounded p-4 space-y-3 bg-white">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-slate-700">
                  <span className="font-medium">Beste Besuchszeit</span>
                  <span className="sm:text-right break-words">
                    07:00 – 10:00 Uhr oder ab 18:00 Uhr
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-slate-700">
                  <span className="font-medium">Handtücher & Ausstattung</span>
                  <span className="sm:text-right break-words">
                    Inklusive Bademantel & Slipper
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-slate-700">
                  <span className="font-medium">Privat-Spa</span>
                  <span className="sm:text-right break-words">
                    Auf Anfrage buchbar
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-slate-700">
                  <span className="font-medium">Kinder</span>
                  <span className="sm:text-right break-words">
                    Ab 12 Jahren erlaubt
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
