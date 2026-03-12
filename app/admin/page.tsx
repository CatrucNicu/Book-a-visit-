"use client";
import BookingCalendar from "@/components/BookingCalendar"; // default export

export default function AdminPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <BookingCalendar />
    </div>
  );
}