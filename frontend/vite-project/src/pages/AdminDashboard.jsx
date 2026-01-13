// src/pages/AdminDashboard.jsx
import { useEffect, useMemo, useState } from 'react'
import { getRoomName } from '../utils/roomHelpers'


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString('de-DE')
  } catch {
    return value
  }
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const token = localStorage.getItem('token')

  const loadBookings = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_URL}/bookings`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.msg || `Fehler beim Laden (Status ${res.status})`)
        setBookings([])
        return
      }

      setBookings(data.bookings || [])
    } catch (e) {
      setError('Backend nicht erreichbar. Läuft es auf Port 3000?')
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBookings()
  }, [])

  const updateStatus = async (bookingId, newStatus) => {
    if (!token) {
      setError('Kein Token gefunden. Bitte neu einloggen.')
      return
    }

    setUpdatingId(bookingId)
    setError('')

    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data?.msg || `Status Update fehlgeschlagen (Status ${res.status})`)
        return
      }

      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b))
      )
    } catch (e) {
      setError('Update fehlgeschlagen. Backend erreichbar?')
    } finally {
      setUpdatingId(null)
    }
  }

  const deleteBooking = async (bookingId) => {
    if (!token) {
      setError('Kein Token gefunden. Bitte neu einloggen.')
      return
    }

    const ok = window.confirm('Buchung wirklich löschen?')
    if (!ok) return

    setDeletingId(bookingId)
    setError('')

    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data?.msg || `Löschen fehlgeschlagen (Status ${res.status})`)
        return
      }

      setBookings((prev) => prev.filter((b) => b._id !== bookingId))
    } catch (e) {
      setError('Löschen fehlgeschlagen. Backend erreichbar?')
    } finally {
      setDeletingId(null)
    }
  }

  const stats = useMemo(() => {
    const total = bookings.length
    const pending = bookings.filter((b) => b.status === 'pending').length
    const confirmed = bookings.filter((b) => b.status === 'confirmed').length
    const cancelled = bookings.filter((b) => b.status === 'cancelled').length
    return { total, pending, confirmed, cancelled }
  }, [bookings])

  return (
    <main className="min-h-screen bg-[#f7f2ec] pt-40 lg:pt-36 pb-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl bg-white/70 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur">
          <h1 className="text-2xl font-semibold text-slate-900">Admin Dashboard</h1>
          <p className="mt-2 text-slate-600">Hier siehst du alle Buchungen aus der Datenbank.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-sm text-slate-500">Total</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">{stats.total}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-sm text-slate-500">Pending</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">{stats.pending}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-sm text-slate-500">Confirmed</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">{stats.confirmed}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-sm text-slate-500">Cancelled</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">{stats.cancelled}</div>
            </div>
          </div>

          {loading && (
            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-slate-700">
              Lade Buchungen…
            </div>
          )}

          {error && (
            <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
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
                      <th className="px-4 py-3">E-Mail</th>
                      <th className="px-4 py-3">Zimmer</th>
                      <th className="px-4 py-3">Check-in</th>
                      <th className="px-4 py-3">Check-out</th>
                      <th className="px-4 py-3">Gäste</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Aktionen</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b._id} className="border-t border-slate-100">
                        <td className="px-4 py-3 text-slate-900">{b.user?.name || '—'}</td>
                        <td className="px-4 py-3 text-slate-700">{b.user?.email || '—'}</td>
                        <td className="px-4 py-3 text-slate-700">
  {getRoomName(b.roomId) || b.roomId || "—"}
</td>

                        <td className="px-4 py-3 text-slate-700">{formatDate(b.checkIn)}</td>
                        <td className="px-4 py-3 text-slate-700">{formatDate(b.checkOut)}</td>
                        <td className="px-4 py-3 text-slate-700">{b.guests}</td>

                        <td className="px-4 py-3">
                          <select
                            value={b.status}
                            disabled={updatingId === b._id}
                            onChange={(e) => updateStatus(b._id, e.target.value)}
                            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                          >
                            <option value="pending">pending</option>
                            <option value="confirmed">confirmed</option>
                            <option value="cancelled">cancelled</option>
                          </select>

                          {updatingId === b._id && (
                            <div className="mt-2 text-xs text-slate-500">Speichert…</div>
                          )}
                        </td>

                        <td className="px-4 py-3">
                          <button
                            type="button"
                            disabled={deletingId === b._id}
                            onClick={() => deleteBooking(b._id)}
                            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60"
                          >
                            {deletingId === b._id ? 'Löscht…' : 'Löschen'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-slate-100 p-4 text-right">
                <button
                  type="button"
                  onClick={loadBookings}
                  className="rounded-md border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Neu laden
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
