// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react"; // ✅ NEU

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");

  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false); // ✅ NEU

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url =
        mode === "login" ? `${API_URL}/auth/login` : `${API_URL}/auth/register`;
      const payload = mode === "login" ? { email, password } : { name, email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.msg || t("errors.loginFailed"));
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.dispatchEvent(new Event("auth-changed"));

      if (data.user?.role === "admin") navigate("/admin");
      else navigate("/rooms");
    } catch (err) {
      setError(t("errors.serverUnreachable"));
    } finally {
      setLoading(false);
    }
  };

  // ✅ styles (wie bei dir im Stil, nur klein gehalten)
  const input =
    "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none focus:border-slate-900 pr-12";
  const inputWrap = "mt-1 relative";
  const eyeBtn =
    "absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-500 hover:bg-slate-100";

  return (
    <main className="min-h-screen bg-[#f7f2ec] pt-40 lg:pt-56 pb-20">
      <div className="mx-auto max-w-xl px-4">
        <div className="rounded-2xl bg-white/70 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur">
          <h1 className="text-2xl font-semibold tracking-wide text-slate-900">
            {mode === "login" ? t("titleLogin") : t("titleRegister")}
          </h1>

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                mode === "login"
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-900 border border-slate-200"
              }`}
            >
              {t("tabLogin")}
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                mode === "register"
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-900 border border-slate-200"
              }`}
            >
              {t("tabRegister")}
            </button>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  {t("name")}
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none focus:border-slate-900"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700">
                {t("email")}
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none focus:border-slate-900"
                type="email"
                required
              />
            </div>

            {/* ✅ Passwort mit Eye Icon */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                {t("password")}
              </label>

              <div className={inputWrap}>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={input}
                  type={showPassword ? "text" : "password"}
                  required
                />

                <button
                  type="button"
                  className={eyeBtn}
                  onClick={() => setShowPassword((v) => !v)}
                  title={showPassword ? "Verbergen" : "Anzeigen"}
                  aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="mt-2 w-full rounded-lg bg-[#c50355] px-4 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white hover:opacity-95 disabled:opacity-60"
            >
              {loading
                ? t("pleaseWait")
                : mode === "login"
                ? t("submitLogin")
                : t("submitRegister")}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
