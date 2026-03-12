// app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video de fundal */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/videos/welcome-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay întunecat */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        {/* Conținut hero */}
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Spații premium pentru evenimente & creație
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Studiouri foto, săli de evenimente, spații co-working – totul într-un singur loc modern și versatil.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/booking"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-xl text-xl font-semibold transition shadow-lg"
            >
              Rezervă acum
            </Link>
            <Link
              href="#spatii"
              className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-10 py-5 rounded-xl text-xl font-semibold transition"
            >
              Vezi spațiile
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Secțiune Spații (grid card-uri) */}
      <section id="spatii" className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900">
            Descoperă spațiile noastre
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            Alege spațiul perfect pentru evenimentul tău, ședința foto sau ziua de lucru creativă.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64">
                <Image
                  src="/images/sala1.jpg"
                  alt="Sala foto studio"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">Sala Panoramica</h3>
                <p className="text-gray-600 mb-6">
                  Spațiu luminos de 80 m² cu vedere panoramica, lumini profesionale și accesorii incluse.
                </p>
                <Link
                  href="/public/images/sala1.jpg"
                  className="text-indigo-600 font-semibold hover:text-indigo-800 transition"
                >
                  Vezi detalii →
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64">
                <Image
                  src="/images/sala-evenimente.jpg"
                  alt="Sala evenimente"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">Sala Evenimente 120 m²</h3>
                <p className="text-gray-600 mb-6">
                  Ideală pentru petreceri private, lansări, workshop-uri, capacitate până la 80 persoane.
                </p>
                <Link
                  href="/public/images/sala3.jpg"
                  className="text-indigo-600 font-semibold hover:text-indigo-800 transition"
                >
                  Vezi detalii →
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64">
                <Image
                  src="/images/co-working.jpg"
                  alt="Co-working space"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">Co-working & Creative Hub</h3>
                <p className="text-gray-600 mb-6">
                  Zone de lucru liniștite, mese lungi, internet rapid, cafea inclusă – pentru freelanceri & echipe mici.
                </p>
                <Link
                  href="/public/images/sala2.jpg"
                  className="text-indigo-600 font-semibold hover:text-indigo-800 transition"
                >
                  Vezi detalii →
                </Link>
              </div>
            </div>

            {/* Poți adăuga încă 2-3 carduri similare */}
          </div>
        </div>
      </section>

      {/* 3. Secțiune CTA finală */}
      <section className="py-20 bg-indigo-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Gata să-ți rezervi spațiul preferat?
          </h2>
          <p className="text-xl mb-10">
            Rezervările sunt simple și rapide. Alege data și ora care ți se potrivește.
          </p>
          <Link
            href="/booking"
            className="inline-block bg-white text-indigo-600 px-12 py-6 rounded-xl text-2xl font-bold hover:bg-gray-100 transition shadow-lg"
          >
            Rezervă acum
          </Link>
        </div>
      </section>
    </div>
  );
}