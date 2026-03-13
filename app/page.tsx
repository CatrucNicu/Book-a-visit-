// app/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Hero Section cu video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video de fundal */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay gradient soft */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50 pointer-events-none" />

        {/* Conținut peste video */}
        <div className="relative z-10 text-center text-white px-6 max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-2xl">
            Spații premium pentru evenimente & creație
          </h1>
          <p className="text-xl md:text-2xl mb-10 drop-shadow-xl">
            Săli de evenimente, spații co-working – totul într-un singur loc modern și versatil.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/booking"
              className="bg-[#F5E8C7] hover:bg-[#E8D9B0] text-gray-900 px-10 py-5 rounded-xl text-xl font-semibold transition shadow-lg"
            >
              Rezervă acum
            </Link>
            <Link
              href="#spatii"
              className="border-2 border-[#F5E8C7] hover:bg-[#F5E8C7] hover:text-gray-900 text-white px-10 py-5 rounded-xl text-xl font-semibold transition"
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
                  alt="Sala Panoramica"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">Sala Panoramica</h3>
                <p className="text-gray-600 mb-6">
                  Spațiu luminos de 80 m² cu vedere panoramică, lumini profesionale și accesorii incluse.
                </p>
                <Link
                  href="/spatii/sala-panoramica"
                  className="text-[#D4A017] font-semibold hover:text-[#B88A0F] transition"
                >
                  Vezi detalii →
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64">
                <Image
                  src="/images/image33.jpg"
                  alt="Sala Evenimente 120 m²"
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
                  href="/spatii/sala-evenimente"
                  className="text-[#D4A017] font-semibold hover:text-[#B88A0F] transition"
                >
                  Vezi detalii →
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64">
                <Image
                  src="/images/image22.jpg"
                  alt="GardenView"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">GardenView</h3>
                <p className="text-gray-600 mb-6">
                  Zone de lucru liniștite, mese lungi, cafea inclusă – perfect pentru productivitate.
                </p>
                <Link
                  href="/spatii/gardenview"
                  className="text-[#D4A017] font-semibold hover:text-[#B88A0F] transition"
                >
                  Vezi detalii →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Secțiune CTA finală - schimbat la galben spălat */}
      <section className="py-20 bg-[#F5E8C7] text-gray-900 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Gata să-ți rezervi spațiul preferat?
          </h2>
          <p className="text-xl mb-10">
            Rezervările sunt simple și rapide. Alege data și ora care ți se potrivește.
          </p>
          <Link
            href="/booking"
            className="inline-block bg-gray-900 text-[#F5E8C7] px-12 py-6 rounded-xl text-2xl font-bold hover:bg-gray-800 transition shadow-lg"
          >
            Rezervă acum
          </Link>
        </div>
      </section>
    </div>
  );
}