import { google } from 'googleapis';
import  dotenv  from 'dotenv';

dotenv.config();

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Load credentials dari file JSON Service Account
const auth = new google.auth.GoogleAuth({
  keyFile: './gs.json', // sesuaikan dengan path file JSON kamu
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

export async function readSheet(spreadsheetId, range) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  return response.data.values;
}

export async function writeSheet(spreadsheetId, range, values) {
  const resource = { values };
  const response = await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    resource,
  });
  return response.data;
}
