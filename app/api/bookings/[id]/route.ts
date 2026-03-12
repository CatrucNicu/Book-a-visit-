import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = Number(params.id);

    if (isNaN(id) || id < 1) {
      return NextResponse.json({ success: false, error: 'ID invalid' }, { status: 400 });
    }

    const body = await request.json();
    const { dateTime, status } = body;

    if (!dateTime && status === undefined) {
      return NextResponse.json({ success: false, error: 'Nicio schimbare trimisă' }, { status: 400 });
    }

    let datePart: string | null = null;
    let timePart: string | null = null;

    if (dateTime) {
      const d = new Date(dateTime);
      if (isNaN(d.getTime())) {
        return NextResponse.json({ success: false, error: 'Dată invalidă' }, { status: 400 });
      }
      datePart = d.toISOString().split('T')[0];
      timePart = d.toTimeString().slice(0, 8); // HH:mm:ss
      console.log(`[PATCH ${id}] new date=${datePart}, time=${timePart}`);
    }

    const queryParts: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (datePart !== null) {
      queryParts.push(`date = COALESCE($${idx}, date)`);
      values.push(datePart);
      idx++;
    }

    if (timePart !== null) {
      queryParts.push(`time = COALESCE($${idx}, time)`);
      values.push(timePart);
      idx++;
    }

    if (status !== undefined) {
      queryParts.push(`status = COALESCE($${idx}, status)`);
      values.push(status);
      idx++;
    }

    const query = `
      UPDATE bookings
      SET ${queryParts.join(', ')}
      WHERE id = $${idx}
      RETURNING id, date, time
    `;

    values.push(id);

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return NextResponse.json({ success: false, error: 'Nu există' }, { status: 404 });
    }

    console.log(`[PATCH ${id}] OK`);
    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error('[PATCH ERROR]', err.message, err.stack);
    return NextResponse.json(
      { success: false, error: 'Eroare server', details: err.message },
      { status: 500 }
    );
  }
}