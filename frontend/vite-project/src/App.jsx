import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Bild importieren
import HERO from "./assets/images/HERO.jpg";

export default function App() {
  return (
    <>
      <Navbar />

      {/* Seite */}
      <main className="min-h-screen bg-slate-50 text-slate-900">
        {/* HERO: nur das große Foto + optional Text */}
        <section id="hero" className="relative min-h-[90vh] overflow-hidden">
          {/* Bild im Hintergrund, füllt nur diese Section */}
          <img
            src={HERO}
            alt="MOA Hotel Hero"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* kleine Abdunklung – kannst du löschen, wenn du sie nicht willst */}
          <div className="absolute inset-0 bg-slate-900/20" />

          {/* Inhalt auf dem Bild (Platzhalter-Text, kannst du anpassen oder entfernen) */}
          <div className="relative z-10 flex min-h-[90vh] items-center justify-center">
            <div className="mx-auto max-w-4xl px-4 text-center text-white">
              <p className="mb-4 text-xs tracking-[0.3em] uppercase text-slate-200">
                MOA Haven
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
                Ein Rückzugsort für moderne Reisende
              </h1>
            </div>
          </div>
        </section>

        {/* Ab hier beginnt der „normale“ Inhalt – klar getrennt vom Foto */}

        {/* HOTEL */}
        <section id="hotel" className="relative z-20 py-24 bg-slate-50">
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
        <section id="rooms" className="relative z-20 py-24 bg-white">
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
        <section id="restaurant" className="relative z-20 py-24 bg-slate-50">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-4 text-sm tracking-[0.3em] uppercase text-slate-500">
              Restaurant
            </h2>
            <p className="max-w-2xl text-slate-700">
              Restaurant Sektion – Beschreibung von Restaurant &amp; Bar.
            </p>
          </div>
        </section>

        {/* WELLNESS */}
        <section id="wellness" className="relative z-20 py-24 bg-white">
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
        <section id="gallery" className="relative z-20 py-24 bg-slate-50">
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
        <section id="contact" className="relative z-20 py-24 bg-white">
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
    </>
  );
}
