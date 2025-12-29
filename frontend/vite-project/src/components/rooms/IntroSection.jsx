// src/components/rooms/IntroSection.jsx

export default function IntroSection() {
  return (
    <section className="bg-[#faf5f0] py-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Заголовок */}
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#b2854e]">
          Zimmer und Suiten
        </h2>

        {/* Текст */}
        <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
          Ruhen Sie sich aus und blicken Sie auf das Engadiner Tal hinunter.
          Jedes Zimmer im Carlton bietet einen unvergesslichen Blick auf den St.
          Moritzersee und Raum, um sich ganz zu entspannen.
        </p>

        {/* Три текстовые ссылки */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-x-8 gap-y-4">
          <a
            href="#"
            className="text-sm font-medium text-[#c52b58] underline underline-offset-4 hover:text-[#a52348] transition"
          >
            Inklusivleistungen
          </a>

          <a
            href="#"
            className="text-sm font-medium text-[#c52b58] underline underline-offset-4 hover:text-[#a52348] transition"
          >
            Gut zu wissen
          </a>

          <a
            href="#"
            className="text-sm font-medium text-[#c52b58] underline underline-offset-4 hover:text-[#a52348] transition"
          >
            Culinary Credit
          </a>
        </div>
      </div>
    </section>
  )
}
