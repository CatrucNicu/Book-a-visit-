"use client";

import { useState, useEffect } from "react";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  // fetch ore disponibile la schimbarea datei
  useEffect(() => {
    if (!date) {
      setAvailableSlots([]);
      return;
    }

    fetch(`/api/slots?date=${date}`)
      .then(res => res.json())
      .then(data => setAvailableSlots(data.slots))
      .catch(err => console.error(err));
  }, [date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !date || !time) {
      alert("Completează toate câmpurile!");
      return;
    }

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, date, time }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setName("");
        setPhone("");
        setDate("");
        setTime("");
        alert("Rezervare făcută cu succes!");
      } else {
        alert("A apărut o eroare. Încearcă din nou.");
      }
    } catch (err) {
      console.error(err);
      alert("A apărut o eroare la server.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
    >
      {/* Name */}
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-4 text-black"
        required
      />

      {/* Phone */}
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-4 text-black"
        required
      />

      {/* Date */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-4 text-black"
        required
      />

      {/* Time dropdown */}
      <select
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-4 text-black"
        required
      >
        <option value="">Select Time</option>
        {availableSlots.length > 0 ? (
          availableSlots.map(slot => (
            <option key={slot} value={slot}>{slot}</option>
          ))
        ) : (
          <option disabled>Nu există ore disponibile</option>
        )}
      </select>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold shadow-md"
      >
        Confirm Booking
      </button>

      {submitted && (
        <p className="mt-4 text-green-600 font-semibold">
          Rezervarea a fost trimisă!
        </p>
      )}
    </form>
  );
}