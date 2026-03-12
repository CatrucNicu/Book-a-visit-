"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventApi, EventInput } from "@fullcalendar/core";
import BookingModal from "./BookingModal";

// ────────────────────────────────────────────────
// Interfață unificată – id ca number pentru compatibilitate cu BookingModal
// ────────────────────────────────────────────────
export interface Booking {
  id: number;
  name: string | null;
  phone: string | null;
  date: string | null;
  time: string | null;
  status: "pending" | "done" | null;
  dateTime: string | null;
}

export default function BookingCalendar() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      if (!res.ok) {
        console.error("Fetch failed:", res.status, res.statusText);
        return;
      }
      const rawData = await res.json();
      
      // Keep id as number for FullCalendar compatibility
      const normalized = rawData.map((item: any) => ({
        ...item,
      })) as Booking[];

      setBookings(normalized);
    } catch (err) {
      console.error("Fetch bookings error:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleEventClick = (info: { event: EventApi }) => {
    const eventId = info.event.id;
    if (!eventId) return;

    const booking = bookings.find(b => String(b.id) === eventId);
    if (booking) {
      setSelectedBooking(booking);
    }
  };

  const handleEventDrop = async (info: { event: EventApi; revert: () => void }) => {
    const eventId = info.event.id;
    const newStart = info.event.start;

    if (!eventId || !newStart) {
      info.revert();
      alert("Date sau eveniment invalid");
      return;
    }

    const idNumber = Number(eventId);
    if (Number.isNaN(idNumber)) {
      info.revert();
      alert("ID invalid");
      return;
    }

    try {
      const res = await fetch(`/api/bookings/${idNumber}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dateTime: newStart.toISOString() }),
      });

      if (!res.ok) {
        let errorMsg = "";
        try {
          const errBody = await res.json();
          errorMsg = errBody.error || `HTTP ${res.status}`;
        } catch {
          errorMsg = `HTTP ${res.status}`;
        }
        throw new Error(errorMsg);
      }

      const data = await res.json();
      if (data.success) {
        await fetchBookings();
      } else {
        info.revert();
        alert(data.error || "Actualizarea a eșuat");
      }
    } catch (err: any) {
      info.revert();
      console.error("Eroare la mutare:", err);
      alert(`Eroare la mutare: ${err.message || "eroare necunoscută"}`);
    }
  };

const events: EventInput[] = bookings
  .filter(b => b.id != null)
  .map((b) => {
    let start: Date | null = null;

    // 1. Prioritate: dateTime dacă există
    if (b.dateTime) {
      let dt = b.dateTime.trim();

      // Corecție rapidă pentru formatul greșit ":00:00"
      if (dt.endsWith(':00:00')) {
        dt = dt.replace(/:00:00$/, ':00');
      }

      start = new Date(dt);
      console.log(`[PARSE dateTime] id ${b.id}: ${dt} → ${start.toISOString() || 'INVALID'}`);
    }

    // 2. Fallback: date + time
    else if (b.date && b.time) {
      let t = b.time.trim();

      // Normalizare time
      if (t.length === 5 && t.includes(':')) t += ':00';
      if (t.endsWith(':00:00')) t = t.replace(/:00:00$/, ':00');

      const combined = `${b.date}T${t}`;
      start = new Date(combined);
      console.log(`[PARSE date+time] id ${b.id}: ${combined} → ${start.toISOString() || 'INVALID'}`);
    }

    if (!start || isNaN(start.getTime())) {
      console.warn(`[INVALID] id ${b.id} – dateTime: ${b.dateTime}, date: ${b.date}, time: ${b.time}`);
      return null;
    }

    return {
      id: String(b.id),
      title: b.name || "Rezervare",
      start,
      allDay: false,
      color: b.status === "done" ? "#22c55e" : "#3b82f6",
    };
  })
  .filter((e): e is EventInput => !!e);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        events={events}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        eventResizableFromStart={false}
        droppable={true}
        height="auto"
      />

      {selectedBooking && (
        <BookingModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onUpdate={fetchBookings}
        />
      )}
    </div>
  );
}