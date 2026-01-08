import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Fehler beim Laden der Buchungen.");
        }

        const data = await res.json();
setBookings(Array.isArray(data.bookings) ? data.bookings : []);

      } catch (e) {
        setError(e.message || "Unbekannter Fehler.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  const formatDate = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString();
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
            {bookings.map((b) => (
              <div
                key={b._id}
                className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm text-black/60">Buchungsnummer</div>
                    <div className="font-mono text-sm text-black">{b._id}</div>
                  </div>

                  <div className="inline-flex items-center rounded-full border border-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">
                    {b.status || "pending"}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl border border-black/10 p-4">
                    <div className="text-xs text-black/60">Zimmer</div>
                    <div className="mt-1 text-sm font-semibold text-black">
                      {typeof b.roomId === "object" && b.roomId?.title
                        ? b.roomId.title
                        : String(b.roomId || "-")}
                    </div>
                  </div>

                  <div className="rounded-xl border border-black/10 p-4">
                    <div className="text-xs text-black/60">Anreise</div>
                    <div className="mt-1 text-sm font-semibold text-black">
                      {formatDate(b.startDate || b.checkIn || b.dates?.start)}
                    </div>
                  </div>

                  <div className="rounded-xl border border-black/10 p-4">
                    <div className="text-xs text-black/60">Abreise</div>
                    <div className="mt-1 text-sm font-semibold text-black">
                      {formatDate(b.endDate || b.checkOut || b.dates?.end)}
                    </div>
                  </div>

                  <div className="rounded-xl border border-black/10 p-4">
                    <div className="text-xs text-black/60">Gäste</div>
                    <div className="mt-1 text-sm font-semibold text-black">
                      {b.guests ?? "-"}
                    </div>
                  </div>
                </div>

                {b.createdAt && (
                  <div className="mt-4 text-xs text-black/50">
                    Erstellt am {formatDate(b.createdAt)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
