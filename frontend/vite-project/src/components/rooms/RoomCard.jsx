// src/components/rooms/RoomCard.jsx

export default function RoomCard({ room }) {
  return (
    <article className="relative">
      {/* ================= BILDBEREICH ================= */}
      {/* Großes Bild ohne abgerundete Ecken */}
      <div className="w-full">
        <img
          src={room.image}
          alt={room.name}
          className="h-[420px] w-full object-cover"
        />
      </div>

      {/* ================= TEXTBLOCK ================= */}
      {/* Text liegt auf halbtransparentem Weiß
          und überlappt das Bild leicht (Carlton-Stil) */}
      <div
        className="
          relative
          -mt-20
          mx-6
          bg-white/90
          px-8 py-6
          shadow-sm
        "
      >
        {/* Titel + Größe */}
        <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-3">
          {room.name}
          {room.size && (
            <span className="ml-2 font-normal text-neutral-600">
              {room.size}
            </span>
          )}
        </h3>

        {/* Beschreibung */}
        <p className="text-sm text-neutral-600 leading-relaxed mb-6">
          {room.shortDescription}
        </p>

        {/* ================= ACTIONS ================= */}
        <div className="flex items-center justify-between">
          {/* Mehr entdecken – dezenter Textlink */}
          <button className="text-sm text-neutral-700 underline underline-offset-4 hover:text-neutral-900 transition">
            Mehr entdecken
          </button>

          {/* Buchen – roter Rahmen, rechteckig */}
          <button
            className="
              border border-[#c52b58]
              px-6 py-2
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[#c52b58]
              transition
              hover:bg-[#c52b58]
              hover:text-white
            "
          >
            Buchen
          </button>
        </div>
      </div>
    </article>
  )
}
