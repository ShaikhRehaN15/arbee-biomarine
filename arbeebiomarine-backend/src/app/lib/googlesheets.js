import dotenv from "dotenv";
import path from "path";
import { readFileSync } from "fs";
import { google } from "googleapis";

// Load env vars immediately
dotenv.config({ path: path.resolve("./.env.local") });

console.log("GOOGLE_KEY_FILE in googlesheets.js:", process.env.GOOGLE_KEY_FILE);

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const KEYFILEPATH = path.join(process.cwd(), process.env.GOOGLE_KEY_FILE);
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

function getAuthClient() {
  const credentials = JSON.parse(readFileSync(KEYFILEPATH, "utf-8"));
  return new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });
}

export async function appendRow(values) {
  const auth = await getAuthClient();
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1!A:Z",
    valueInputOption: "RAW",
    requestBody: { values: [values] },
  });
}

