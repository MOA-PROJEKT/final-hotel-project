// src/pages/Rooms.jsx
import { rooms } from "../data/rooms";
import RoomList from "../components/rooms/RoomList";

export default function Rooms() {
  return (
    <main className="bg-slate-950 text-white pt-32 min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-16">
        {/* Headline – angelehnt an Carlton-Text */}
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">
            Zimmer &amp; Suiten
          </p>
          <h1 className="mb-4 text-3xl sm:text-4xl font-semibold">
            Ruhen Sie sich aus – mit Blick über See und Berge.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Jedes Zimmer öffnet den Blick weit über das Tal und den See und
            schenkt Raum, um wirklich zur Ruhe zu kommen. Warme Materialien,
            abgestimmte Farbwelten und maßgefertigte Möbel schaffen eine
            Atmosphäre, in der der Tag sanft ausklingt und der nächste Morgen
            leicht beginnt.
          </p>
        </header>

        {/* Drei Info-Kacheln wie „Inklusivleistungen / Gut zu wissen / Culinary Credit“ */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {["Inklusivleistungen", "Gut zu wissen", "Culinary Credit"].map(
            (item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-4"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-1">
                  {item}
                </p>
                <p className="text-xs text-slate-300">
                  Hier könnt ihr später die wichtigsten Informationen für eure
                  Gäste ergänzen.
                </p>
              </div>
            )
          )}
        </div>

        {/* Grid mit Karten */}
        <RoomList rooms={rooms} />
      </section>
    </main>
  );
}
