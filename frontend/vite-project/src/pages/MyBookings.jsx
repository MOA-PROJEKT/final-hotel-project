import { useEffect, useState } from "react";
import { getRoomName } from "../utils/roomHelpers";
import { useTranslation } from "react-i18next";

// du wolltest die imports so lassen – ok:
import grandCover from "../assets/images/zimmer/deluxe-suite/z1.jpg";
import deluxeCover from "../assets/images/zimmer/deluxe-suite/z2.jpg";
import deluxeDoppelCover from "../assets/images/zimmer/deluxe-suite/z3.jpg";
import juniorMediumCover from "../assets/images/zimmer/deluxe-suite/z4.jpg";
import juniorLargeCover from "../assets/images/zimmer/deluxe-suite/z5.jpg";
import cornerJuniorCover from "../assets/images/zimmer/deluxe-suite/z6.jpg";
import penthouseCover from "../assets/images/zimmer/deluxe-suite/z7.jpg";
import twinJuniorCover from "../assets/images/zimmer/deluxe-suite/z8.jpg";

import fallbackCover from "../assets/images/zimmer/deluxe-suite/z9.jpg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function MyBookings() {
  const { t } = useTranslation("bookings");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  const token = localStorage.getItem("token");

  // ===== Helpers (UI) =====
  const roomCoverById = {
    "grand-suite": grandCover,
    "deluxe-suite": twinJuniorCover,
    "deluxe-doppelzimmer": deluxeDoppelCover,
    "junior-suite-medium": juniorMediumCover,
    "junior-suite-large": juniorLargeCover,
    "corner-junior-suite": cornerJuniorCover,
    "penthouse-suite": penthouseCover,
    "twin-junior-suite": twinJuniorCover,
  };

  const getRoomCover = (roomId) => {
    if (!roomId) return fallbackCover;
    if (typeof roomId === "object" && roomId) {
      // falls Backend populated liefert und z.B. roomId.slug existiert
      const key = roomId.slug || roomId._id || roomId.id;
      return roomCoverById[key] || fallbackCover;
    }
    return roomCoverById[roomId] || fallbackCover;
  };

  const formatDate = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString();
  };

  const shortId = (id) => (id ? `${id.slice(0, 6)}…${id.slice(-4)}` : "-");

  const nightsBetween = (a, b) => {
    const start = new Date(a);
    const end = new Date(b);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "-";
    const days = Math.round((end - start) / (1000 * 60 * 60 * 24));
    return Math.max(1, days);
  };

  const statusConfig = {
    pending: {
      icon: "⏳",
      chip: "bg-black/5 text-black border-black/10",
      descKey: "statusDesc.pending",
    },
    confirmed: {
      icon: "✅",
      chip: "bg-green-50 text-green-700 border-green-200",
      descKey: "statusDesc.confirmed",
    },
    cancelled: {
       icon: "✖",
  chip: "bg-red-50 text-red-700 border-red-200",
  descKey: "statusDesc.cancelled",
    },
    rejected: {
      icon: "⚠",
      chip: "bg-red-50 text-red-700 border-red-200",
      descKey: "statusDesc.rejected",
    },
  };

  const renderRoomLabel = (roomId) => {
    if (typeof roomId === "object" && roomId) {
      return roomId.title || roomId.name || roomId.slug || "-";
    }
    const name = getRoomName(roomId);
    return name || String(roomId || "-");
  };

  // ===== Load bookings =====
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");

      if (!token) {
        setError("Du bist nicht eingeloggt. Bitte zuerst einloggen.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/bookings/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Fehler beim Laden der Buchungen.");
        }

        const data = await res.json();
        // optional: du kannst das später wieder entfernen
        console.log("BOOKING SAMPLE:", data.bookings?.[0]);

        setBookings(Array.isArray(data.bookings) ? data.bookings : []);
      } catch (e) {
        setError(e.message || "Unbekannter Fehler.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  const cancelBooking = async (id) => {
    if (!token) return;

    const ok = window.confirm("Willst du diese Buchung wirklich stornieren?");
    if (!ok) return;

    try {
      setCancellingId(id);

      const res = await fetch(`${API_URL}/bookings/${id}/cancel`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.msg || "Stornieren fehlgeschlagen.");
      }

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "cancelled" } : b))
      );
    } catch (e) {
      alert(e.message || "Unbekannter Fehler.");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-black">Meine Buchungen</h1>
          <p className="mt-2 text-sm text-black/70">
            Hier siehst du alle Buchungen, die mit deinem Account erstellt wurden.
          </p>
        </div>

        {loading && (
          <div className="rounded-xl border border-black/10 bg-white p-6 text-black/80">
            Lädt...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-800">
            {error}
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="rounded-xl border border-black/10 bg-white p-6 text-black/80">
            Keine Buchungen gefunden.
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((b) => {
              const status = b.status || "pending";
              const cfg = statusConfig[status] || statusConfig.pending;

              const checkIn = b.checkIn || b.startDate || b.dates?.start;
              const checkOut = b.checkOut || b.endDate || b.dates?.end;
              const nights = nightsBetween(checkIn, checkOut);

              return (
                <div
                  key={b._id}
                  className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row">
                    {/* LEFT: Thumbnail */}
                    <div className="sm:w-56">
                      <img
                        src={getRoomCover(b.roomId)}
                        alt={renderRoomLabel(b.roomId)}
                        className="h-40 w-full rounded-xl object-cover sm:h-full"
                        loading="lazy"
                      />
                    </div>

                    {/* RIGHT: Content */}
                    <div className="flex-1">
                      {/* Header row */}
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="text-lg font-semibold text-black">
                            {renderRoomLabel(b.roomId)}
                          </div>

                          <div className="mt-1 text-xs text-black/55">
                            Buchung {shortId(b._id)}
                            {Number.isFinite(nights) ? ` • ${nights} Nacht${nights === 1 ? "" : "e"}` : ""}
                            {b.createdAt ? ` • Erstellt am ${formatDate(b.createdAt)}` : ""}
                          </div>
                        </div>

                        <div className="flex flex-col items-start gap-2 sm:items-end">
                          {/* Status chip */}
                          <div
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${cfg.chip}`}
                          >
                            <span aria-hidden="true">{cfg.icon}</span>
                            <span>
                              {t(`status.${status}`, { defaultValue: status })}
                            </span>
                          </div>

                          {/* Status description */}
                          <div className="text-xs text-black/55">
                            {t(cfg.descKey, { defaultValue: "" })}
                          </div>

                          {/* Action */}
                          {status !== "cancelled" ? (
                            <button
                              onClick={() => cancelBooking(b._id)}
                              disabled={cancellingId === b._id}
                              className="mt-1 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black hover:bg-red-600 hover:text-white disabled:opacity-50"
                            >
                              {cancellingId === b._id ? "..." : "Stornieren"}
                            </button>
                          ) : (
                            <button
                              disabled
                              className="mt-1 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black/40"
                            >
                              Storniert
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Details grid */}
                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl border border-black/10 p-4">
                          <div className="text-xs text-black/60">Anreise</div>
                          <div className="mt-1 text-sm font-semibold text-black">
                            {formatDate(checkIn)}
                          </div>
                        </div>

                        <div className="rounded-xl border border-black/10 p-4">
                          <div className="text-xs text-black/60">Abreise</div>
                          <div className="mt-1 text-sm font-semibold text-black">
                            {formatDate(checkOut)}
                          </div>
                        </div>

                        <div className="rounded-xl border border-black/10 p-4">
                          <div className="text-xs text-black/60">Gäste</div>
                          <div className="mt-1 text-sm font-semibold text-black">
                            {b.guests ?? "-"}
                          </div>
                        </div>

                        <div className="rounded-xl border border-black/10 p-4">
                          <div className="text-xs text-black/60">Buchungs-ID</div>
                          <div className="mt-1 font-mono text-xs text-black">
                            {b._id}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
