// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Profile() {
  const { t } = useTranslation("profile");

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
        setErr(
          t("errors.notLoggedIn", { defaultValue: "Du bist nicht eingeloggt." })
        );
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(
            data?.msg ||
              t("errors.profileLoadFailed", {
                defaultValue: "Profil konnte nicht geladen werden.",
              })
          );
        }

        setMe(data.user || data);
        setNewEmail(data.user?.email || data.email || "");
      } catch (e) {
        setErr(
          e.message ||
            t("errors.unknown", { defaultValue: "Unbekannter Fehler." })
        );
      } finally {
        setLoading(false);
      }
    };

    loadMe();
  }, [token, t]);

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

    if (!newEmail.trim()) {
      return setErr(
        t("errors.enterNewEmail", { defaultValue: "Bitte neue E-Mail eingeben." })
      );
    }
    if (!emailPassword) {
      return setErr(
        t("errors.confirmPassword", {
          defaultValue: "Bitte Passwort bestätigen.",
        })
      );
    }

    setBusy("email");
    try {
      const res = await fetch(`${API_URL}/users/me/email`, {
        method: "PATCH",
        headers: authHeaders,
        body: JSON.stringify({ email: newEmail, password: emailPassword }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          data?.msg ||
            t("errors.emailChangeFailed", {
              defaultValue: "E-Mail ändern fehlgeschlagen.",
            })
        );
      }

      // UI updaten
      const updatedUser = data.user || { ...me, email: newEmail };
      setMe(updatedUser);
      setMsg(
        t("success.emailSaved", { defaultValue: "✅ E-Mail wurde gespeichert." })
      );

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
      setErr(
        e.message ||
          t("errors.unknown", { defaultValue: "Unbekannter Fehler." })
      );
    } finally {
      setBusy("");
    }
  };

  // ✅ Passwort ändern (PATCH /auth/update-password)
  const handleUpdatePassword = async () => {
    setMsg("");
    setErr("");

    if (!currentPassword) {
      return setErr(
        t("errors.enterCurrentPassword", {
          defaultValue: "Bitte aktuelles Passwort eingeben.",
        })
      );
    }
    if (!newPassword) {
      return setErr(
        t("errors.enterNewPassword", {
          defaultValue: "Bitte neues Passwort eingeben.",
        })
      );
    }
    if (newPassword.length < 6) {
      return setErr(
        t("errors.passwordMin", {
          defaultValue: "Neues Passwort muss mind. 6 Zeichen haben.",
        })
      );
    }

    setBusy("password");
    try {
      const res = await fetch(`${API_URL}/auth/update-password`, {
        method: "PATCH",
        headers: authHeaders,
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          data?.msg ||
            t("errors.passwordChangeFailed", {
              defaultValue: "Passwort ändern fehlgeschlagen.",
            })
        );
      }

      setMsg(
        t("success.passwordChanged", {
          defaultValue: "✅ Passwort wurde geändert.",
        })
      );
      setCurrentPassword("");
      setNewPassword("");
    } catch (e) {
      setErr(
        e.message ||
          t("errors.unknown", { defaultValue: "Unbekannter Fehler." })
      );
    } finally {
      setBusy("");
    }
  };

  // ✅ Account löschen (DELETE /users/me)
  const handleDeleteMe = async () => {
    setMsg("");
    setErr("");

    if (!deletePassword) {
      return setErr(
        t("errors.confirmPassword", {
          defaultValue: "Bitte Passwort bestätigen.",
        })
      );
    }

    const ok = window.confirm(
      t("confirm.deleteAccount", {
        defaultValue:
          "Account wirklich löschen? Das kann man NICHT rückgängig machen.",
      })
    );
    if (!ok) return;

    setBusy("delete");
    try {
      const res = await fetch(`${API_URL}/users/me`, {
        method: "DELETE",
        headers: authHeaders,
        body: JSON.stringify({ password: deletePassword }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          data?.msg ||
            t("errors.deleteFailed", {
              defaultValue: "Account löschen fehlgeschlagen.",
            })
        );
      }

      // logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("auth-changed"));

      setMsg(
        t("success.accountDeleted", {
          defaultValue: "✅ Account gelöscht. Du bist jetzt ausgeloggt.",
        })
      );

      window.location.href = "/";
    } catch (e) {
      setErr(
        e.message ||
          t("errors.unknown", { defaultValue: "Unbekannter Fehler." })
      );
    } finally {
      setBusy("");
    }
  };

  return (
    <main className={pageWrap} style={{ backgroundColor: "#f7efe7" }}>
      <div className="mx-auto max-w-6xl px-6 mt-[-40px] md:pt-24">
        <div className={`${shell} p-8`}>
          <div className="flex justify-between">
            <div>
              <div className="text-xs tracking-[0.3em] uppercase text-slate-500">
                {t("header.kicker", { defaultValue: "Account" })}
              </div>
              <h1 className="mt-2 text-2xl font-semibold">
                {t("header.title", { defaultValue: "Mein Profil" })}
              </h1>
              <p className="mt-2 text-slate-600">
                {t("header.subtitle", {
                  defaultValue: "Hier kannst du deine Daten verwalten.",
                })}
              </p>
            </div>

            {me?.email && (
              <div className="text-right">
                <div className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  {t("header.loggedInAs", { defaultValue: "Eingeloggt als" })}
                </div>
                <div className="mt-1 font-semibold">{me.email}</div>
              </div>
            )}
          </div>

          <div className={headerLine} />

          {loading && (
            <div className="mt-7 rounded-xl border border-[#eadfce] bg-white/70 p-6 text-slate-700">
              {t("states.loading", { defaultValue: "Lädt…" })}
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
                  <h2 className={title}>
                    {t("email.title", { defaultValue: "E-Mail ändern" })}
                  </h2>
                  <p className={sub}>
                    {t("email.subtitle", {
                      defaultValue: "Neue E-Mail + Passwort bestätigen.",
                    })}
                  </p>

                  <div className="mt-5">
                    <div className={label}>
                      {t("email.newEmailLabel", { defaultValue: "Neue E-Mail" })}
                    </div>
                    <input
                      className={inputNoEye}
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder={t("email.emailPlaceholder", {
                        defaultValue: "name@mail.com",
                      })}
                    />
                  </div>

                  <div className="mt-5">
                    <div className={label}>
                      {t("email.confirmPasswordLabel", {
                        defaultValue: "Passwort bestätigen",
                      })}
                    </div>
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
                        title={
                          showEmailPw
                            ? t("actions.hide", { defaultValue: "Verbergen" })
                            : t("actions.show", { defaultValue: "Anzeigen" })
                        }
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
                    {busy === "email"
                      ? t("actions.saving", { defaultValue: "Speichert…" })
                      : t("actions.save", { defaultValue: "Speichern" })}
                  </button>
                </div>
              </section>

              {/* PASSWORD */}
              <section className={box}>
                <div className={boxInner}>
                  <h2 className={title}>
                    {t("password.title", { defaultValue: "Passwort ändern" })}
                  </h2>
                  <p className={sub}>
                    {t("password.subtitle", {
                      defaultValue: "Aktuelles Passwort + neues Passwort.",
                    })}
                  </p>

                  <div className="mt-5">
                    <div className={label}>
                      {t("password.currentLabel", {
                        defaultValue: "Aktuelles Passwort",
                      })}
                    </div>
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
                        title={
                          showCurrentPw
                            ? t("actions.hide", { defaultValue: "Verbergen" })
                            : t("actions.show", { defaultValue: "Anzeigen" })
                        }
                      >
                        {showCurrentPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className={label}>
                      {t("password.newLabel", { defaultValue: "Neues Passwort" })}
                    </div>
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
                        title={
                          showNewPw
                            ? t("actions.hide", { defaultValue: "Verbergen" })
                            : t("actions.show", { defaultValue: "Anzeigen" })
                        }
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
                    {busy === "password"
                      ? t("actions.saving", { defaultValue: "Speichert…" })
                      : t("password.button", { defaultValue: "Passwort ändern" })}
                  </button>
                </div>
              </section>

              {/* DELETE */}
              <section className={`${box} border-rose-200`}>
                <div className={boxInner}>
                  <h2 className={title}>
                    {t("delete.title", { defaultValue: "Account löschen" })}
                  </h2>
                  <p className={sub}>
                    {t("delete.subtitle", {
                      defaultValue: "Achtung: Das kann man nicht rückgängig machen.",
                    })}
                  </p>

                  <div className="mt-5">
                    <div className={label}>
                      {t("delete.confirmPasswordLabel", {
                        defaultValue: "Passwort bestätigen",
                      })}
                    </div>
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
                        title={
                          showDeletePw
                            ? t("actions.hide", { defaultValue: "Verbergen" })
                            : t("actions.show", { defaultValue: "Anzeigen" })
                        }
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
                    {busy === "delete"
                      ? t("actions.deleting", { defaultValue: "Löscht…" })
                      : t("delete.button", { defaultValue: "Account löschen" })}
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
