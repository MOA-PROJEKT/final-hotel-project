export default function Danke() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-semibold text-[#b38b4d] mb-4">
          Vielen Dank
        </h1>

        <p className="text-gray-700 leading-relaxed mb-6">
          Vielen Dank für Ihre Anfrage.
          <br />
          Wir werden uns so schnell wie möglich bei Ihnen melden.
        </p>

        <a
          href="/"
          className="inline-block bg-[#c50355] text-white px-8 py-3 rounded-lg text-lg transition"
        >
          Zurück zur Startseite
        </a>
      </div>
    </section>
  );
}
