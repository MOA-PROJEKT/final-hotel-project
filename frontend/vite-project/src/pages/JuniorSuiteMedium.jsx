import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { rooms } from "../data/rooms";

export default function JuniorSuiteMedium() {
  useEffect(() => window.scrollTo(0, 0), []);

  const room = useMemo(
    () => rooms.find((r) => r.id === "junior-suite-medium"),
    []
  );

  // ✅ gleiche Bilder wie Deluxe (gleicher Ordner)
  const images = useMemo(() => {
    const modules = import.meta.glob(
      "../assets/images/zimmer/deluxe-Doppelzimmer/*.{jpg,jpeg,png,webp}",
      { eager: true, import: "default" }
    );

    const list = Object.values(modules);

    list.sort((a, b) => {
      const na = Number(String(a).match(/z(\d+)/i)?.[1] ?? 0);
      const nb = Number(String(b).match(/z(\d+)/i)?.[1] ?? 0);
      return na - nb;
    });

    return list;
  }, []);

  // ✅ hier Hero wählen: 0=z1, 1=z2, 2=z3 ...
  const DEFAULT_HERO_INDEX = 1;

  const [active, setActive] = useState(DEFAULT_HERO_INDEX);
  const [open, setOpen] = useState(false);

  if (!room) {
    return (
      <main className="min-h-screen bg-[#f7efe7] text-neutral-800 flex items-center justify-center px-4">
        <div className="max-w-xl text-center bg-white/70 border border-black/10 rounded-2xl p-8">
          <h1 className="text-2xl font-semibold mb-2">Zimmer nicht gefunden</h1>
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

  const hero = images[DEFAULT_HERO_INDEX] || images[0] || room.image;

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
              Gemütliche Junior Suite mit kombiniertem Wohn- und Schlafraum, Kingsize-Bett und nach
              Süden ausgerichtetem Blick auf die Landschaft mit Panoramablick über den See.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* LEFT */}
          <div className="lg:col-span-5 space-y-6">
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
                Gemütliche Junior Suite mit kombiniertem Wohn- und Schlafraum, Kingsize-Bett und nach
                Süden ausgerichtetem Blick auf die Landschaft mit Panoramablick über den See.
                <br /><br />
              </p>

              <div className="mt-6 border-t border-black/10 pt-6">
                <h3 className="text-lg font-semibold mb-3">Ausstattung</h3>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#c52b58]" />
                    55 m² kombinierter Wohn- & Schlafbereich
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#c52b58]" />
                    Kingsize-Bett
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#c52b58]" />
                    Blick nach Süden (Panorama)
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#c52b58]" />
                    Panoramablick über den See
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
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white/70 border border-black/10 rounded-2xl p-4 h-[590px]">
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={images[active] || hero}
                  alt={`${room.name} ${active + 1}`}
                  className="w-full h-[280px] sm:h-[460px] object-cover"
                  onClick={() => setOpen(true)}
                  style={{ cursor: "zoom-in" }}
                />

                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 border border-black/10 flex items-center justify-center hover:bg-white"
                  aria-label="Vorheriges Bild"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 border border-black/10 flex items-center justify-center hover:bg-white"
                  aria-label="Nächstes Bild"
                >
                  ›
                </button>

                <div className="absolute bottom-3 right-3 text-xs bg-white/90 border border-black/10 rounded-full px-3 py-1">
                  {images.length ? `${active + 1} / ${images.length}` : "1 / 1"}
                </div>
              </div>

              {/* Thumbnails (mit Hover-Zoom) */}
              {images.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2 mt-7">
                  {images.map((src, idx) => (
                    <button
                      key={src}
                      onClick={() => setActive(idx)}
                      className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 transform ${
                        idx === active
                          ? "border-[#c52b58] scale-105 z-10"
                          : "border-transparent opacity-70 hover:opacity-100 hover:scale-110 hover:z-20 hover:shadow-lg"
                      }`}
                      aria-label={`Bild ${idx + 1} auswählen`}
                    >
                      <img src={src} alt={`Thumb ${idx + 1}`} className="w-full h-14 object-cover" />
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
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white text-neutral-900 flex items-center justify-center"
              aria-label="Schließen"
            >
              ✕
            </button>

            <div className="relative rounded-2xl overflow-hidden bg-black">
              <img
                src={images[active] || hero}
                alt="Großansicht"
                className="w-full max-h-[80vh] object-contain"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 border border-black/10 flex items-center justify-center hover:bg-white"
                    aria-label="Vorheriges Bild"
                  >
                    ‹
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 border border-black/10 flex items-center justify-center hover:bg-white"
                    aria-label="Nächstes Bild"
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
