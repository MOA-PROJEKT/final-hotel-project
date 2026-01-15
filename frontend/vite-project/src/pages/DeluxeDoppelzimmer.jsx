import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { rooms } from "../data/rooms";

export default function DeluxeDoppelzimmer() {
  useEffect(() => window.scrollTo(0, 0), []);

  // ✅ Hole Room-Daten aus rooms.js
  const room = useMemo(() => rooms.find((r) => r.id === "deluxe-double"), []);

  // ✅ Bilder einlesen: NUR 1 Bild pro z1..z9 (webp > jpg/jpeg > png)
  const images = useMemo(() => {
    const modules = import.meta.glob(
      "../assets/images/zimmer/deluxe-Doppelzimmer/*.{jpg,jpeg,png,webp}",
      { eager: true, import: "default" }
    );

    // Wir nutzen die Keys (Dateipfade), um die Nummer z1, z2 ... zu erkennen
    const entries = Object.entries(modules); // [ [path, url], ... ]

    // Priorität der Formate (falls pro Nummer mehrere existieren)
    const extScore = (path) => {
      const p = path.toLowerCase();
      if (p.endsWith(".webp")) return 4;
      if (p.endsWith(".jpg") || p.endsWith(".jpeg")) return 3;
      if (p.endsWith(".png")) return 2;
      return 1;
    };

    // Map: nummer -> { path, url }
    const bestByNumber = new Map();

    for (const [path, url] of entries) {
      const num = Number(path.match(/z(\d+)/i)?.[1] ?? 0);
      if (!num) continue; // nur Dateien mit z<number>

      const current = bestByNumber.get(num);
      if (!current) {
        bestByNumber.set(num, { path, url });
      } else {
        // wenn neues Format besser ist, ersetzen
        if (extScore(path) > extScore(current.path)) {
          bestByNumber.set(num, { path, url });
        }
      }
    }

    // sortiert nach z1..z9 und als URL-Array zurückgeben
    const sorted = [...bestByNumber.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([, obj]) => obj.url);

    // ✅ Maximal 9 Bilder
    return sorted.slice(0, 9);
  }, []);

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  // Falls active außerhalb liegt (z.B. wenn images später kürzer ist)
  useEffect(() => {
    if (active >= images.length) setActive(0);
  }, [images.length, active]);

  if (!room) {
    return (
      <main className="min-h-screen bg-[#f7efe7] text-neutral-800 flex items-center justify-center px-4">
        <div className="max-w-xl text-center bg-white/70 border border-black/10 rounded-2xl p-8">
          <h1 className="text-2xl font-semibold mb-2">Zimmer nicht gefunden</h1>
          <p className="text-neutral-600">
            Prüfe bitte, ob in <code>rooms.js</code> die ID <b>deluxe-double</b> existiert.
          </p>
          <Link
            to="/rooms"
            className="inline-block mt-6 border border-[#c52b58] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c52b58] hover:bg-[#c52b58] hover:text-white transition"
          >
            Zurück zu Zimmern
          </Link>
        </div>
      </main>
    );
  }

  const hero = images[0] || room.image;

  const next = () => setActive((i) => (i + 1) % Math.max(images.length, 1));
  const prev = () =>
    setActive((i) => (i - 1 + Math.max(images.length, 1)) % Math.max(images.length, 1));

  return (
    <main className="bg-[#f7efe7] text-neutral-800 min-h-screen">
      {/* HERO */}
      <section className="relative">
        <div className="h-[320px] sm:h-[420px] w-full overflow-hidden">
          <img src={hero} alt={room.name} className="h-full w-full object-cover" />
        </div>

        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute bottom-6 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 text-white/90 text-sm">
              <Link to="/rooms" className="underline underline-offset-4 hover:text-white">
                Zimmer
              </Link>
              <span className="opacity-70">/</span>
              <span className="font-medium text-white">{room.name}</span>
            </div>
            <h1 className="mt-2 text-white text-3xl sm:text-4xl font-semibold">
              {room.name}
            </h1>
            <p className="mt-2 text-white/90 max-w-2xl text-sm sm:text-base leading-relaxed">
              Moderne Eleganz, grosszügiges Bad und ein einzigartiger Blick über den St. Moritzersee
              und die Berge.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: Text + Ausstattung */}
          <div className="lg:col-span-5 space-y-6 ">
            <div className="bg-white/70 border border-black/10 rounded-2xl p-6 h-[590px]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
                    {room.category}
                  </p>
                  <h2 className="text-2xl font-semibold mt-2">Überblick</h2>
                </div>
                <div className="text-right">
                  <p className="text-xs text-neutral-500">Größe</p>
                  <p className="font-medium">{room.size}</p>
                </div>
              </div>

              <p className="mt-4 text-neutral-700 leading-relaxed">
                Die luxuriösen Deluxe Doppelzimmer bieten ein modernes Interieur mit einem Schlafzimmer
                sowie grosszügigem Badezimmer. Einige Bäder sind mit separater Dusche und Badewanne
                ausgestattet, während andere ausschliesslich eine Dusche haben. Während die meisten
                Deluxe Doppelzimmer über einen Balkon verfügen, haben alle einen einzigartigen Blick
                über den St. Moritzersee und die Berge.
              </p>

              <div className="mt-6 border-t border-black/10 pt-6">
                <h3 className="text-lg font-semibold mb-3">Ausstattung</h3>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#c52b58]" />
                    35–45 m² kombinierter Wohn- & Schlafbereich
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#c52b58]" />
                    King-Size Bett
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#c52b58]" />
                    Teilweise mit Badewanne
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#c52b58]" />
                    Aussicht auf St. Moritzersee & Berge
                  </li>
                </ul>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-neutral-500">ab</p>
                    <p className="text-2xl font-semibold">
                      CHF {room.price}{" "}
                      <span className="text-sm font-normal text-neutral-500">/ Nacht</span>
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      Max. Gäste:{" "}
                      <span className="text-neutral-800 font-medium">{room.maxGuests}</span>
                    </p>
                  </div>

                  <Link
                    to={`/rooms/${room.id}`}
                    className="border bg-[#c52b58]  px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-[#c52b58] hover:border-[#c52b58]"
                  >
                    Buchen
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/rooms"
              className="inline-block text-sm font-medium text-[#c52b58] underline underline-offset-4 hover:text-[#a52348] transition"
            >
              ← Zurück zur Zimmerübersicht
            </Link>
          </div>

          {/* RIGHT: Galerie */}
          <div className="lg:col-span-7 space-y-4 ">
            <div className="bg-white/70 border border-black/10 rounded-2xl p-4 h-[590px] ">
              <div className="relative rounded-xl overflow-hidden shadow-sm">
                <img
                  src={images[active] || hero}
                  alt={`Deluxe ${active + 1}`}
                  className="w-full h-[280px] sm:h-[460px] object-cover transition-opacity duration-300"
                  onClick={() => setOpen(true)}
                  style={{ cursor: "zoom-in" }}
                />

                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 border border-black/10 flex items-center justify-center hover:bg-white transition-colors"
                  aria-label="Vorheriges Bild"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 border border-black/10 flex items-center justify-center hover:bg-white transition-colors"
                  aria-label="Nächstes Bild"
                >
                  ›
                </button>

                <div className="absolute bottom-3 right-3 text-xs bg-white/90 border border-black/10 rounded-full px-3 py-1">
                  {images.length ? `${active + 1} / ${images.length}` : "1 / 1"}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2 mt-7">
                  {images.map((src, idx) => (
                    <button
                      key={src} // ✅ besser als idx, verhindert React-“Doppel”-Render Effekte
                      onClick={() => setActive(idx)}
                      className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                        idx === active
                          ? "border-[#c52b58] scale-105 z-10"
                          : "border-transparent opacity-70 hover:opacity-100 hover:scale-110 hover:z-20 hover:shadow-lg"
                      }`}
                      aria-label={`Bild ${idx + 1} auswählen`}
                    >
                      <img
                        src={src}
                        alt={`Thumb ${idx + 1}`}
                        className="w-full h-14 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {open && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-4"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white text-neutral-900 flex items-center justify-center text-xl"
              aria-label="Schließen"
            >
              ✕
            </button>

            <div className="relative rounded-2xl overflow-hidden bg-black">
              <img
                src={images[active] || hero}
                alt="Großansicht"
                className="w-full max-h-[85vh] object-contain"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/40 text-white border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
                  >
                    ‹
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/40 text-white border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
