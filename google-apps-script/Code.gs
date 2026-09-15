/**
 * Meloy Kickstart — Partner form → Google Sheet
 *
 * Setup:
 * 1. Create a Google Sheet. Copy its ID from the URL into SHEET_ID below.
 * 2. script.google.com → New project. Replace the default code with this file.
 * 3. Deploy → New deployment → Type: Web app.
 *    Execute as: Me. Who has access: Anyone.
 * 4. Copy the Web app URL into VITE_SHEETS_WEBHOOK_URL in .env
 *    (and in Vercel → Project → Settings → Environment Variables).
 *
 * Re-deploy (Deploy → Manage deployments → Edit → New version) after any edit.
 * Run formatSheet() once from the editor to style the sheet; new rows are
 * styled as they arrive.
 */

// "landing-startup-fair-responses" in the Startup Career Fair Drive folder
const SHEET_ID = "1-RgvsSnnZsQ8O3b0JXCbuVbvR5EJMlkfV1kY_g_wUt8";

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
const COLUMN_WIDTHS = [150, 200, 160, 220, 180, 200, 420, 90];

// Brand colors from the site
const MAROON = "#5c0f1f";
const CREAM = "#faf6f0";
const ROSE = "#f7ecee";
const INK = "#4a0a18";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    if (!data.company || !data.contact_email) {
      return respond({ ok: false, error: "company and contact_email are required" });
    }

    const sheet = getSheet();
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
    styleRow(sheet, sheet.getLastRow());

    return respond({ ok: true });
  } catch (err) {
    return respond({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    formatSheet();
  }
  return sheet;
}

/**
 * Styles the whole sheet: maroon header, column widths, wrapped text,
 * readable dates, alternating row colors. Safe to run again at any time.
 */
function formatSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  const cols = HEADERS.length;

  // Header
  sheet.getRange(1, 1, 1, cols).setValues([HEADERS]);
  sheet
    .getRange(1, 1, 1, cols)
    .setBackground(MAROON)
    .setFontColor(CREAM)
    .setFontWeight("bold")
    .setFontSize(11)
    .setVerticalAlignment("middle")
    .setWrap(false);
  sheet.setRowHeight(1, 36);
  sheet.setFrozenRows(1);

  // Columns
  COLUMN_WIDTHS.forEach((w, i) => sheet.setColumnWidth(i + 1, w));

  // Body
  const rows = Math.max(sheet.getMaxRows() - 1, 1);
  const body = sheet.getRange(2, 1, rows, cols);
  body
    .setFontColor(INK)
    .setFontSize(10)
    .setVerticalAlignment("top")
    .setWrap(true);
  sheet.getRange(2, 1, rows, 1).setNumberFormat("mmm d, yyyy  h:mm am/pm");
  sheet.getRange(2, cols, rows, 1).setHorizontalAlignment("center");

  // Alternating row color, replacing any earlier banding
  body.getBandings().forEach((b) => b.remove());
  sheet.getBandings().forEach((b) => b.remove());
  body
    .applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, false, false)
    .setFirstRowColor("#ffffff")
    .setSecondRowColor(ROSE);

  sheet.setHiddenGridlines(true);

  // Drop the empty default tab so Submissions is the first thing people see
  const extra = ss.getSheetByName("Sheet1");
  if (extra && extra.getLastRow() === 0 && ss.getSheets().length > 1) {
    ss.deleteSheet(extra);
  }
  ss.setActiveSheet(sheet);
  ss.moveActiveSheet(1);
}

// Keeps a freshly appended row consistent with formatSheet()
function styleRow(sheet, row) {
  const cols = HEADERS.length;
  sheet
    .getRange(row, 1, 1, cols)
    .setFontColor(INK)
    .setFontSize(10)
    .setVerticalAlignment("top")
    .setWrap(true);
  sheet.getRange(row, 1).setNumberFormat("mmm d, yyyy  h:mm am/pm");
  sheet.getRange(row, cols).setHorizontalAlignment("center");
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
