// app/page.tsx
"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/Video/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-6xl font-bold mb-4">Premium Park</h1>
        <p className="text-xl mb-8">Where elegance meets nature</p>
        <Link href="/booking">
          <button className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition">
            Book a Visit
          </button>
        </Link>
      </div>
    </div>
  );
}