// src/pages/NotFound.jsx
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f7f2ec] pt-40 lg:pt-56 pb-20">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-2xl font-semibold text-slate-900">Seite nicht gefunden</h1>
        <p className="mt-2 text-slate-600">Diese URL gibt es nicht.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-slate-900 px-4 py-2 text-white"
        >
          Zur Startseite
        </Link>
      </div>
    </main>
  )
}
