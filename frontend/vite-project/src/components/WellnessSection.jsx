import React from 'react'

export default function WellnessSection({
  image,
  tag,
  title,
  description,
  details,
  index = 0,
}) {
  const isEven = index % 2 === 1

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
          <h2 className="text-3xl font-bold text-[#c50355] tracking-wide mb-4">{title}</h2>

          {/* Beschreibung */}
          <p className="text-l font-semibold text-neutral-800 mb-4">{description}</p>

          {/* Details */}
          <div className="space-y-4 text-sm text-gray-700 mb-12">
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

          {/* Button */}
          <a
            href="#"
            className="
              inline-block
              border
              border-[#c50355]
              px-12
              py-3
              text-xs sm:text-sm font-semibold uppercase tracking-[0.25em]
              text-[#c50355]
              hover:bg-[#c50355]
              hover:text-white
              transition
            "
          >
            ONLINE BUCHEN
          </a>
        </div>
      </div>
    </section>
  )
}
