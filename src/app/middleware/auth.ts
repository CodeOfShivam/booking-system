import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export function requireAuth(
  req: NextRequest,
  roles: ("admin" | "partner")[] = []
) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.redirect("/login");

  try {
    const decoded: any = verifyToken(token);
    if (roles.length && !roles.includes(decoded.role)) {
      return NextResponse.redirect("/login");
    }
    return null;
  } catch {
    return NextResponse.redirect("/login");
  }
}
