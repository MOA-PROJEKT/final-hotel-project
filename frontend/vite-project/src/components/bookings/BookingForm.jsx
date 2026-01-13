import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function BookingForm({ roomId }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { t } = useTranslation("bookings");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isValid = useMemo(() => {
    if (!checkIn || !checkOut) return false;
    const a = new Date(checkIn).getTime();
    const b = new Date(checkOut).getTime();
    if (Number.isNaN(a) || Number.isNaN(b)) return false;
    if (a >= b) return false;
    if (!guests || Number(guests) < 1) return false;
    if (!roomId) return false;
    return true;
  }, [checkIn, checkOut, guests, roomId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!isValid) {
      setError(t("form.errors.invalid"));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roomId,
          checkIn,
          checkOut,
          guests: Number(guests),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          data?.msg || data?.message || t("form.errors.bookFailedWithStatus", { status: res.status });
        if (res.status === 401) navigate("/login");
        else setError(msg);
        return;
      }

      setSuccess(t("form.success.created"));
      navigate("/my-bookings");
    } catch {
      setError(t("form.errors.backendUnreachable"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
        <div className="text-lg font-semibold text-slate-900">{t("form.title")}</div>
        <div className="mt-1 text-sm text-slate-600">{t("form.subtitle")}</div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            {success}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-5 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                {t("form.checkIn")}
              </span>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                {t("form.checkOut")}
              </span>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900"
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              {t("form.guests")}
            </span>
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-32 rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900"
            />
          </label>

          <button
            type="submit"
            disabled={!isValid || loading}
            className="mt-[50px] inline-flex items-center justify-center rounded-md border border-[#c52b58] bg-[#c52b58] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? t("form.saving") : t("form.submit")}
          </button>

          {!token && <div className="text-xs text-slate-500">{t("form.mustLogin")}</div>}
        </form>
      </div>
    </main>
  );
}
