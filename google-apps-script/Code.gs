/**
 * Paste into Extensions → Apps Script on your Google Sheet.
 * Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone
 */
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const body = JSON.parse(e.postData.contents);
    const contact = body.contact || {};

    sheet.appendRow([
      body.createdAt || new Date().toISOString(),
      body.type || 'quote',
      body.category || '',
      contact.name || '',
      contact.phone || '',
      contact.email || '',
      contact.location || '',
      contact.preferredDate || '',
      contact.budget || '',
      JSON.stringify(body.fields || {}),
      contact.notes || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function testAppend() {
  doPost({
    postData: {
      contents: JSON.stringify({
        type: 'quote',
        category: 'fence',
        createdAt: new Date().toISOString(),
        fields: { fenceType: 'Wooden' },
        contact: {
          name: 'Test',
          phone: '021000000',
          email: 'test@example.com',
          location: 'Auckland',
        },
      }),
    },
  });
}
