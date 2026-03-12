import { NextResponse } from "next/server";
import { pool } from "@/lib/db"; // asigură-te că există db.ts
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const res = await pool.query("SELECT * FROM admins WHERE username = $1", [username]);
  const admin = res.rows[0];

  if (!admin) return NextResponse.json({ success: false, message: "Invalid credentials" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return NextResponse.json({ success: false, message: "Invalid credentials" });

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_token", "secret-token", { httpOnly: true, path: "/", maxAge: 3600 });

  return response;
}