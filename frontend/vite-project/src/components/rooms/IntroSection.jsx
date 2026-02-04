import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from '../Modal.jsx'

export default function IntroSection() {
  const { t } = useTranslation('rooms')
  const [openModal, setOpenModal] = useState(null)
  // null | "included" | "goodToKnow" | "culinary"

  return (
    <section className="bg-[#f7efe7] py-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* 🔹 ЗАГОЛОВОК */}
        <h2 className="text-4xl md:text-5xl font-light text-[#b2854e] tracking-wide">
          {t('intro.title')}
        </h2>

        {/* 🔹 ТЕКСТ */}
        <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
          {t('intro.text')}
        </p>

        {/* 🔹 ССЫЛКИ */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-x-8 gap-y-4">
          <button
            onClick={() => setOpenModal('included')}
            className="text-sm font-medium text-[#c52b58] underline underline-offset-4 hover:text-[#a52348] transition"
          >
            {t('intro.links.included')}
          </button>

          <button
            onClick={() => setOpenModal('goodToKnow')}
            className="text-sm font-medium text-[#c52b58] underline underline-offset-4 hover:text-[#a52348] transition"
          >
            {t('intro.links.goodToKnow')}
          </button>

          <button
            onClick={() => setOpenModal('culinary')}
            className="text-sm font-medium text-[#c52b58] underline underline-offset-4 hover:text-[#a52348] transition"
          >
            {t('intro.links.culinaryCredit')}
          </button>
        </div>

        {/* 🔹 MODALS */}
        <Modal
          isOpen={openModal === 'included'}
          onClose={() => setOpenModal(null)}
        >
          <h3 className="text-xl font-semibold mb-4">Inklusivleistungen</h3>
          <ul className="list-disc list-inside text-neutral-700 space-y-2">
            <li>Frühstück Buffet</li>
            <li>Mit à la carte Optionen</li>
            <li>CHF 100 Guthaben für Speisen und Getränke</li>
            <li>Kostenlose Minibar</li>
            <li>24 Stunden Shuttle-Service</li>
            <li>24 Stunden Concierge-Service</li>
          </ul>
        </Modal>

        <Modal
          isOpen={openModal === 'goodToKnow'}
          onClose={() => setOpenModal(null)}
        >
          <h3 className="text-xl font-semibold mb-4">Gut zu wissen</h3>
          <p className="text-neutral-700 leading-relaxed">
            Ihr Zimmer oder Ihre Suite steht Ihnen am Anreisetag ab 15 Uhr und
            am Abreisetag bis 12 Uhr zur Verfügung. Wenn Sie früher ankommen
            oder später abreisen, kümmert sich unser Concierge-Team gerne um Ihr
            Gepäck. Anreise per Flugzeug Das MOA Hotel  ist in gut
            3 Stunden von den internationalen Flughäfen Zürich und Mailand
            erreichbar. Zudem ist das MOA Hotel nur 7 km von Europas
            höchstgelegenem Flugplatz Samedan entfernt, von wo wir gerne einen
            kostenfreien Transfer zum Hotel organisieren. Bitte informieren Sie
            uns über Ihre Ankunftszeit. Anreise per Zug Bitte informieren Sie
            uns über Ihre Ankunftszeit in St. Moritz. Wir freuen uns, Sie direkt
            am Bahnhof abzuholen. Reisen Sie ganz entspannt ohne Gepäck nach St.
            Moritz. So haben Sie Hände und Kopf frei und können unbeschwert Ihre
            Reise geniessen. Weitere Informationen finden Sie unter
            sbb.ch/gepäck. Ladestation Elektro-Fahrzeuge Wir freuen uns sehr,
            Ihnen zwei Tesla sowie eine Porsche Ladestation zur Verfügung zu
            stellen (und zwei AC Ladestationen Typ 2 a 22 KW) und so einen
            Beitrag zur nachhaltigen Mobilität zu leisten. Als Hotelgast können
            Sie Ihr Fahrzeug ganz bequem und kostenlos aufladen. Dass Sie Ihren
            Parkplatz im Voraus über die Rezeption buchen, schätzen wir sehr.
          </p>
        </Modal>

        <Modal
          isOpen={openModal === 'culinary'}
          onClose={() => setOpenModal(null)}
        >
          <h3 className="text-xl font-semibold mb-4">Culinary Credit</h3>
          <p className="text-neutral-700 leading-relaxed">
            Wir schenken Ihnen täglich ein kulinarisches Guthaben in Höhe von
            CHF 100 pro Person. Bei einer Direktbuchung über unsere Webseite,
            per Telefon oder Mail erhalten unsere Gäste jeden Tag aufs Neue ein
            Guthaben für Speisen und Getränke in Höhe von CHF 100 pro Person
            geschenkt. Dieses Guthaben können Sie in den hoteleigenen
            Restaurationen als auch dem Roomservice einlösen. Das kulinarische
            Guthaben gilt für bis zu zwei Personen pro Schlafzimmer und ab 12
            Jahren. Es ist nicht übertragbar, kann nicht ausgezahlt werden und
            verfällt täglich.
          </p>
        </Modal>
      </div>
    </section>
  )
}
