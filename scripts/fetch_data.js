
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const SPREADSHEET_ID = '1aZ3lpTPeu9Uf-v9LSb0AagYHc7ysj49YJscoLaUMMm4';

// Map GID to output file name
const SHEET_MAPPINGS = [
  { gid: 1120719438, name: 'cfp' }
  // Add more mappings here as needed
  // { gid: 123456789, name: 'another-sheet' }
];

async function main() {
  try {
    const credentialsJson = process.env.GOOGLE_SHEETS_CREDENTIALS;
    if (!credentialsJson) {
      throw new Error('GOOGLE_SHEETS_CREDENTIALS environment variable is not set.');
    }

    let credentials;
    try {
      credentials = JSON.parse(credentialsJson);
    } catch (e) {
      if (fs.existsSync(credentialsJson)) {
        credentials = JSON.parse(fs.readFileSync(credentialsJson, 'utf-8'));
      } else {
        throw new Error('GOOGLE_SHEETS_CREDENTIALS must be a JSON string or a valid file path.');
      }
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const meta = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID
    });

    // Process each sheet mapping
    for (const mapping of SHEET_MAPPINGS) {
      console.log(`\nProcessing sheet with GID ${mapping.gid} (${mapping.name})...`);

      // Find the sheet with the specified GID
      const sheet = meta.data.sheets.find(s => s.properties.sheetId === mapping.gid);
      if (!sheet) {
        console.error(`Sheet with GID ${mapping.gid} not found. Skipping.`);
        continue;
      }

      const sheetTitle = sheet.properties.title;
      console.log(`Fetching data from sheet: ${sheetTitle}`);

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: sheetTitle,
      });

      const rows = response.data.values;
      if (!rows || rows.length === 0) {
        console.log('No data found.');
        continue;
      }

      console.log(`Fetched ${rows.length} rows.`);

      // Filter rows based on "Exclude" column
      const header = rows[0];
      const excludeIndex = header.findIndex(h => h.trim().toLowerCase() === 'exclude');

      let filteredRows = rows;
      if (excludeIndex !== -1) {
        console.log(`Found 'Exclude' column at index ${excludeIndex}. Filtering...`);
        filteredRows = rows.filter((row, index) => {
          if (index === 0) return true; // Always keep header
          const excludeValue = String(row[excludeIndex] || '').trim().toLowerCase();
          return excludeValue !== 'exclude';
        });
        console.log(`Filtered down to ${filteredRows.length} rows (including header).`);
      } else {
        console.log("'Exclude' column not found. Bringing all rows.");
      }

      const csv = Papa.unparse(filteredRows);

      const outputPath = path.resolve(`content/2026/data/${mapping.name}.csv`);
      fs.writeFileSync(outputPath, csv);
      console.log(`Data saved to ${outputPath}`);
    }

  } catch (error) {
    console.error('Error fetching data:', error);
    process.exit(1);
  }
}

main();
