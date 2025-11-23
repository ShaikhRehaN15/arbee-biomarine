// app/api/sheets/route.js
import { NextResponse } from "next/server";
import { readSheet, writeSheet } from "@/lib/googlesheets";

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function GET() {
  const data = await readSheet(SPREADSHEET_ID, "Sheet1!A1:D10");
  return NextResponse.json({ data });
}

export async function POST(req) {
  const body = await req.json();
  const { values } = body; // expecting [["Rayyan", "Test", "123"]]
  
  const updated = await writeSheet(SPREADSHEET_ID, "Sheet1!A2", values);
  return NextResponse.json({ updated });
}
