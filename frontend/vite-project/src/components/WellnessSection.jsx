import React from 'react'
import { useState } from 'react'

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
        className={`flex items-start justify-center ${isEven ? 'flex-row-reverse' : ''}`}
      >
        {/* Bild */}
        <div className="w-7/12">
          <img
            src={image}
            alt={title}
            className="w-full h-[720px] object-cover shadow-[0_30px_80px_rgba(0,0,0,0.18)]"
          />
        </div>

        {/* Textbox */}
        <div
          className={`
            bg-white/90 backdrop-blur-[3px]
            shadow-lg
            h-[620px]
            p-14
            w-[480px]
            mt-12
            relative
            z-10
            ${isEven ? '-mr-10' : '-ml-10'}
          `}
        >
          {/* Tag */}
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-px bg-[#b38b4d]" />
            <p className="text-sm tracking-widest uppercase text-gray-500">
              {tag}
            </p>
          </div>

          {/* Titel */}
          <h2 className="text-3xl font-bold  text-slate-900 tracking-wide mb-4">
            {title}
          </h2>

          {/* Beschreibung */}
          <p className="text-l font-semibold text-slate-700 mb-4">
            {description}
          </p>

          {/* Details */}
          <div className="space-y-4 text-sm text-slate-700 mb-12">
            {details.map((item, i) => (
              <div
                key={i}
                className="flex justify-between border-b border-gray-200 pb-3"
              >
                <span className="font-medium">{item.label}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Button → Dropdown Öffnungszeiten */}
        <div className="relative mt-6">
  <button
    onClick={() => setOpen(!open)}
    className="
      w-full flex justify-between items-center
      border border-[#c50355]
      px-12 py-3
      text-xs sm:text-sm font-semibold uppercase tracking-[0.25em]
      text-[#c50355]
      hover:bg-[#c50355]
      hover:text-white
      transition
    "
  >
    {open ? ' Infos ausblenden' : 'Mehr Infos anzeigen'}
    <span className={`transform transition-transform ${open ? 'rotate-180' : 'rotate-0'}`}>
      ▼
    </span>
  </button>

  {open && (
    <div className="mt-2 border border-gray-200 rounded p-4 space-y-3 bg-white">
      <div className="flex justify-between text-slate-700">
        <span className="font-medium">Beste Besuchszeit</span>
        <span className='text-right'>07:00 – 10:00 Uhr oder ab 18:00 Uhr</span>
      </div>
      <div className="flex justify-between text-slate-700">
        <span className="font-medium">Handtücher & Ausstattung</span>
        <span className='text-right'>Inklusive Bademantel & Slipper</span>
      </div>
      <div className="flex justify-between text-slate-700">
        <span className="font-medium">Privat-Spa</span>
        <span>Auf Anfrage buchbar</span>
      </div>
      <div className="flex justify-between text-slate-700">
        <span className="font-medium">Kinder</span>
        <span className='text-right'>Ab 12 Jahren erlaubt</span>
      </div>
    </div>
  )}
</div>
        </div>
      </div>
    </section>
  )
}
