import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  const headersList = await headers(); 

  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");

  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    realIp ||
    "127.0.0.1"; // fallback ตอน dev

  const allowedRanges = [
    "10.",
    "192.168.",
    "161.246.",
    "127.0.0.1", //  allow localhost dev
    "::ffff",          //  IPv6 localhost
  ];

  const isAllowed = allowedRanges.some((range) =>
    ip.startsWith(range)
  );

  return NextResponse.json({
    ip,
    allowed: isAllowed,
  });
}
