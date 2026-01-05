import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
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

function LanguageSwitcher({ current, onChange, isDark }) {
  const [open, setOpen] = useState(false)

  const baseText = isDark ? 'text-slate-900' : 'text-white font-semibold'
  const hoverText = isDark ? 'hover:text-slate-900' : 'hover:text-white'
  const shadowText = isDark ? '' : 'drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]'
  const dropdownBg = 'bg-slate-900/90 text-white shadow-lg'

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className={`inline-flex items-center gap-1 text-[14px] tracking-[0.32em] uppercase ${baseText} ${hoverText} ${shadowText}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{current}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className={`absolute left-0 mt-1 space-y-1 text-[14px] tracking-[0.32em] uppercase px-2 py-2 rounded-sm ${dropdownBg}`}
        >
          {LANGUAGES.filter((code) => code !== current).map((code) => (
            <button
              key={code}
              type="button"
              className="block text-left w-full text-white hover:text-white"
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

  const navigate = useNavigate() // ✅ MUSS hier drin sein
  const location = useLocation()
  const path = location.pathname

  // Seiten mit hellem Hintergrund: oben muss die Navbar dunkel sein
  const isLightPage = path === '/contact' || path === '/restaurant'

  // Dark Text, wenn: gescrolled ODER helle Seite
  const useDarkText = isScrolled || isLightPage

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const shadowText = useDarkText ? '' : 'drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]'

  const textMain = useDarkText ? 'text-slate-900' : `text-white ${shadowText}`
  const textMuted = useDarkText ? 'text-slate-900/70' : `text-white ${shadowText}`

  const borderSoft = useDarkText ? 'border-slate-900/25' : 'border-white/70'

  const navBase = useDarkText
    ? 'text-slate-900/70 hover:text-slate-900'
    : `text-white hover:text-white font-semibold ${shadowText}`
  const navActive = useDarkText ? 'text-slate-900' : `text-white font-bold ${shadowText}`

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${
          isLightPage && !isScrolled
            ? 'bg-[#f7f2ec] border-transparent'
            : isScrolled
            ? 'bg-[#f7efe7] border-slate-200/70 shadow-[0_8px_20px_rgba(15,23,42,0.06)]'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="mx-auto w-full max-w-[1400px] px-2 sm:px-4 lg:px-6">
          {/* ========= DESKTOP: großer Header ========= */}
          {!isScrolled && (
            <div className="hidden lg:flex flex-col pt-3 pb-2">
              <div className="flex h-24 items-center justify-between gap-4">
                <button
                  type="button"
                  className={`inline-flex items-center gap-3 text-[14px] tracking-[0.4em] uppercase font-semibold ${textMain}`}
                  onClick={() => setIsMenuOpen(true)}
                >
                  <Menu className="h-8 w-8" />
                  <span className="hidden sm:inline">Menü</span>
                </button>

                <div className={`flex flex-col items-center leading-tight ${textMain}`}>
                  <div
                    className={`mb-2 flex h-9 w-9 items-center justify-center rounded-full border ${borderSoft} text-[10px] tracking-[0.2em] ${textMain}`}
                  >
                    ★
                  </div>
                  <span className={`font-display text-[16px] tracking-[0.55em] uppercase ${textMain}`}>
                    MOA HOTEL PARADISE
                  </span>
                  <span className={`mt-1 text-[11px] tracking-[0.4em] uppercase ${textMuted}`}>
                    Luxury Retreat
                  </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <LanguageSwitcher current={language} onChange={setLanguage} isDark={useDarkText} />

                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className={`hidden sm:flex h-10 w-10 items-center justify-center rounded-full border ${borderSoft} ${textMain} hover:opacity-90 transition-opacity`}
                    aria-label="Login"
                  >
                    <User className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    className="hidden md:inline-flex rounded-sm border border-[#c50355] bg-transparent px-7 py-2 text-[12px] font-semibold uppercase tracking-[0.35em] text-[#c50355] transition-colors hover:bg-[#c50355] hover:text-white"
                  >
                    Buchen
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <div className={`mt-4 border-t ${isLightPage ? 'border-[#eadfce]' : 'border-white/45'}`} />
                <nav className="flex items-center justify-center gap-14 pt-4 pb-2 text-[13px] uppercase tracking-[0.38em]">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.label}
                      to={link.to}
                      className={({ isActive }) =>
                        `${navBase} transition-colors ${isActive ? navActive : ''}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* ========= DESKTOP: schmaler Header beim Scrollen ========= */}
          {isScrolled && (
            <div className="hidden lg:flex h-14 items-center justify-between gap-6">
              <div className="flex flex-col leading-tight">
                <span className="text-[13px] tracking-[0.45em] uppercase text-slate-900">
                  MOA HOTEL PARADISE
                </span>
                <span className="text-[9px] tracking-[0.35em] uppercase text-slate-900/70">
                  Luxury Retreat
                </span>
              </div>

              <nav className="flex items-center justify-center gap-10 text-[12px] uppercase tracking-[0.35em]">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    className={({ isActive }) =>
                      `text-slate-900/70 hover:text-slate-900 transition-colors font-medium ${
                        isActive ? 'text-slate-900 font-semibold' : ''
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <button
                type="button"
                className="inline-flex rounded-sm border border-[#c50355] bg-transparent px-7 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#c50355] transition-colors hover:bg-[#c50355] hover:text-white"
              >
                Buchen
              </button>
            </div>
          )}

          {/* ========= MOBILE / TABLET ========= */}
          <div className={`flex lg:hidden flex-col pt-5 pb-2 ${textMain}`}>
            <div className="flex h-16 items-center justify-between gap-4">
              <LanguageSwitcher current={language} onChange={setLanguage} isDark={useDarkText} />

              <div className={`flex flex-col items-center leading-tight ${textMain}`}>
                <div
                  className={`mb-1 flex h-7 w-7 items-center justify-center rounded-full border ${borderSoft} text-[9px] tracking-[0.2em] ${textMain}`}
                >
                  ★
                </div>
                <span className={`text-[12px] tracking-[0.45em] uppercase font-semibold ${textMain}`}>
                  MOA HOTEL PARADISE
                </span>
                <span className={`mt-1 text-[9px] tracking-[0.35em] uppercase ${textMuted}`}>
                  Luxury Retreat
                </span>
              </div>

              <button
                type="button"
                className={`inline-flex items-center gap-3 text-[14px] tracking-[0.4em] uppercase font-semibold ${textMain}`}
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* OVERLAY-MENÜ */}
      <div
        className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto bg-black/40'
            : 'opacity-0 pointer-events-none bg-transparent'
        }`}
      >
        <div
          className={`relative h-full w-full lg:max-w-md bg-amber-900/95 text-white flex flex-col transform transition-transform duration-500 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <button
            type="button"
            className="absolute top-8 right-3 lg:left-8 lg:right-auto lg:top-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 hover:border-white"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Menü schließen"
          >
            <X className="h-5 w-5" />
          </button>

          <nav className="flex-1 overflow-y-auto px-8 pt-20 lg:pt-32 space-y-7 lg:space-y-8 text-[14px] lg:text-[15px] tracking-[0.4em] uppercase font-semibold">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="w-full block text-white"
              >
                <div className="border-b border-white/25 pb-3 pt-1">{link.label}</div>
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-white/20 px-8 pb-10 pt-6 text-[11px] uppercase tracking-[0.3em] space-y-4 text-white">
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false)
                navigate('/login')
              }}
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
