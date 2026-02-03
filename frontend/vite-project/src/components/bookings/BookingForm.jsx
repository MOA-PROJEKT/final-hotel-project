import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function BookingForm({ roomId, maxGuests = 10, pricePerNight = 0 }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { t } = useTranslation("bookings");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [loading, setLoading] = useState(false);

  // general message + per-field errors
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState([]); // [{ field, msg }]
  const [success, setSuccess] = useState("");

  // ✅ NEW: per-field touched (onBlur)
  const [touched, setTouched] = useState({
    checkIn: false,
    checkOut: false,
    guests: false,
  });

  const getFieldError = (field) => errors.find((e) => e.field === field)?.msg;

  // ✅ make backend messages nicer for UI
  const prettyError = (msg) => {
    if (!msg) return "";
    if (msg === "__MAX_GUESTS__")
      return `Maximal ${Number(maxGuests)} Gäste für dieses Zimmer.`;
    if (msg.includes("between 2000 and 2100"))
      return "Bitte ein realistisches Datum wählen.";
    if (msg.includes("after checkIn"))
      return "Check-out muss nach Check-in sein.";
    if (msg.toLowerCase().includes("guests")) return "Ungültige Gästeanzahl.";
    if (msg.toLowerCase().includes("roomid"))
      return "Zimmer konnte nicht erkannt werden.";
    return msg;
  };

  // ✅ Local errors (UX)
  const localCheckInError = useMemo(() => {
    if (!touched.checkIn) return "";
    if (!checkIn) return "Bitte Check-in wählen.";

    const d = new Date(checkIn);
    if (Number.isNaN(d.getTime())) return "Bitte ein gültiges Datum wählen.";

    const year = d.getUTCFullYear();
    if (year < 2000 || year > 2100) return "Bitte ein realistisches Datum wählen.";
    return "";
  }, [touched.checkIn, checkIn]);

  const localCheckOutError = useMemo(() => {
    if (!touched.checkOut) return "";
    if (!checkOut) return "Bitte Check-out wählen.";

    const d = new Date(checkOut);
    if (Number.isNaN(d.getTime())) return "Bitte ein gültiges Datum wählen.";

    const year = d.getUTCFullYear();
    if (year < 2000 || year > 2100) return "Bitte ein realistisches Datum wählen.";

    // checkOut must be after checkIn (only if checkIn looks valid)
    const a = new Date(checkIn).getTime();
    const b = new Date(checkOut).getTime();
    if (!Number.isNaN(a) && !Number.isNaN(b) && a >= b) return "Check-out muss nach Check-in sein.";

    return "";
  }, [touched.checkOut, checkIn, checkOut]);

  const localGuestsError = useMemo(() => {
    if (!touched.guests) return "";
    const g = Number(guests);
    if (!g || g < 1) return "Ungültige Gästeanzahl.";
    if (g > Number(maxGuests)) return `Maximal ${Number(maxGuests)} Gäste für dieses Zimmer.`;
    return "";
  }, [touched.guests, guests, maxGuests]);

  const isValid = useMemo(() => {
    if (!checkIn || !checkOut) return false;

    const a = new Date(checkIn).getTime();
    const b = new Date(checkOut).getTime();
    if (Number.isNaN(a) || Number.isNaN(b)) return false;
    if (a >= b) return false;

    const g = Number(guests);
    if (!g || g < 1) return false;
    if (g > Number(maxGuests)) return false;

    if (!roomId) return false;
    return true;
  }, [checkIn, checkOut, guests, roomId, maxGuests]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const a = new Date(checkIn).getTime();
    const b = new Date(checkOut).getTime();
    if (Number.isNaN(a) || Number.isNaN(b)) return 0;
    if (a >= b) return 0;

    const diffMs = b - a;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.round(diffMs / oneDay);
  }, [checkIn, checkOut]);

  const totalPrice = useMemo(() => {
    const p = Number(pricePerNight) || 0;
    if (!isValid || nights <= 0 || p <= 0) return 0;
    return p * nights;
  }, [pricePerNight, nights, isValid]);

  const totalFormatted = useMemo(() => {
    try {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(totalPrice);
    } catch {
      return `${totalPrice} €`;
    }
  }, [totalPrice]);

  const onSubmit = async (e) => {
    e.preventDefault();

    // mark all fields as touched when submitting
    setTouched({ checkIn: true, checkOut: true, guests: true });

    // reset
    setErrorMsg("");
    setErrors([]);
    setSuccess("");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!isValid) {
      setErrorMsg(t("form.errors.invalid"));
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
          data?.msg ||
          data?.message ||
          t("form.errors.bookFailedWithStatus", { status: res.status });

        if (res.status === 401) {
          navigate("/login");
          return;
        }

        setErrorMsg(msg);
        setErrors(Array.isArray(data?.errors) ? data.errors : []);
        return;
      }

      setSuccess(t("form.success.created"));
      navigate("/my-bookings");
    } catch {
      setErrorMsg(t("form.errors.backendUnreachable"));
    } finally {
      setLoading(false);
    }
  };

  // compact error style + reserve height so layout does not jump
  const fieldErrorClass = "min-h-[16px] mt-1 text-xs leading-tight text-red-600";
  const hasFieldErrors = errors.length > 0;

  // Prefer local errors (UX) if field touched, otherwise backend errors
  const checkInErrorText = localCheckInError || prettyError(getFieldError("checkIn"));
  const checkOutErrorText = localCheckOutError || prettyError(getFieldError("checkOut"));
  const guestsErrorText = localGuestsError || prettyError(getFieldError("guests"));

  return (
    <main>
      <div className="m-auto p-5">
        <div className="text-xl font-semibold text-slate-900">{t("form.title")}</div>
        <div className="mt-1 text-sm text-slate-600">{t("form.subtitle")}</div>

        {/* general error only if we don't already show field errors */}
        {errorMsg && !hasFieldErrors && !localCheckInError && !localCheckOutError && !localGuestsError && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {errorMsg}
          </div>
        )}

        {success && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            {success}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-5 ml-[-18px] grid gap-4">
          <div className="grid gap-10 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                {t("form.checkIn")}
              </span>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                onBlur={() => setTouched((s) => ({ ...s, checkIn: true }))}
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900"
              />
              <p className={fieldErrorClass}>{checkInErrorText}</p>
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                {t("form.checkOut")}
              </span>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                onBlur={() => setTouched((s) => ({ ...s, checkOut: true }))}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900"
              />
              <p className={fieldErrorClass}>{checkOutErrorText}</p>
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              {t("form.guests")}
            </span>
            <input
              type="number"
              min="1"
              max={Number(maxGuests)}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              onBlur={() => setTouched((s) => ({ ...s, guests: true }))}
              className="w-32 rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900"
            />
            <p className={fieldErrorClass}>{guestsErrorText}</p>
          </label>

          {nights > 0 && (
            <div className="text-sm text-slate-700">
              <span className="font-semibold">{nights}</span>{" "}
              {nights === 1 ? "Nacht" : "Nächte"}
              {Number(pricePerNight) > 0 && (
                <>
                  {" "}
                  · <span className="font-semibold">{totalFormatted}</span>
                </>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={!isValid || loading}
            className="mt-[50px] inline-flex items-center justify-center rounded-md border border-[#c52b58] bg-[#c52b58] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading
              ? t("form.saving")
              : isValid && totalPrice > 0
              ? `${t("form.submit")} · ${totalFormatted}`
              : t("form.submit")}
          </button>

          {!token && <div className="text-xs text-slate-500">{t("form.mustLogin")}</div>}
        </form>
      </div>
    </main>
  );
}
