import { NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function GET() {
  const settings = await prisma.siteSettings.findFirst()
  return NextResponse.json(settings || {
    primaryColor: "#2563EB",
    secondaryColor: "#0F172A",
    accentColor: "#F59E0B",
    darkMode: true,
  })
}
