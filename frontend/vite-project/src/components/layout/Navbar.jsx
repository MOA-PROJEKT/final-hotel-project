import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X, User, ChevronDown } from 'lucide-react'

const navLinks = [
  { label: 'Hotel', to: '/' },
  { label: 'Zimmer', to: '/rooms' },
  { label: 'Restaurant', to: '/restaurant' },
  { label: 'Wellness', to: '/wellness' },
  { label: 'Galerie', to: '/gallery' },
  { label: 'Kontakt', to: '/contact' },
]

const LANGUAGES = ['DE', 'EN']

// Sprachauswahl
function LanguageSwitcher({ current, onChange, isScrolled }) {
  // Farben ändern sich, je nachdem ob gescrollt oder nicht
  const baseText = isScrolled ? 'text-slate-700' : 'text-white'
  const hoverText = isScrolled ? 'hover:text-slate-900' : 'hover:text-slate-100'
  const dropdownBg = isScrolled
    ? 'bg-white/95 text-slate-700 shadow-sm'
    : 'bg-slate-900/90 text-white shadow-lg'

  const [open, setOpen] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className={`inline-flex items-center gap-1 text-[14px] tracking-[0.32em] uppercase ${baseText} ${hoverText}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{current}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          className={`absolute left-0 mt-1 space-y-1 text-[14px] tracking-[0.32em] uppercase px-2 py-2 rounded-sm ${dropdownBg}`}
        >
          {LANGUAGES.filter((code) => code !== current).map((code) => (
            <button
              key={code}
              type="button"
              className={`block text-left w-full ${baseText} ${hoverText}`}
              onClick={() => {
                onChange(code)
                setOpen(false)
              }}
            >
              {code}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState('DE')

  const location = useLocation()
  const path = location.pathname

  const isLightPage = path === '/contact' || path === '/restaurant'

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* FIXED HEADER */}
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${
          isScrolled || isLightPage
            ? 'bg-white/95 border-slate-200/70 shadow-[0_8px_20px_rgba(15,23,42,0.06)] text-slate-900'
            : 'bg-transparent border-transparent text-white'
        }`}
      >
        <div className="mx-auto w-full max-w-[1400px] px-2 sm:px-4 lg:px-6">
          {/* ========= DESKTOP: ENTWEDER großer ODER schmaler Header ========= */}

          {/* Großer Header (nur oben, nicht gescrollt) */}
          {!isScrolled && (
            <div className="hidden lg:flex flex-col pt-3 pb-2">
              {/* Row 1: Burger / Logo / Actions */}
              <div className="flex h-24 items-center justify-between gap-4">
                {/* Links: Hamburger */}
                <button
                  type="button"
                  className="inline-flex items-center gap-3 text-[14px] tracking-[0.4em] uppercase"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <Menu className="h-8 w-8" />
                  <span className="hidden sm:inline">Menü</span>
                </button>

                {/* Mitte: Logo */}
                <div className="flex flex-col items-center leading-tight">
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 text-[10px] tracking-[0.2em]">
                    ★
                  </div>
                  <span className="text-[16px] tracking-[0.55em] uppercase">
                    MOA HOTEL PARADISE
                  </span>
                  <span className="mt-1 text-[11px] tracking-[0.4em] uppercase text-white/70">
                    Luxury Retreat
                  </span>
                </div>

                {/* Rechts: Sprache + Login + Buchen */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <LanguageSwitcher
                    current={language}
                    onChange={setLanguage}
                    isScrolled={isScrolled}
                  />

                  <button
                    type="button"
                    className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-white/60 hover:border-white"
                    aria-label="Login"
                  >
                    <User className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    className="hidden md:inline-flex rounded-sm border border-rose-500 bg-rose-500 px-7 py-2 text-[12px] font-semibold uppercase tracking-[0.35em] text-white hover:bg-transparent hover:text-rose-300 transition-colors"
                  >
                    Buchen
                  </button>
                </div>
              </div>

              {/* Row 2: Linie + Navigation */}
              <div className="flex flex-col">
                <div className="mt-4 border-t border-white/40" />
                <nav className="flex items-center justify-center gap-14 pt-4 pb-2 text-[13px] uppercase tracking-[0.38em]">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.label}
                      to={link.to}
                      className={({ isActive }) =>
                        `${
                          isLightPage
                            ? 'text-slate-600 hover:text-slate-900'
                            : 'text-white/80 hover:text-white'
                        } transition-colors ${
                          isActive
                            ? isLightPage
                              ? 'text-slate-900'
                              : 'text-white'
                            : ''
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Schmaler Header (nur wenn gescrollt) */}
          {isScrolled && (
            <div className="hidden lg:flex h-14 items-center justify-between gap-6">
              {/* Links: Brand klein */}
              <div className="flex flex-col leading-tight">
                <span className="text-[13px] tracking-[0.45em] uppercase">
                  MOA HOTEL PARADISE
                </span>
                <span className="text-[9px] tracking-[0.35em] uppercase text-slate-500">
                  Luxury Retreat
                </span>
              </div>

              {/* Mitte: Navigation */}
              <nav className="flex items-center justify-center gap-10 text-[12px] uppercase tracking-[0.35em]">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    className={({ isActive }) =>
                      `text-slate-500 hover:text-slate-900 transition-colors ${
                        isActive ? 'text-slate-900' : ''
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              {/* Rechts: Buchen */}
              <button
                type="button"
                className="inline-flex rounded-sm border border-rose-500 bg-rose-500 px-7 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white hover:bg-transparent hover:text-rose-500 transition-colors"
              >
                Buchen
              </button>
            </div>
          )}

          {/* ========= MOBILE / TABLET HEADER (immer, < lg) ========= */}
          <div className="flex lg:hidden flex-col pt-5 pb-2">
            {/* Row 1: Sprache / Logo / Burger */}
            <div className="flex h-16 items-center justify-between gap-4">
              {/* links: Sprache */}
              <LanguageSwitcher
                current={language}
                onChange={setLanguage}
                isScrolled={isScrolled}
              />

              {/* Mitte: Logo (kleiner) */}
              <div className="flex flex-col items-center leading-tight">
                <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/60 text-[9px] tracking-[0.2em]">
                  ★
                </div>
                <span className="text-[12px] tracking-[0.45em] uppercase">
                  MOA HOTEL PARADISE
                </span>
                <span className="mt-1 text-[9px] tracking-[0.35em] uppercase text-white/70">
                  Luxury Retreat
                </span>
              </div>

              {/* rechts: Burger */}
              <button
                type="button"
                className="inline-flex items-center gap-3 text-[14px] tracking-[0.4em] uppercase"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* OVERLAY-MENÜ (HAMBURGER) */}
      <div
        className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto bg-black/40'
            : 'opacity-0 pointer-events-none bg-transparent'
        }`}
      >
        {/* Panel links */}
        <div
          className={`relative h-full w-full lg:max-w-md bg-amber-900/95 text-white flex flex-col transform transition-transform duration-500 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* X */}
          <button
            type="button"
            className="absolute top-8 right-3 lg:left-8 lg:right-auto lg:top-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 hover:border-white"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Menü schließen"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Links im Overlay */}
          <nav className="flex-1 overflow-y-auto px-8 pt-20 lg:pt-32 space-y-7 lg:space-y-8 text-[14px] lg:text-[15px] tracking-[0.4em] uppercase">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="w-full block"
              >
                <div className="border-b border-white/25 pb-3 pt-1">
                  {link.label}
                </div>
              </NavLink>
            ))}
          </nav>

          {/* Unten: Login + Buchen */}
          <div className="border-t border-white/20 px-8 pb-10 pt-6 text-[11px] uppercase tracking-[0.3em] space-y-4">
            <button
              type="button"
              className="flex items-center gap-2 opacity-90 hover:opacity-100"
            >
              <User className="h-4 w-4" />
              <span>Login</span>
            </button>

            <button
              type="button"
              className="mt-2 inline-flex w-full items-center justify-center rounded-sm border border-rose-300 bg-rose-500 px-5 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-transparent hover:text-rose-200 transition-colors"
            >
              Buchen
            </button>
          </div>
        </div>

        {/* rechter Hintergrund (Desktop) */}
        <button
          type="button"
          className="hidden lg:block flex-1"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Menü schließen"
        />
      </div>
    </>
  )
}
