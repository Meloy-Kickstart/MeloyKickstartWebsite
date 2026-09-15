/**
 * Meloy Kickstart — Partner form → Google Sheet
 *
 * Setup:
 * 1. Create a Google Sheet.
 * 2. Extensions → Apps Script. Replace the default code with this file.
 * 3. Deploy → New deployment → Type: Web app.
 *    Execute as: Me. Who has access: Anyone.
 * 4. Copy the Web app URL into VITE_SHEETS_WEBHOOK_URL in .env
 *    (and in Vercel → Project → Settings → Environment Variables).
 *
 * Re-deploy (Deploy → Manage deployments → Edit → New version) after any edit.
 */

const SHEET_NAME = "Submissions";
const HEADERS = [
  "Timestamp",
  "Company",
  "Contact Name",
  "Contact Email",
  "Website",
  "Partner Types",
  "Message",
  "Source",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    if (!data.company || !data.contact_email) {
      return respond({ ok: false, error: "company and contact_email are required" });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      String(data.company || ""),
      String(data.contact_name || ""),
      String(data.contact_email || ""),
      String(data.website || ""),
      Array.isArray(data.partner_types) ? data.partner_types.join(", ") : "",
      String(data.message || ""),
      String(data.source_section || ""),
    ]);

    return respond({ ok: true });
  } catch (err) {
    return respond({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Lets you open the URL in a browser to confirm the deployment is live.
function doGet() {
  return respond({ ok: true, message: "Meloy Kickstart form endpoint is live." });
}

function respond(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}
