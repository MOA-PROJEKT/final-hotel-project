// src/pages/Rooms.jsx

import { rooms } from '../data/rooms'
import RoomList from '../components/rooms/RoomList'
import RoomsHero from '../components/rooms/RoomsHero'
import RoomsSlider from '../components/rooms/RoomsSlider'
import IntroSection from '../components/rooms/IntroSection'

export default function Rooms() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <RoomsHero />

      {/* ================= INTRO SECTION ================= */}
      {/* Этот section — якорь для кнопки "Mehr entdecken" */}
      <section id="rooms-intro" className="bg-[#f7efe7] text-neutral-800">
        <IntroSection />
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <main className="bg-[#f7efe7] text-neutral-800 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-20 space-y-20">
          {/* ================= ROOMS SLIDER ================= */}
          <RoomsSlider />

          {/* ================= ROOMS GRID ================= */}
          <RoomList rooms={rooms} />
        </div>
      </main>
    </>
  )
}
