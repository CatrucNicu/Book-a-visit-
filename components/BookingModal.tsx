"use client";

import React, { useState } from "react";

interface Booking {
  id: number;
  name: string | null;
  phone: string | null;
  date: string | null;
  time: string | null;
  status?: string | null;
  dateTime?: string | null;
}

interface Props {
  booking: Booking;
  onClose: () => void;
  onUpdate: () => void;
}

export default function BookingModal({ booking, onClose, onUpdate }: Props) {
  const [status, setStatus] = useState(booking.status || "pending");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/bookings/${booking.id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        onUpdate();
        onClose();
      } else {
        alert("Delete failed: " + (data.error || ""));
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus(newStatus);
        onUpdate();
      } else {
        alert("Update failed: " + (data.error || ""));
      }
    } catch (err) {
      console.error(err);
      alert("Update failed: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 relative">
        <h2 className="text-xl font-bold mb-4">Booking Details</h2>
        <p><strong>Name:</strong> {booking.name || "N/A"}</p>
        <p><strong>Phone:</strong> {booking.phone || "N/A"}</p>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>Time:</strong> {booking.time || "N/A"}</p>
        <p><strong>Status:</strong> {status}</p>

        <div className="mt-4 flex justify-between">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete
          </button>

          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleStatusUpdate("pending")}
              disabled={loading || status === "pending"}
            >
              Pending
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => handleStatusUpdate("done")}
              disabled={loading || status === "done"}
            >
              Done
            </button>
          </div>
        </div>

        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
}