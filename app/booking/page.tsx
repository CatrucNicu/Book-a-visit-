// app/booking/page.tsx
"use client";

import BookingForm from "../../components/BookingForm";

export default function BookingPage() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center px-4">

      {/* Optional Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Optional Overlay */}
      <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md">
        <BookingForm />
      </div>
    </div>
  );
}