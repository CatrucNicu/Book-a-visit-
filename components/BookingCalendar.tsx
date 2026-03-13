"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventApi, EventInput } from "@fullcalendar/core";
import Modal from "react-modal";
import BookingModal from "./BookingModal";  // presupun că e BookingModal.tsx, ajustază calea

// Interfață unificată
export interface Booking {
  id: string;
  name?: string | null;
  phone?: string | null;
  date?: string | null;
  time?: string | null;
  status?: "pending" | "done" | null;
  dateTime?: string | null;
}

export default function BookingCalendar() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);  // control modal

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const rawData = await res.json();
      const normalized = rawData.map((item: any) => ({
        ...item,
        id: String(item.id),
      })) as Booking[];
      setBookings(normalized);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchBookings();
    }
  }, [isModalOpen]);

  const handleEventClick = (info: { event: EventApi }) => {
    const eventId = info.event.id;
    if (!eventId) return;
    const booking = bookings.find(b => b.id === eventId);
    if (booking) setSelectedBooking(booking);
  };

  const handleEventDrop = async (info: { event: EventApi; revert: () => void }) => {
    const eventId = info.event.id;
    const newStart = info.event.start;

    if (!eventId || !newStart) {
      info.revert();
      return;
    }

    const idNumber = Number(eventId);
    if (isNaN(idNumber)) {
      info.revert();
      return;
    }

    try {
      const res = await fetch(`/api/bookings/${idNumber}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dateTime: newStart.toISOString() }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.success) {
        fetchBookings();
      } else {
        info.revert();
      }
    } catch (err) {
      info.revert();
      console.error(err);
    }
  };

  const events: EventInput[] = bookings
    .map((b) => {
      let start: Date | null = null;

      if (b.dateTime) {
        start = new Date(b.dateTime);
      } else if (b.date && b.time) {
        let time = b.time.trim();
        if (time.length === 5) time += ':00';
        const combined = `${b.date}T${time}`;
        start = new Date(combined);
      }

      if (!start || isNaN(start.getTime())) return null;

      return {
        id: b.id,
        title: b.name || "Rezervare",
        start,
        allDay: false,
        color: b.status === "done" ? "#22c55e" : "#3b82f6",
      };
    })
    .filter((e): e is EventInput => !!e);

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Deschide Calendar Rezervări
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
          },
        }}
        contentLabel="Calendar Modal"
      >
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ×
        </button>

        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable={true}
          events={events}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
        />

        {selectedBooking && (
          <BookingModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
            onUpdate={fetchBookings}
          />
        )}
      </Modal>
    </div>
  );
}