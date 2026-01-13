// src/pages/RoomDetails.jsx
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BookingForm from "../components/bookings/BookingForm";
import { rooms } from "../data/rooms";

export default function RoomDetails() {
  const { id } = useParams();
  const { t } = useTranslation("rooms");

  const room = useMemo(() => {
    const key = String(id || "");
    return rooms.find((r) => String(r.id) === key || String(r._id) === key) || null;
  }, [id]);

  if (!room) {
    return (
      <main className="min-h-screen bg-[#f7f2ec] pt-36 pb-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-700">
            {t("notFound")}
          </div>
        </div>
      </main>
    );
  }

  const roomId = room.id || room._id;

  return (
    <main className="min-h-screen bg-[#f7f2ec] pt-56 pb-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl bg-white/70 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur">
            <h1 className="text-2xl font-semibold text-slate-900">
              {room.title || room.name || t("defaultTitle")}
            </h1>

            {room.subtitle && <p className="mt-2 text-slate-600">{room.subtitle}</p>}

            {room.description && (
              <p className="mt-6 text-slate-700 leading-relaxed">{room.description}</p>
            )}

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="text-sm text-slate-500">{t("labels.price")}</div>
                <div className="mt-2 text-lg font-semibold text-slate-900">
                  {room.price ? `${room.price} €` : "—"}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="text-sm text-slate-500">{t("labels.maxGuests")}</div>
                <div className="mt-2 text-lg font-semibold text-slate-900">
                  {room.maxGuests || room.max || "—"}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="text-sm text-slate-500">{t("labels.category")}</div>
                <div className="mt-2 text-lg font-semibold text-slate-900">
                  {room.category || "—"}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <BookingForm roomId={roomId} />
          </div>
        </div>
      </div>
    </main>
  );
}
