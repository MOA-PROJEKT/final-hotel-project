import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="bg-slate-50">
        {/* HERO – später kommt hier Video / Bild */}
        <section
          id="hero"
          className="flex min-h-[70vh] items-center justify-center bg-slate-900 text-white"
        >
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="mb-4 text-xs tracking-[0.3em] uppercase text-slate-300">
              MOA Haven
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
              Ein Rückzugsort für moderne Reisende
            </h1>
          </div>
        </section>

        {/* HOTEL */}
        <section id="hotel" className="py-24 bg-slate-50">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-4 text-sm tracking-[0.3em] uppercase text-slate-500">
              Hotel
            </h2>
            <p className="max-w-2xl text-slate-700">
              Hotel Sektion – hier kommt später der Inhalt über das Haus,
              Philosophie, Location, Services etc.
            </p>
          </div>
        </section>

        {/* ZIMMER */}
        <section id="rooms" className="py-24 bg-white">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-4 text-sm tracking-[0.3em] uppercase text-slate-500">
              Zimmer
            </h2>
            <p className="max-w-2xl text-slate-700">
              Zimmer Sektion – später Liste der Zimmer / Kategorien.
            </p>
          </div>
        </section>

        {/* RESTAURANT */}
        <section id="restaurant" className="py-24 bg-slate-50">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-4 text-sm tracking-[0.3em] uppercase text-slate-500">
              Restaurant
            </h2>
            <p className="max-w-2xl text-slate-700">
              Restaurant Sektion – Beschreibung von Restaurant & Bar.
            </p>
          </div>
        </section>

        {/* WELLNESS */}
        <section id="wellness" className="py-24 bg-white">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-4 text-sm tracking-[0.3em] uppercase text-slate-500">
              Wellness
            </h2>
            <p className="max-w-2xl text-slate-700">
              Wellness Sektion – Spa, Massagen, Pools, Behandlungen.
            </p>
          </div>
        </section>

        {/* GALERIE */}
        <section id="gallery" className="py-24 bg-slate-50">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-4 text-sm tracking-[0.3em] uppercase text-slate-500">
              Galerie
            </h2>
            <p className="max-w-2xl text-slate-700">
              Galerie Sektion – später Bilder, Slider, Impressionen.
            </p>
          </div>
        </section>

        {/* KONTAKT */}
        <section id="contact" className="py-24 bg-white">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-4 text-sm tracking-[0.3em] uppercase text-slate-500">
              Kontakt
            </h2>
            <p className="max-w-2xl text-slate-700">
              Kontakt Sektion – Formular, Adresse, Karte usw.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
