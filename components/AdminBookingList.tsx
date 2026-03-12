"use client";

import { useEffect, useState } from "react";

export default function AdminBookingList() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error(err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Se încarcă rezervările...</p>;
  }

  if (!bookings.length) {
    return <p className="p-6 text-center">Nu există rezervări.</p>;
  }

  return (
    <div className="w-full max-w-4xl p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Rezervări</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">Nume</th>
            <th className="border p-2 text-left">Telefon</th>
            <th className="border p-2 text-left">Data</th>
            <th className="border p-2 text-left">Ora</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b: any, i) => {
            const dateObj = new Date(b.date); // transformăm data din DB
            const formattedDate = dateObj.toLocaleDateString("ro-RO", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });
            const formattedTime = dateObj.toLocaleTimeString("ro-RO", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="border p-2">{b.name}</td>
                <td className="border p-2">{b.phone}</td>
                <td className="border p-2">{formattedDate}</td>
                <td className="border p-2">{formattedTime}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}