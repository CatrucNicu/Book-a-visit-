// app/api/book/route.ts
import { pool } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // primește name, phone, date, time
    const { name, phone, date, time } = body;

    // insert în baza de date
    await pool.query(
      "INSERT INTO bookings (name, phone, date, time) VALUES ($1, $2, $3, $4)",
      [name, phone, date, time]
    );

    // returnează JSON valid
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}