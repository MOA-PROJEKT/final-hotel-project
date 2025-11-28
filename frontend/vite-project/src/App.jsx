import Footer from "./components/layout/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <h1 className="text-4xl font-semibold text-emerald-500">
          MOA Haven – Tailwind läuft 🎉
        </h1>
      </main>

      <Footer />
    </div>
  );
}
