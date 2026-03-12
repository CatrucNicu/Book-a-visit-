import { pool } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const date = url.searchParams.get("date");

    if (!date) {
      return new Response(JSON.stringify({ slots: [] }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // toate orele posibile
    const allSlots = [
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ];

    // ia numărul de rezervări pe fiecare oră pentru data selectată
    const res = await pool.query(
      `SELECT time, COUNT(*) as count
       FROM bookings
       WHERE date = $1
       GROUP BY time`,
      [date]
    );

    const bookedCounts: Record<string, number> = {};
    res.rows.forEach((r: { time: string | number; count: string; }) => {
      bookedCounts[r.time] = parseInt(r.count, 10);
    });

    // filtrează orele cu mai puțin de 3 rezervări
    const availableSlots = allSlots.filter(slot => {
      return !bookedCounts[slot] || bookedCounts[slot] < 3;
    });

    return new Response(JSON.stringify({ slots: availableSlots }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ slots: [] }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}