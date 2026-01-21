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

        const data = await res.json();
        if (!res.ok) throw new Error(data?.msg || "Profil konnte nicht geladen werden.");

        setMe(data.user || data);
        setNewEmail(data.user?.email || data.email || "");
      } catch (e) {
        setErr(e.message);
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

  const inputWrap = "relative mt-2";
  const eyeBtn =
    "absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-500 hover:bg-slate-100";

  const btnPrimary =
    "mt-5 inline-flex rounded-sm border border-[#c50355] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#c50355] hover:bg-[#c50355] hover:text-white";
  const btnDanger =
    "mt-5 inline-flex rounded-sm bg-rose-600 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white hover:bg-rose-700";

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
                      className={input.replace(" pr-12", "")}
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
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
                      />
                      <button
                        type="button"
                        className={eyeBtn}
                        onClick={() => setShowEmailPw((v) => !v)}
                      >
                        {showEmailPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button
                    className={btnPrimary}
                    onClick={() =>
                      setMsg("✅ E-Mail-UI korrekt. Backend kommt als Nächstes.")
                    }
                  >
                    Speichern
                  </button>
                </div>
              </section>

              {/* PASSWORD */}
              <section className={box}>
                <div className={boxInner}>
                  <h2 className={title}>Passwort ändern</h2>

                  <div className="mt-5">
                    <div className={label}>Aktuelles Passwort</div>
                    <div className={inputWrap}>
                      <input
                        className={input}
                        type={showCurrentPw ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className={eyeBtn}
                        onClick={() => setShowCurrentPw((v) => !v)}
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
                      />
                      <button
                        type="button"
                        className={eyeBtn}
                        onClick={() => setShowNewPw((v) => !v)}
                      >
                        {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button className={btnPrimary}>Passwort ändern</button>
                </div>
              </section>

              {/* DELETE */}
              <section className={`${box} border-rose-200`}>
                <div className={boxInner}>
                  <h2 className={title}>Account löschen</h2>

                  <div className="mt-5">
                    <div className={label}>Passwort bestätigen</div>
                    <div className={inputWrap}>
                      <input
                        className={input}
                        type={showDeletePw ? "text" : "password"}
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className={eyeBtn}
                        onClick={() => setShowDeletePw((v) => !v)}
                      >
                        {showDeletePw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button className={btnDanger}>Account löschen</button>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
