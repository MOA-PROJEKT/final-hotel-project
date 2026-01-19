import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function RoomCard({ room }) {
  const { t } = useTranslation("rooms");

  // ✅ Nur für Deluxe Doppelzimmer auf die neue Detailseite
  // ✅ Detailseiten: deluxe-double + deluxe-suite (alles andere bleibt Booking-Route)
const detailRoutes = {
  "deluxe-double": "/rooms/deluxe-doppelzimmer",
  "deluxe-suite": "/zimmer/deluxe-suite",
  "junior-suite-medium": "/zimmer/junior-suite-medium",
  "twin-junior-suite": "/zimmer/twin-junior-suite",
  "junior-suite-large": "/zimmer/junior-suite-large",
  "corner-junior-suite": "/zimmer/corner-junior-suite",
  "grand-suite": "/zimmer/grand-suite",
  "penthouse-suite": "/zimmer/penthouse-suite",

};

const detailsLink = detailRoutes[room.id] ?? `/rooms/${room.id}`;

    


  return (
    <article className="flex flex-col">
      <div className="w-full">
        <img
          src={room.image}
          alt={room.name}
          className="h-[420px] w-full object-cover"
        />
      </div>

      <div className="mt-10 px-4 text-center">
        <h3 className="text-lg sm:text-xl font-semibold text-neutral-700 mb-2">
          {room.name}
        </h3>

        {room.size && (
          <p className="text-sm text-neutral-700 mb-4">{room.size}</p>
        )}

        <p className="mx-auto max-w-md text-sm text-neutral-500 leading-relaxed mb-8">
          {room.shortDescription}
        </p>

        <div className="flex flex-col items-center gap-4">
          {/* ✅ Mehr erfahren -> neue Seite nur für deluxe-double */}
          <Link
            to={detailsLink}
            className="text-sm font-medium text-[#c52b58] underline underline-offset-4 hover:text-[#a52348] transition"
          >
            {t("card.more")}
          </Link>

          {/* ✅ Buchen bleibt wie vorher (eure bestehende Logik) */}
          <Link
            to={`/rooms/${room.id}`}
            className="mt-8 border border-[#c52b58] px-10 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c52b58] transition hover:bg-[#c52b58] hover:text-white"
          >
            {t("card.book")}
          </Link>
        </div>
      </div>
    </article>
  );
}
