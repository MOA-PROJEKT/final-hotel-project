import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, User, ChevronDown, LogOut, Shield, UserCircle } from 'lucide-react'
import { useTranslation } from "react-i18next";

import logoWhite from '../../assets/images/logo/logo-white.png'
import logoDark from '../../assets/images/logo/logo-dark.png'

const navLinks = [
  { key: "hotel", to: "/" },
  { key: "rooms", to: "/rooms" },
  { key: "restaurant", to: "/restaurant" },
  { key: "wellness", to: "/wellness" },
  { key: "gallery", to: "/gallery" },
  { key: "contact", to: "/contact" },
];

const LANGUAGES = ['DE', 'EN']

function LanguageSwitcher({ current, onChange, isDark }) {
  const [open, setOpen] = useState(false)

  const baseText = isDark ? 'text-slate-900' : 'text-white font-semibold'
  const hoverText = isDark ? 'hover:text-slate-900' : 'hover:text-white'
  const shadowText = isDark ? '' : 'drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]'
  const dropdownBg = 'bg-slate-900 text-white shadow-lg z-[999]'

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

function readAuthFromStorage() {
  const token = localStorage.getItem('token')
  let user = null
  try {
    user = JSON.parse(localStorage.getItem('user') || 'null')
  } catch {
    user = null
  }
  return { token, user }
}

export default function Navbar() {
  const { t, i18n } = useTranslation("nav");

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [language, setLanguage] = useState(() => {
    const stored = (localStorage.getItem("lang") || "de").toLowerCase();
    return stored.startsWith("en") ? "EN" : "DE";
  });

  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname

  const forceCompact = path === '/my-bookings' || path === '/admin'

  const [auth, setAuth] = useState(() => readAuthFromStorage())
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)

  const isLoggedIn = !!auth.token && !!auth.user
  const isAdmin = auth.user?.role === 'admin'

  // ✅ HIER IST DIE WICHTIGE ÄNDERUNG:
  // /profile dazu, damit Header wie Restaurant = dunkle Schrift
  const isLightPage =
    path === '/contact' ||
    path === '/restaurant' ||
    path === '/profile' ||
    path === '/my-bookings' ||
    path === '/admin'

  const useDarkText = isScrolled || isLightPage

  // ✅ LOGO: automatisch weiß/dunkel je nach Hintergrund
  const logo = useDarkText ? logoDark : logoWhite

  useEffect(() => {
    const onScroll = () => {
      if (forceCompact) setIsScrolled(true)
      else setIsScrolled(window.scrollY > 40)
    }

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [forceCompact])

  useEffect(() => {
    const onAuthChanged = () => setAuth(readAuthFromStorage())
    window.addEventListener('auth-changed', onAuthChanged)

    const onStorage = (e) => {
      if (e.key === 'token' || e.key === 'user') setAuth(readAuthFromStorage())
    }
    window.addEventListener('storage', onStorage)

    return () => {
      window.removeEventListener('auth-changed', onAuthChanged)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  useEffect(() => {
    const onDown = (e) => {
      if (!userMenuRef.current) return
      if (!userMenuRef.current.contains(e.target)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const shadowText = useDarkText ? '' : 'drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]'
  const textMain = useDarkText ? 'text-slate-900' : `text-white ${shadowText}`
  const textMuted = useDarkText ? 'text-slate-900/70' : `text-white ${shadowText}`
 const borderSoft = useDarkText ? 'border-slate-900' : 'border-white/70'


  const navBase = useDarkText
    ? 'text-slate-900/70 hover:text-slate-900'
    : `text-white hover:text-white font-semibold ${shadowText}`
  const navActive = useDarkText ? 'text-slate-900' : `text-white font-bold ${shadowText}`

  const userInitial = (auth.user?.name?.[0] || auth.user?.email?.[0] || 'U').toUpperCase()
  const userName = auth.user?.name || auth.user?.email || 'Account'

  const closeAllMenus = () => {
    setUserMenuOpen(false)
    setIsMenuOpen(false)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setAuth({ token: null, user: null })
    window.dispatchEvent(new Event('auth-changed'))
    closeAllMenus()
    navigate('/')
  }

  const goLogin = () => {
    closeAllMenus()
    navigate('/login')
  }

  const goAdmin = () => {
    closeAllMenus()
    navigate('/admin')
  }

  const goMyBookings = () => {
    closeAllMenus()
    navigate('/my-bookings')
  }

  // ✅ Profil-Seite
  const goProfile = () => {
    closeAllMenus()
    navigate('/profile')
  }

  const goRooms = () => {
    closeAllMenus()
    navigate('/rooms')
  }

  const handleLanguageChange = (code) => {
    setLanguage(code);
    const next = code === "EN" ? "en" : "de";
    i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 isolate border-b transition-none lg:transition-all lg:duration-300  ${
          isLightPage && !isScrolled
            ? 'bg-[#f7f2ec] border-transparent'
            : isScrolled
            ? 'bg-[#f7efe7] border-slate-200/70 shadow-[0_8px_20px_rgba(15,23,42,0.06)]'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="mx-auto w-full max-w-[1400px] px-2 sm:px-4 lg:px-6">
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
                    className={`mb-2 flex h-9 w-9 items-center justify-center rounded-full border ${borderSoft}`}
                  >
                    <img
                      src={logo}
                      alt="Logo"
                      className="h-7 w-7 object-contain"
                      draggable="false"
                    />
                  </div>

                  <span className={`font-display text-[16px] tracking-[0.55em] uppercase ${textMain}`}>
                    MOA HOTEL PARADISE
                  </span>
                  <span className={`mt-1 text-[11px] tracking-[0.4em] uppercase ${textMuted}`}>
                    Luxury Retreat
                  </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <LanguageSwitcher current={language} onChange={handleLanguageChange} isDark={useDarkText} />

                  {!isLoggedIn ? (
                    <button
                      type="button"
                      onClick={goLogin}
                      className={`hidden sm:flex h-10 w-10 items-center justify-center rounded-full border ${borderSoft} ${textMain} hover:opacity-90 transition-opacity`}
                      aria-label="Login"
                      title="Login"
                    >
                      <User className="h-4 w-4" />
                    </button>
                  ) : (
                    <div ref={userMenuRef} className="relative hidden sm:block">
                      <button
                        type="button"
                        onClick={() => setUserMenuOpen((v) => !v)}
                        className={`flex items-center gap-2 px-1 py-2 hover:opacity-90 transition-opacity ${textMain}`}
                        aria-label="User menu"
                        title={userName}
                      >
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-full border ${borderSoft} text-[12px] font-semibold ${textMain}`}
                        >
                          {userInitial}
                        </span>

                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {userMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 z-[9999] w-fit min-w-[135px] rounded-md bg-slate-900 text-white shadow-lg p-2 translate-x-1">
                          {/* ✅ Änderung #1: Profil mit Icon + "Profil" */}
                          <button
                            type="button"
                            onClick={goProfile}
                            className="w-full text-left px-3 py-2 hover:bg-white/10 flex items-center gap-2"
                          >
                            <UserCircle className="h-4 w-4" />
                            <span>{t("profile")}</span>

                          </button>

                          {/* ✅ Änderung #2: My bookings nur wenn NICHT Admin */}
                          {!isAdmin && (
                            <button
                              type="button"
                              onClick={goMyBookings}
                              className="w-full text-left px-3 py-2 hover:bg-white/10"
                            >
                              {t("myBookings")}
                            </button>
                          )}

                          {isAdmin && (
                            <button
                              type="button"
                              onClick={goAdmin}
                              className="w-full text-left px-3 py-2 hover:bg-white/10 flex items-center gap-2"
                            >
                              <Shield className="h-4 w-4" />
                              {t("admin")}
                            </button>
                          )}

                          <div className="my-2 h-px bg-white/15" />

                          <button
                            type="button"
                            onClick={logout}
                            className="w-full text-left px-3 py-2 hover:bg-white/10 flex items-center gap-2"
                          >
                            <LogOut className="h-4 w-4" />
                            {t("logout")}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={goRooms}
                    className="hidden md:inline-flex rounded-sm border border-[#c50355] bg-transparent px-7 py-2 text-[12px] font-semibold uppercase tracking-[0.35em] text-[#c50355] transition-colors hover:bg-[#c50355] hover:text-white"
                  >
                    {t("book")}
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <div className={`mt-4 border-t ${isLightPage ? 'border-[#eadfce]' : 'border-white/45'}`} />
                <nav className="flex items-center justify-center gap-14 pt-4 pb-2 text-[13px] uppercase tracking-[0.38em]">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.key}
                      to={link.to}
                      className={({ isActive }) =>
                        `${navBase} transition-colors ${isActive ? navActive : ''}`
                      }
                    >
                      {t(link.key)}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
          )}

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
                    key={link.key}
                    to={link.to}
                    className={({ isActive }) =>
                      `text-slate-900/70 hover:text-slate-900 transition-colors font-medium ${
                        isActive ? 'text-slate-900 font-semibold' : ''
                      }`
                    }
                  >
                    {t(link.key)}
                  </NavLink>
                ))}
              </nav>

              <button
                type="button"
                onClick={goRooms}
                className="inline-flex rounded-sm border border-[#c50355] bg-transparent px-7 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#c50355] transition-colors hover:bg-[#c50355] hover:text-white"
              >
                {t("book")}
              </button>
            </div>
          )}

          <div className={`flex lg:hidden flex-col pt-5 pb-2 ${textMain}`}>
            <div className="flex h-16 items-center justify-between gap-4">
              <LanguageSwitcher current={language} onChange={handleLanguageChange} isDark={useDarkText} />

              <div className={`flex flex-col items-center leading-tight ${textMain}`}>
                <div
                  className={`mb-1 flex h-7 w-7 items-center justify-center rounded-full border ${borderSoft}`}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-6 w-6 object-contain"
                    draggable="false"
                  />
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

      <div
        className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto bg-black/40'
            : 'opacity-0 pointer-events-none bg-transparent'
        }`}
      >
        <div
          className={`relative h-full w-full lg:max-w-md bg-[#b2854e] text-white flex flex-col transform transition-transform duration-500 ${
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
                key={link.key}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="w-full block text-white"
              >
                <div className="border-b border-white/25 pb-3 pt-1">{t(link.key)}</div>
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-white/20 px-8 pb-10 pt-6 text-[11px] uppercase tracking-[0.3em] space-y-4 text-white">
            {!isLoggedIn ? (
              <button
                type="button"
                onClick={goLogin}
                className="flex items-center gap-2 opacity-90 hover:opacity-100"
              >
                <User className="h-4 w-4" />
                <span>{t("login")}</span>
              </button>
            ) : (
              <>
                <div className="opacity-90 flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/60 text-[11px] font-semibold">
                    {userInitial}
                  </span>
                  <span>{t("loggedIn")}</span>
                </div>

                {/* ✅ Änderung #1 (mobile): Profil mit Icon + "Profil" */}
                <button
                  type="button"
                  onClick={goProfile}
                  className="flex items-center gap-2 opacity-90 hover:opacity-100"
                >
                  <UserCircle className="h-4 w-4" />
                  <span>{t("profile")}</span>
                </button>

                {isAdmin && (
                  <button
                    type="button"
                    onClick={goAdmin}
                    className="flex items-center gap-2 opacity-90 hover:opacity-100"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </button>
                )}

                {/* ✅ Änderung #2 (mobile): My bookings nur wenn NICHT Admin */}
                {!isAdmin && (
                  <button
                    type="button"
                    onClick={goMyBookings}
                    className="flex items-center gap-2 opacity-90 hover:opacity-100"
                  >
                    <span>{t("myBookings")}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={logout}
                  className="flex items-center gap-2 opacity-90 hover:opacity-100"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{t("logout")}</span>
                </button>
              </>
            )}
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
