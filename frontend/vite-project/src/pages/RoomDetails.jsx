// src/pages/RoomDetails.jsx
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BookingForm from "../components/bookings/BookingForm";
import { rooms } from "../data/rooms";

// ✅ Background Image
import HEROO from "../assets/images/buchen/heroo.jpg";

export default function RoomDetails() {
  const { id } = useParams();
  const { t } = useTranslation("rooms");

  const room = useMemo(() => {
    const key = String(id || "");
    return rooms.find((r) => String(r.id) === key || String(r._id) === key) || null;
  }, [id]);

  if (!room) {
    return (
      <main className="relative min-h-screen pt-36 pb-20">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HEROO})` }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="rounded-2xl border border-white/20 bg-white/85 p-6 text-slate-700 shadow-lg backdrop-blur-md">
            {t("notFound")}
          </div>
        </div>
      </main>
    );
  }

  const roomId = room.id || room._id;

  return (
    <main className="relative min-h-screen pt-48 md:pt-64 lg:pt-72 pb-20">

      {/* ✅ Full Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HEROO})` }}
      />
      {/* ✅ Overlay for readability */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* LEFT CARD */}
          <div className="lg:col-span-2 rounded-2xl border border-white/20 bg-white/85 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.20)] backdrop-blur-md">
            <h1 className="text-xl font-semibold text-slate-900">
              {room.title || room.name || t("defaultTitle")}
            </h1>

            {room.subtitle && <p className="mt-2 text-slate-700">{room.subtitle}</p>}

            {room.description && (
              <p className="mt-6 text-slate-800 leading-relaxed">{room.description}</p>
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

          {/* RIGHT: Booking form wrapper card */}
          <div className="lg:col-span-1  rounded-2xl border border-white/20 bg-white/85 p-6 shadow-lg backdrop-blur-md">
            <BookingForm roomId={roomId} />
          </div>
        </div>
      </div>
    </main>
  );
}
