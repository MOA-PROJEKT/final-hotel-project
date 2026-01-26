// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Profile() {
  const token = localStorage.getItem("token");

  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");

  // 👁 show/hide states
  const [showEmailPw, setShowEmailPw] = useState(false);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showDeletePw, setShowDeletePw] = useState(false);

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(""); // "email" | "password" | "delete" | ""

  useEffect(() => {
    const loadMe = async () => {
      setLoading(true);
      setErr("");
      setMsg("");

      if (!token) {
        setErr("Du bist nicht eingeloggt.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.msg || "Profil konnte nicht geladen werden.");

        setMe(data.user || data);
        setNewEmail(data.user?.email || data.email || "");
      } catch (e) {
        setErr(e.message || "Unbekannter Fehler.");
      } finally {
        setLoading(false);
      }
    };

    loadMe();
  }, [token]);

  // ---- styles ----
  const pageWrap = "min-h-screen bg-[#f7f2ec] pt-40 lg:pt-48 pb-20";
  const shell =
    "rounded-2xl bg-white/70 shadow-[0_22px_70px_rgba(15,23,42,0.10)] backdrop-blur border border-white/40";
  const headerLine = "mt-6 border-t border-[#eadfce]";
  const box =
    "rounded-2xl bg-white/75 border border-[#eadfce] shadow-[0_12px_30px_rgba(15,23,42,0.06)]";
  const boxInner = "p-7";
  const title = "text-[20px] font-semibold text-slate-900";
  const sub = "mt-1 text-sm text-slate-600";
  const label = "text-xs font-semibold tracking-[0.18em] uppercase text-slate-600";

  const input =
    "mt-2 w-full rounded-xl border border-[#eadfce] bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#c50355]/20 pr-12";
  const inputNoEye =
    "mt-2 w-full rounded-xl border border-[#eadfce] bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#c50355]/20";

  const inputWrap = "relative mt-2";
  const eyeBtn =
    "absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-500 hover:bg-slate-100";

  const btnPrimary =
    "mt-5 inline-flex rounded-sm border border-[#c50355] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#c50355] hover:bg-[#c50355] hover:text-white disabled:opacity-60";
  const btnDanger =
    "mt-5 inline-flex rounded-sm bg-rose-600 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white hover:bg-rose-700 disabled:opacity-60";

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // ✅ EMAIL speichern (PATCH /users/me/email)
  const handleUpdateEmail = async () => {
    setMsg("");
    setErr("");

    if (!newEmail.trim()) return setErr("Bitte neue E-Mail eingeben.");
    if (!emailPassword) return setErr("Bitte Passwort bestätigen.");

    setBusy("email");
    try {
      const res = await fetch(`${API_URL}/users/me/email`, {
        method: "PATCH",
        headers: authHeaders,
        body: JSON.stringify({ email: newEmail, password: emailPassword }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.msg || "E-Mail ändern fehlgeschlagen.");

      // UI updaten
      const updatedUser = data.user || { ...me, email: newEmail };
      setMe(updatedUser);
      setMsg("✅ E-Mail wurde gespeichert.");

      // localStorage updaten, damit Navbar & Dropdown sofort richtig sind
      try {
        const stored = JSON.parse(localStorage.getItem("user") || "null");
        if (stored) {
          stored.email = updatedUser.email;
          localStorage.setItem("user", JSON.stringify(stored));
          window.dispatchEvent(new Event("auth-changed"));
        }
      } catch {}

      setEmailPassword("");
    } catch (e) {
      setErr(e.message || "Unbekannter Fehler.");
    } finally {
      setBusy("");
    }
  };

  // ✅ Passwort ändern (PATCH /auth/update-password)
  const handleUpdatePassword = async () => {
    setMsg("");
    setErr("");

    if (!currentPassword) return setErr("Bitte aktuelles Passwort eingeben.");
    if (!newPassword) return setErr("Bitte neues Passwort eingeben.");
    if (newPassword.length < 6) return setErr("Neues Passwort muss mind. 6 Zeichen haben.");

    setBusy("password");
    try {
      const res = await fetch(`${API_URL}/auth/update-password`, {
        method: "PATCH",
        headers: authHeaders,
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.msg || "Passwort ändern fehlgeschlagen.");

      setMsg("✅ Passwort wurde geändert.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (e) {
      setErr(e.message || "Unbekannter Fehler.");
    } finally {
      setBusy("");
    }
  };

  // ✅ Account löschen (DELETE /users/me)
  const handleDeleteMe = async () => {
    setMsg("");
    setErr("");

    if (!deletePassword) return setErr("Bitte Passwort bestätigen.");

    const ok = window.confirm("Account wirklich löschen? Das kann man NICHT rückgängig machen.");
    if (!ok) return;

    setBusy("delete");
    try {
      const res = await fetch(`${API_URL}/users/me`, {
        method: "DELETE",
        headers: authHeaders,
        body: JSON.stringify({ password: deletePassword }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.msg || "Account löschen fehlgeschlagen.");

      // logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("auth-changed"));

      setMsg("✅ Account gelöscht. Du bist jetzt ausgeloggt.");
      // optional: redirect
      window.location.href = "/";
    } catch (e) {
      setErr(e.message || "Unbekannter Fehler.");
    } finally {
      setBusy("");
    }
  };

  return (
    <main className={pageWrap}>
      <div className="mx-auto max-w-6xl px-6 pt-12">
        <div className={`${shell} p-8`}>
          <div className="flex justify-between">
            <div>
              <div className="text-xs tracking-[0.3em] uppercase text-slate-500">
                Account
              </div>
              <h1 className="mt-2 text-2xl font-semibold">Mein Profil</h1>
              <p className="mt-2 text-slate-600">
                Hier kannst du deine Daten verwalten.
              </p>
            </div>

            {me?.email && (
              <div className="text-right">
                <div className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Eingeloggt als
                </div>
                <div className="mt-1 font-semibold">{me.email}</div>
              </div>
            )}
          </div>

          <div className={headerLine} />

          {loading && (
            <div className="mt-7 rounded-xl border border-[#eadfce] bg-white/70 p-6 text-slate-700">
              Lädt…
            </div>
          )}

          {!loading && err && (
            <div className="mt-7 rounded-xl border border-rose-200 bg-rose-50/60 p-6 text-rose-800">
              {err}
            </div>
          )}

          {!loading && msg && (
            <div className="mt-7 rounded-xl border border-emerald-200 bg-emerald-50/60 p-6 text-emerald-800">
              {msg}
            </div>
          )}

          {!loading && !err && (
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {/* EMAIL */}
              <section className={box}>
                <div className={boxInner}>
                  <h2 className={title}>E-Mail ändern</h2>
                  <p className={sub}>Neue E-Mail + Passwort bestätigen.</p>

                  <div className="mt-5">
                    <div className={label}>Neue E-Mail</div>
                    <input
                      className={inputNoEye}
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="name@mail.com"
                    />
                  </div>

                  <div className="mt-5">
                    <div className={label}>Passwort bestätigen</div>
                    <div className={inputWrap}>
                      <input
                        className={input}
                        type={showEmailPw ? "text" : "password"}
                        value={emailPassword}
                        onChange={(e) => setEmailPassword(e.target.value)}
                        placeholder=""
                      />
                      <button
                        type="button"
                        className={eyeBtn}
                        onClick={() => setShowEmailPw((v) => !v)}
                        title={showEmailPw ? "Verbergen" : "Anzeigen"}
                      >
                        {showEmailPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button
                    className={btnPrimary}
                    type="button"
                    disabled={busy === "email"}
                    onClick={handleUpdateEmail}
                  >
                    {busy === "email" ? "Speichert…" : "Speichern"}
                  </button>
                </div>
              </section>

              {/* PASSWORD */}
              <section className={box}>
                <div className={boxInner}>
                  <h2 className={title}>Passwort ändern</h2>
                  <p className={sub}>Aktuelles Passwort + neues Passwort.</p>

                  <div className="mt-5">
                    <div className={label}>Aktuelles Passwort</div>
                    <div className={inputWrap}>
                      <input
                        className={input}
                        type={showCurrentPw ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder=""
                      />
                      <button
                        type="button"
                        className={eyeBtn}
                        onClick={() => setShowCurrentPw((v) => !v)}
                        title={showCurrentPw ? "Verbergen" : "Anzeigen"}
                      >
                        {showCurrentPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className={label}>Neues Passwort</div>
                    <div className={inputWrap}>
                      <input
                        className={input}
                        type={showNewPw ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder=""
                      />
                      <button
                        type="button"
                        className={eyeBtn}
                        onClick={() => setShowNewPw((v) => !v)}
                        title={showNewPw ? "Verbergen" : "Anzeigen"}
                      >
                        {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button
                    className={btnPrimary}
                    type="button"
                    disabled={busy === "password"}
                    onClick={handleUpdatePassword}
                  >
                    {busy === "password" ? "Speichert…" : "Passwort ändern"}
                  </button>
                </div>
              </section>

              {/* DELETE */}
              <section className={`${box} border-rose-200`}>
                <div className={boxInner}>
                  <h2 className={title}>Account löschen</h2>
                  <p className={sub}>Achtung: Das kann man nicht rückgängig machen.</p>

                  <div className="mt-5">
                    <div className={label}>Passwort bestätigen</div>
                    <div className={inputWrap}>
                      <input
                        className={input}
                        type={showDeletePw ? "text" : "password"}
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        placeholder=""
                      />
                      <button
                        type="button"
                        className={eyeBtn}
                        onClick={() => setShowDeletePw((v) => !v)}
                        title={showDeletePw ? "Verbergen" : "Anzeigen"}
                      >
                        {showDeletePw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button
                    className={btnDanger}
                    type="button"
                    disabled={busy === "delete"}
                    onClick={handleDeleteMe}
                  >
                    {busy === "delete" ? "Löscht…" : "Account löschen"}
                  </button>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
