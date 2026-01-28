import React from 'react'

export default function Impressum() {
  return (
    <main className="flex md:items-center justify-center min-h-screen px-6 pt-24 md:pt-0 bg-[#adc3c7]">
      <div className="max-w-2xl text-center text-slate-700">
        <h1 className="text-3xl font-semibold mb-6">Impressum</h1>

        <p>
          <strong>MOA HOTEL PARADISE GmbH</strong>
        </p>
        <p>Inhaber: MOA</p>
        <p>
          Steinstrasse 11
          <br />
          40212 Düsseldorf
          <br />
          deustchland
        </p>
        <p>
          Telefon: +491 11 123 45 67
          <br />
          E-Mail:{' '}
          <a href="mailto:moa@hotel.ch" className="text-rose-500">
            moa@hotel.ch
          </a>
        </p>
        <p>Geschäftsführer: MOA</p>
        <p>Handelsregister: MOA 12345, Amtsgericht düsseldorf</p>
        <p>Umsatzsteuer-ID: MOA123456789</p>
      </div>
    </main>
  )
}
