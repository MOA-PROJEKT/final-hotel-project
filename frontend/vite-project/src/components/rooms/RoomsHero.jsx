import heroImage from '../../assets/images/zimmer/hero.webp'
import { useTranslation } from 'react-i18next'

export default function RoomsHero() {
  const { t } = useTranslation('rooms')

  // ================= ПЛАВНЫЙ СКРОЛЛ =================
  const scrollToIntro = () => {
    const el = document.getElementById('rooms-intro')
    if (!el) return

    const headerOffset = 80 // высота хедера, чтобы элемент не прятался
    const targetY =
      el.getBoundingClientRect().top + window.scrollY - headerOffset
    const startY = window.scrollY
    const distance = targetY - startY
    const duration = 1200
    let startTime = null

    const step = (currentTime) => {
      if (!startTime) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      window.scrollTo(0, startY + distance * progress)
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }

  return (
    <section className="relative h-[70vh] w-full pt-24 overflow-hidden">
      {/* ================= HERO IMAGE ================= */}
      <img
        src={heroImage}
        alt={t('hero.alt')}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* ================= DARK OVERLAY ================= */}
      <div className="absolute inset-0 bg-black/30" />{' '}
      {/* затемнение для контраста с текстом */}
      {/* ================= TEXT + BUTTON ================= */}
      <div className="relative mt-36 z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-white text-4xl sm:text-5xl font-semibold tracking-wide mb-4">
          {t('hero.title')}
        </h1>

        <button
          type="button"
          onClick={scrollToIntro}
          className="inline-flex mt-8 items-center gap-2 px-6 py-3 text-white font-medium uppercase tracking-wider hover:bg-white hover:text-slate-950 transition"
        >
          {t('hero.cta')}
          <svg
            width="26"
            height="14"
            viewBox="0 0 26 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 0.999023L13.0208 13.0198L25.0416 0.999023"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </section>
  )
}
