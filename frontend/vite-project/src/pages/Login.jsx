// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function Login() {
  const navigate = useNavigate()

  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const url =
        mode === 'login' ? `${API_URL}/auth/login` : `${API_URL}/auth/register`

      const payload =
        mode === 'login'
          ? { email, password }
          : { name, email, password }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.msg || 'Fehler beim Login.')
        setLoading(false)
        return
      }

      // speichern
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // weiterleiten
      if (data.user?.role === 'admin') navigate('/admin')
      else navigate('/rooms')
    } catch (err) {
      setError('Server nicht erreichbar. Läuft Backend auf Port 3000?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f2ec] pt-40 lg:pt-56 pb-20">
      <div className="mx-auto max-w-xl px-4">
        <div className="rounded-2xl bg-white/70 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur">
          <h1 className="text-2xl font-semibold tracking-wide text-slate-900">
            {mode === 'login' ? 'Login' : 'Registrieren'}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {mode === 'login'
              ? 'Melde dich an, um zu buchen.'
              : 'Erstelle ein Konto, um zu buchen.'}
          </p>

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                mode === 'login'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-900 border border-slate-200'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                mode === 'register'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-900 border border-slate-200'
              }`}
            >
              Registrieren
            </button>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none focus:border-slate-900"
                  placeholder="Max Mustermann"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700">
                E-Mail
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none focus:border-slate-900"
                placeholder="max@test.de"
                type="email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Passwort
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none focus:border-slate-900"
                placeholder="mind. 6 Zeichen"
                type="password"
                required
              />
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
                ? 'Bitte warten…'
                : mode === 'login'
                ? 'Einloggen'
                : 'Konto erstellen'}
            </button>
          </form>

          <div className="mt-6 text-xs text-slate-500">
            Tipp: Backend läuft bei euch auf <b>http://localhost:3000</b>
          </div>
        </div>
      </div>
    </main>
  )
}
