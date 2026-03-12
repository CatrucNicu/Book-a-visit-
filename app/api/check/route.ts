import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  if (token === "secret-token") {
    return NextResponse.json({ authorized: true });
  }

  return NextResponse.json({ authorized: false });
}