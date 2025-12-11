// src/components/rooms/RoomCard.jsx

export default function RoomCard({ room }) {
  return (
    <article className="flex flex-col items-center text-center">
      {/* Bildbereich wie beim Carlton: großes Bild, viel Luft */}
      <div className="w-full overflow-hidden rounded-3xl shadow-lg">
        <img
          src={room.image}
          alt={room.name}
          className="h-[320px] w-full object-cover"
        />
      </div>

      {/* Textbereich */}
      <div className="mt-8 max-w-md mx-auto space-y-4">
        {/* Titel + Größe */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold">
            {room.name}{' '}
            <span className="font-normal">
              {room.size ? ` ${room.size}` : ''}
            </span>
          </h3>
        </div>

        {/* Beschreibung */}
        <p className="text-sm text-slate-200 leading-relaxed">
          {room.shortDescription}
        </p>

        {/* "Mehr entdecken" ähnlich Textlink */}
        <div className="mt-2">
          <button className="text-sm font-medium text-amber-300 underline underline-offset-4 hover:text-amber-200">
            Mehr entdecken
          </button>
        </div>

        {/* "Buchen" Button wie beim Carlton (aber in eurem Stil) */}
        <div className="pt-4">
          <button className="inline-flex items-center justify-center rounded-full border border-amber-400 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] hover:bg-amber-400 hover:text-slate-950 transition-colors">
            Buchen
          </button>
        </div>
      </div>
    </article>
  )
}
