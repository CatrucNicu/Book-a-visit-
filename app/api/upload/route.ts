import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    // Creează folderul dacă nu există
    await fs.mkdir(uploadDir, { recursive: true });

    await fs.writeFile(path.join(uploadDir, fileName), buffer);

    return NextResponse.json({ success: true, fileName });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}