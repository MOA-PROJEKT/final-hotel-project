import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { rooms } from "../data/rooms";

export default function RoomTemplate({
  roomId,
  images = [],     // 👈 Bilder kommen von außen
  heroIndex = 0,
  heroText,
  overviewText,
  equipmentList = [],
}) {
  useEffect(() => window.scrollTo(0, 0), []);

  const room = rooms.find((r) => r.id === roomId);

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  if (!room) {
    return <div style={{ padding: 50 }}>Zimmer nicht gefunden</div>;
  }

  const hero = images[heroIndex] || images[0] || room.image;

  const next = () => setActive((i) => (i + 1) % images.length);
  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);

  return (
    <main className="bg-[#f7efe7] text-neutral-800 min-h-screen">
      {/* HERO */}
      <section className="relative">
        <div className="h-[420px] w-full overflow-hidden">
          <img src={hero} alt={room.name} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-4xl font-semibold">{room.name}</h1>
          <p className="mt-2 max-w-2xl">{heroText}</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-12 gap-10">
        {/* TEXT */}
        <div className="lg:col-span-5">
          <h2 className="text-2xl font-semibold mb-4">Überblick</h2>
          <p className="mb-6">{overviewText}</p>

          <h3 className="font-semibold mb-2">Ausstattung</h3>
          <ul className="list-disc pl-5 space-y-1">
            {equipmentList.map((i) => <li key={i}>{i}</li>)}
          </ul>

          <p className="mt-6 text-2xl font-semibold">
            CHF {room.price} <span className="text-sm">/ Nacht</span>
          </p>

          <Link
            to={`/rooms/${room.id}`}
            className="inline-block mt-6 bg-[#c52b58] text-white px-8 py-3"
          >
            Buchen
          </Link>
        </div>

        {/* GALERIE */}
        <div className="lg:col-span-7">
          <img
            src={images[active]}
            className="w-full h-[420px] object-cover cursor-pointer"
            onClick={() => setOpen(true)}
          />

          <div className="grid grid-cols-5 gap-2 mt-4">
            {images.map((img, i) => (
              <img
                key={img}
                src={img}
                className={`h-20 object-cover cursor-pointer ${i === active ? "ring-2 ring-[#c52b58]" : ""}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center" onClick={() => setOpen(false)}>
          <img src={images[active]} className="max-h-[90vh]" />
        </div>
      )}
    </main>
  );
}
