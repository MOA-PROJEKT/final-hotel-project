// src/components/rooms/RoomCard.jsx

export default function RoomCard({ room }) {
  return (
    <article className="flex flex-col">
      {/* ================= IMAGE ================= */}
      <div className="w-full">
        <img
          src={room.image}
          alt={room.name}
          className="h-[420px] w-full object-cover"
        />
      </div>

      {/* ================= TEXT ================= */}
      <div className="mt-10 px-4 text-center">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-neutral-700 mb-2">
          {room.name}
        </h3>

        {/* Size */}
        {room.size && (
          <p className="text-sm text-neutral-700 mb-4">{room.size}</p>
        )}

        {/* Description */}
        <p className="mx-auto max-w-md text-sm text-neutral-500 leading-relaxed mb-8">
          {room.shortDescription}
        </p>

        {/* Actions */}
        <div className="flex flex-col items-center gap-4">
          {/* Secondary link */}
          <button className="text-sm font-medium text-[#c50355] underline underline-offset-4 hover:text-[#a52348] transition">
            Mehr entdecken
          </button>

          {/* Primary action */}
          <button className="inline-flex items-center justify-center mt-8 border border-[#c50355] px-9 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] transition hover:bg-[#c50355] hover:text-white">
            Buchen
          </button>
        </div>
      </div>
    </article>
  )
}
