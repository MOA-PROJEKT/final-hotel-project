import React from 'react'

export default function Impressum() {
  return (
    <main className="flex items-center justify-center min-h-screen px-6 bg-[#adc3c7]">
      <div className="max-w-2xl text-center text-slate-700">
        <h1 className="text-3xl font-semibold mb-6">Impressum</h1>

        <p>
          <strong>MOA HOTEL PARADISE GmbH</strong>
        </p>
        <p>Inhaber: Max Mustermann</p>
        <p>
          Musterstraße 10
          <br />
          12345 Musterstadt
          <br />
          Schweiz
        </p>
        <p>
          Telefon: +41 11 123 45 67
          <br />
          E-Mail:{' '}
          <a href="mailto:moa@hotel.ch" className="text-rose-500">
            moa@hotel.ch
          </a>
        </p>
        <p>Geschäftsführer: Max Mustermann</p>
        <p>Handelsregister: HRB 12345, Amtsgericht Musterstadt</p>
        <p>Umsatzsteuer-ID: CH123456789</p>
      </div>
    </main>
  )
}
