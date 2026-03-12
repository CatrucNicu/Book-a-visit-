import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const res = await pool.query("SELECT * FROM bookings ORDER BY date, time");

    const formatted = res.rows.map((b) => ({
      ...b,
      dateTime: b.date && b.time ? `${b.date.toISOString().split("T")[0]}T${b.time}:00` : null,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}

export async function POST(req: Request) {
  const { name, phone, dateTime } = await req.json();
  const [datePart, timePart] = dateTime?.split("T") || [null, null];

  try {
    const res = await pool.query(
      "INSERT INTO bookings (name, phone, date, time) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, phone, datePart, timePart]
    );
    return NextResponse.json({ success: true, booking: res.rows[0] });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}