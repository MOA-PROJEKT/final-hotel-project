// src/pages/AdminDashboard.jsx
import { useEffect, useMemo, useState } from "react";
import { getRoomName } from "../utils/roomHelpers";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString("de-DE");
  } catch {
    return value;
  }
}

function nightsBetween(a, b) {
  const start = new Date(a);
  const end = new Date(b);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "-";
  const days = Math.round((end - start) / (1000 * 60 * 60 * 24));
  return Math.max(1, days);
}

function shortId(id) {
  return id ? `${id.slice(0, 6)}…${id.slice(-4)}` : "—";
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    return true;
  }
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const token = localStorage.getItem("token");

  const loadBookings = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/bookings`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.msg || `Fehler beim Laden (Status ${res.status})`);
        setBookings([]);
        return;
      }

      setBookings(data.bookings || []);
      setLastUpdated(new Date());
    } catch (e) {
      setError("Backend nicht erreichbar. Läuft es auf Port 3000?");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopyId = async (id) => {
    await copyToClipboard(id);
  };

  const updateStatus = async (bookingId, newStatus) => {
    if (!token) {
      setError("Kein Token gefunden. Bitte neu einloggen.");
      return;
    }

    setUpdatingId(bookingId);
    setError("");

    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.msg || `Status Update fehlgeschlagen (Status ${res.status})`);
        return;
      }

      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b))
      );
    } catch (e) {
      setError("Update fehlgeschlagen. Backend erreichbar?");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteBooking = async (bookingId) => {
    if (!token) {
      setError("Kein Token gefunden. Bitte neu einloggen.");
      return;
    }

    const ok = window.confirm("Buchung wirklich löschen?");
    if (!ok) return;

    setDeletingId(bookingId);
    setError("");

    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.msg || `Löschen fehlgeschlagen (Status ${res.status})`);
        return;
      }

      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (e) {
      setError("Löschen fehlgeschlagen. Backend erreichbar?");
    } finally {
      setDeletingId(null);
    }
  };

  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === "pending").length;
    const confirmed = bookings.filter((b) => b.status === "confirmed").length;
    const cancelled = bookings.filter((b) => b.status === "cancelled").length;
    return { total, pending, confirmed, cancelled };
  }, [bookings]);

  const statusUI = (status) => {
    switch (status) {
      case "confirmed":
        return {
          label: "Bestätigt",
          chip: "bg-emerald-50/70 text-emerald-800 border-emerald-200",
          icon: "✓",
          iconClass: "text-emerald-700",
        };
      case "cancelled":
        return {
          label: "Storniert",
          chip: "bg-rose-50/70 text-rose-800 border-rose-200",
          icon: "×",
          iconClass: "text-rose-700",
        };
      default:
        return {
          label: "Ausstehend",
          chip: "bg-amber-50/70 text-amber-900 border-amber-200",
  
          iconClass: "text-amber-700",
        };
    }
  };

  const kpiCard = ({ title, value, icon, iconClass, accentClass }) => (
    <div className={`rounded-xl border border-slate-200 bg-white p-4 border-l-2 ${accentClass}`}>
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>{title}</span>
        <span className={`text-base ${iconClass}`} aria-hidden="true">
          {icon}
        </span>
      </div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f7f2ec] pt-40 lg:pt-56 pb-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl bg-white/70 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Admin Dashboard</h1>
              <p className="mt-2 text-slate-600">Alle Buchungen im System.</p>
              {lastUpdated && (
                <div className="mt-1 text-xs text-slate-400">
                  Zuletzt aktualisiert:{" "}
                  {lastUpdated.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={loadBookings}
              className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Aktualisieren
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            {kpiCard({
              title: "Total",
              value: stats.total,
              
              iconClass: "text-slate-400",
              accentClass: "border-l-slate-300",
            })}
            {kpiCard({
              title: "Ausstehend",
              value: stats.pending,
              
              iconClass: "text-amber-700",
              accentClass: "border-l-amber-400",
            })}
            {kpiCard({
              title: "Bestätigt",
              value: stats.confirmed,
              icon: "✓",
              iconClass: "text-emerald-700",
              accentClass: "border-l-emerald-500",
            })}
            {kpiCard({
              title: "Storniert",
              value: stats.cancelled,
              icon: "×",
              iconClass: "text-rose-700",
              accentClass: "border-l-rose-400",
            })}
          </div>

          {loading && (
            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-slate-700">
              Lade Buchungen…
            </div>
          )}

          {error && (
            <div className="mt-8 rounded-xl border border-rose-200 bg-rose-50/60 p-6 text-rose-800">
              {error}
            </div>
          )}

          {!loading && !error && bookings.length === 0 && (
            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-slate-700">
              Noch keine Buchungen vorhanden.
            </div>
          )}

          {!loading && !error && bookings.length > 0 && (
            <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Gast</th>
                      <th className="px-4 py-3">Zimmer</th>
                      <th className="px-4 py-3">Zeitraum</th>
                      <th className="px-4 py-3">Gäste</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Aktionen</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings.map((b) => {
                      const ui = statusUI(b.status);
                      const nights = nightsBetween(b.checkIn, b.checkOut);

                      return (
                        <tr
                          key={b._id}
                          className="border-t border-slate-100 hover:bg-slate-50/60 transition odd:bg-white even:bg-slate-50/30"
                        >
                         
                         <td className="px-4 py-4">
  {(() => {
    const userMissing = !b.user;
    const guestName = b.user?.name || (userMissing ? "Konto gelöscht !" : "—");
    const guestEmail = b.user?.email || (userMissing ? "Gastdaten nicht verfügbar" : "—");

    return (
      <>
        <div className="flex items-center gap-2">
          <div
  className={`font-medium ${userMissing ? "text-rose-500" : "text-slate-900"}`}
>
  {guestName}
</div>

          
        </div>

        <div className="text-xs text-slate-500">{guestEmail}</div>

        <div className="mt-1 inline-flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleCopyId(b._id)}
            className="inline-flex items-center gap-2 text-left text-xs text-slate-400 hover:text-slate-600"
            title="ID kopieren"
          >
            <span>ID: {shortId(b._id)}</span>
            <span className="text-slate-300" aria-hidden="true">
              ⧉
            </span>
          </button>
        </div>
      </>
    );
  })()}
</td>


                          <td className="px-4 py-4 text-slate-700">
                            {getRoomName(b.roomId) || b.roomId || "—"}
                          </td>

                          <td className="px-4 py-4 text-slate-700">
                            <div className="font-medium text-slate-900">
                              {formatDate(b.checkIn)} – {formatDate(b.checkOut)}
                            </div>
                            <div className="text-xs text-slate-500">
                              {nights} Nacht{nights === 1 ? "" : "e"}
                            </div>
                          </td>

                          <td className="px-4 py-4 text-slate-700">{b.guests}</td>

                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <span
                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${ui.chip}`}
                              >
                                <span className={ui.iconClass} aria-hidden="true">
                                  {ui.icon}
                                </span>
                                {ui.label}
                              </span>

                              <select
                                value={b.status}
                                disabled={updatingId === b._id}
                                onChange={(e) => updateStatus(b._id, e.target.value)}
                                className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-900 hover:bg-slate-50 disabled:opacity-60"
                              >
                                <option value="pending">Ausstehend</option>
                                <option value="confirmed">Bestätigt</option>
                                <option value="cancelled">Storniert</option>
                              </select>
                            </div>

                            {updatingId === b._id && (
                              <div className="mt-2 text-xs text-slate-500">Speichert…</div>
                            )}
                          </td>

                          <td className="px-4 py-4 text-right">
                            <button
                              type="button"
                              disabled={deletingId === b._id}
                              onClick={() => deleteBooking(b._id)}
                              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-red-100 disabled:opacity-50"
                              title="Buchung löschen"
                            >
                              {deletingId === b._id ? "Löscht…" : "Löschen"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-slate-100 p-4 text-right">
                <span className="text-xs text-slate-500">
                  {bookings.length} Buchung{bookings.length === 1 ? "" : "en"} angezeigt
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
