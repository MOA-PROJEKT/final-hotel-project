import React from 'react'

export default function Datenschutz() {
  return (
    <main className="flex items-center justify-center min-h-screen py-6 pt-24 md:pt-[200px] bg-[#adc3c7]">
      <div className="max-w-3xl text-center text-slate-700">
        <h1 className="text-3xl font-semibold mb-6">Datenschutzerklärung</h1>

        {/* Verantwortlicher */}
        <div className="text-left">
          <h2 className="text-xl font-medium mt-6 mb-2">1. Verantwortlicher</h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
            <strong>MOA HOTEL PARADISE GmbH</strong><br />
            Musterstraße 10, 12345 Musterstadt<br />
            E-Mail: <a href="mailto:moa@hotel.ch" className="text-rose-500">moa@hotel.ch</a><br />
            Telefon: +41 11 123 45 67
          </p>

          <h2 className="text-xl font-medium mt-6 mb-2">2. Datenerhebung und -verwendung</h2>
          <p>Wir erheben personenbezogene Daten nur, soweit dies erforderlich ist, z. B. für:</p>
          <ul className="list-disc ml-6">
            <li>Buchungen und Reservierungen</li>
            <li>Bearbeitung von Anfragen</li>
            <li>Newsletter (falls angemeldet)</li>
          </ul>

          <h2 className="text-xl font-medium mt-6 mb-2">3. Rechtsgrundlage</h2>
          <ul className="list-disc ml-6">
            <li>Vertragserfüllung (Buchung, Rechnung)</li>
            <li>Einwilligung (Newsletter, Cookies)</li>
            <li>Berechtigtes Interesse (z. B. IT-Sicherheit)</li>
          </ul>

          

          <h2 className="text-xl font-medium mt-6 mb-2">4. Datenweitergabe</h2>
          <p>Daten können an Dienstleister weitergegeben werden, z. B.:</p>
          <ul className="list-disc ml-6">
            <li>Buchungsplattformen (z. B. Booking.com)</li>
            <li>IT-Dienstleister zur Wartung der Website</li>
          </ul>

          <h2 className="text-xl font-medium mt-6 mb-2">5. Speicherdauer</h2>
          <p>Personenbezogene Daten werden nur so lange gespeichert, wie es für den Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.</p>

          <h2 className="text-xl font-medium mt-6 mb-2">6. Rechte der Betroffenen</h2>
          <ul className="list-disc ml-6">
            <li>Auskunft über gespeicherte Daten</li>
            <li>Berichtigung oder Löschung</li>
            <li>Einschränkung der Verarbeitung</li>
            <li>Widerspruch gegen Verarbeitung</li>
            <li>Datenübertragbarkeit</li>
          </ul>

          <h2 className="text-xl font-medium mt-6 mb-2">7. Kontakt Datenschutzbeauftragter</h2>
          <p>Falls vorhanden, können Sie unseren Datenschutzbeauftragten unter <a href="mailto:datenschutz@hotel.ch" className="text-rose-500">datenschutz@hotel.ch</a> kontaktieren.</p>
        </div>
      </div>
    </main>
  )
}
