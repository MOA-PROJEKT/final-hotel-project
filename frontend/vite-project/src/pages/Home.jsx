// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import HERO from '../assets/images/HERO.jpg'
import sommer from '../assets/images/sommer.jpg'

export default function Home() {
  return (
    <main className="bg-slate-50 text-slate-900">
      {/* HERO – großes Startbild wie Carlton */}
      <section id="hero" className="relative min-h-[90vh] overflow-hidden">
        <img
          src={HERO}
          alt="MOA Hotel Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-slate-900/35" />

        <div className="relative z-10 flex min-h-[90vh] items-center justify-center">
          <div className="mx-auto max-w-3xl px-4 text-center text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
              Your private hideaway in the heart of the Alps.
            </h1>

            <div className="mt-10 flex justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center border-2 border-[#c50355] bg-white/5 px-10 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#c50355] backdrop-blur-sm transition hover:bg-[#c50355] hover:text-white"
              >
                Buchen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOTEL */}
      <section id="hotel" className="relative z-20 bg-slate-50 py-24 ">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
          <div>
            <p className="mb-3 text-xs tracking-[0.3em] uppercase text-slate-500">
              The Hotel
            </p>
            <h2 className="mb-4 text-3xl sm:text-4xl font-semibold text-slate-900">
              Space, silence &amp; views above the city.
            </h2>
            <p className="mb-4 text-base text-slate-700">
              Perched just above the town, MOA Haven offers sweeping views over
              the valley and surrounding peaks. With a curated collection of
              contemporary suites, intimate lounges and a panoramic spa, it’s
              designed for guests who enjoy calm, light and privacy.
            </p>
            <p className="text-base text-slate-700">
              From early-morning ski runs to late-night cocktails by the
              fireplace, every detail is shaped around slow, effortless days in
              the mountains.
            </p>

            <div className="mt-8">
              <Link
                to="/rooms"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
              >
                Mehr erfahren
              </Link>
            </div>
          </div>

          <div className="h-80 rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-700 to-slate-400 shadow-lg md:h-[26rem] lg:h-[30rem]">
            <img
              src={sommer}
              className="h-full w-full rounded-3xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* ROOMS */}
      <section id="rooms" className="relative z-20 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs tracking-[0.3em] uppercase text-slate-500">
              Rooms &amp; Suites
            </p>
            <h2 className="mb-3 text-3xl sm:text-4xl font-semibold text-slate-900">
              Room to breathe, with every detail considered.
            </h2>
            <p className="text-base text-slate-700">
              Generous layouts, soft materials and floor-to-ceiling views create
              a calm retreat after a day outdoors.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <article className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/60 shadow-sm">
              <div className="h-56 md:h-64 bg-gradient-to-tr from-slate-800 via-slate-600 to-slate-400" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-sm font-semibold text-slate-900">
                  Lakeview Rooms
                </h3>
                <p className="mb-4 flex-1 text-xs sm:text-[0.82rem] text-slate-700">
                  Intimate double rooms with warm tones, perfect for weekend
                  escapes and short alpine breaks.
                </p>
                <Link
                  to="/rooms"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
                >
                  Mehr erfahren
                </Link>
              </div>
            </article>

            {/* Card 2 */}
            <article className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/60 shadow-sm">
              <div className="h-56 md:h-64 bg-gradient-to-tr from-slate-900 via-slate-700 to-slate-500" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-sm font-semibold text-slate-900">
                  Signature Suites
                </h3>
                <p className="mb-4 flex-1 text-xs sm:text-[0.82rem] text-slate-700">
                  Spacious suites with lounge area and balcony, designed for
                  longer stays and family time.
                </p>
                <a
                  href="#contact"
                  className="text-xs font-medium text-slate-900 underline underline-offset-4"
                >
                  Request a signature suite
                </a>
              </div>
            </article>

            {/* Card 3 */}
            <article className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/60 shadow-sm">
              <div className="h-56 md:h-64 bg-gradient-to-tr from-slate-700 via-slate-500 to-slate-300" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-sm font-semibold text-slate-900">
                  Penthouse Retreat
                </h3>
                <p className="mb-4 flex-1 text-xs sm:text-[0.82rem] text-slate-700">
                  The hotel&apos;s most private space with wrap-around views,
                  ideal for memorable celebrations.
                </p>
                <a
                  href="#contact"
                  className="text-xs font-medium text-slate-900 underline underline-offset-4"
                >
                  Enquire about the penthouse
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* RESTAURANT */}
      <section id="restaurant" className="relative z-20 bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 grid gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
          <div className="h-80 rounded-3xl bg-gradient-to-tr from-slate-800 via-slate-700 to-slate-500 shadow-lg md:h-[26rem] lg:h-[30rem]" />

          <div>
            <p className="mb-3 text-xs tracking-[0.3em] uppercase text-slate-500">
              Dining
            </p>
            <h2 className="mb-3 text-3xl sm:text-4xl font-semibold text-slate-900">
              Alpine flavours, crafted with a modern touch.
            </h2>
            <p className="mb-4 text-base text-slate-700">
              From slow breakfasts with sunrise views to multi-course tasting
              menus in the evening – our kitchens celebrate seasonal produce
              from the region.
            </p>
            <p className="text-base text-slate-700">
              Two signature restaurants, an intimate bar and a terrace
              overlooking the valley offer the right setting for every moment.
            </p>

            <div className="mt-8">
              <Link
                to="/restaurant"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
              >
                Mehr erfahren
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WELLNESS */}
      <section
        id="wellness"
        className="relative z-20 bg-slate-900 py-24 text-slate-50"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
            <div>
              <p className="mb-3 text-xs tracking-[0.3em] uppercase text-slate-300">
                Spa &amp; Wellness
              </p>
              <h2 className="mb-3 text-3xl sm:text-4xl font-semibold">
                A spa that feels like a quiet mountain sanctuary.
              </h2>
              <p className="mb-4 text-base text-slate-200/90">
                Pools with panoramic windows, steam and sauna areas, tailored
                treatments and cosy relaxation zones – all designed to slow down
                body and mind.
              </p>
              <p className="text-base text-slate-200/90">
                Our therapists create individual rituals that combine alpine
                botanicals with modern techniques.
              </p>

              <div className="mt-8">
                <Link
                  to="/wellness"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-100"
                >
                  Mehr erfahren
                </Link>
              </div>
            </div>

            <div className="h-80 rounded-3xl bg-gradient-to-tr from-slate-700 via-slate-500 to-slate-300 md:h-[26rem] lg:h-[30rem]" />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative z-20 bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-xs tracking-[0.3em] uppercase text-slate-500">
                Gallery
              </p>
              <h2 className="mb-2 text-3xl sm:text-4xl font-semibold text-slate-900">
                A glimpse into MOA Haven.
              </h2>
              <p className="max-w-xl text-base text-slate-700">
                Lobby scenes, winter terraces, suites and spa moments – a
                selection of impressions from the hotel.
              </p>
            </div>
            <a
              href="#contact"
              className="hidden rounded-full border border-slate-300 px-5 py-2 text-xs font-medium text-slate-900 hover:bg-slate-100 md:inline-flex"
            >
              Ask for media kit
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="h-48 rounded-2xl bg-slate-300 sm:h-56 md:h-64" />
            <div className="h-48 rounded-2xl bg-slate-200 sm:h-56 md:h-64" />
            <div className="h-48 rounded-2xl bg-slate-300 sm:h-56 md:h-64" />
            <div className="h-48 rounded-2xl bg-slate-200 sm:h-56 md:h-64" />
            <div className="h-48 rounded-2xl bg-slate-300 sm:h-56 md:h-64" />
            <div className="h-48 rounded-2xl bg-slate-200 sm:h-56 md:h-64" />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-20 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <p className="mb-3 text-xs tracking-[0.3em] uppercase text-slate-500">
                Contact
              </p>
              <h2 className="mb-3 text-3xl sm:text-4xl font-semibold text-slate-900">
                Plan your stay with our team.
              </h2>
              <p className="mb-4 text-base text-slate-700">
                Whether it&apos;s a weekend escape, a winter holiday or a
                private celebration – our reservation team will help you tailor
                your time at MOA Haven.
              </p>

              <div className="space-y-2 text-sm text-slate-700">
                <p>MOA Haven Hotel</p>
                <p>Example Street 12 · 12345 Alpine City</p>
                <p>Phone: +41 00 000 00 00</p>
                <p>Email: info@moa-haven.example</p>
              </div>

              <div className="mt-8">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
                >
                  Kontakt aufnehmen
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-slate-900">
                Opening times &amp; seasons
              </h3>
              <ul className="mb-4 space-y-2 text-xs sm:text-[0.82rem] text-slate-700">
                <li>• Winter season: mid-December to late March</li>
                <li>• Check-in from 15:00 · Check-out until 11:00</li>
                <li>• Private ski shuttle and concierge service on request</li>
              </ul>
              <p className="mb-3 text-xs text-slate-600">
                For group bookings, corporate events or celebrations, please
                contact our events team directly.
              </p>
              <a
                href="#contact"
                className="text-xs font-medium text-slate-900 underline underline-offset-4"
              >
                events@moa-haven.example
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
