/**
 * Paste into Extensions → Apps Script on your Google Sheet.
 * Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone
 *
 * Routing modes (set ROUTE_BY_TAB):
 *   false — all rows go to SHEET_NAME (filter by 服务类别 column)
 *   true  — each category goes to its own tab (see TAB_NAMES)
 */
const ROUTE_BY_TAB = true;
const DEFAULT_SHEET = 'All Quotes';

const TAB_NAMES = {
  fence: 'Fence',
  painting: 'Painting',
  cleaning: 'Cleaning',
  plumbing: 'Plumbing',
  electrical: 'Electrical',
  moving: 'Moving',
  furniture: 'Furniture',
  provider: 'Providers',
};

const HEADERS = [
  '时间', '类型', '服务类别', '姓名', '手机', '邮箱', '地址',
  '期望日期', '预算', '表单详情', '备注',
];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = getTargetSheet(body);
    const contact = body.contact || {};

    ensureHeaders(sheet);

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
      .createTextOutput(JSON.stringify({ ok: true, sheet: sheet.getName() }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getTargetSheet(body) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (!ROUTE_BY_TAB) {
    return getOrCreateSheet(ss, DEFAULT_SHEET);
  }

  const key = body.category || 'other';
  const tabName = TAB_NAMES[key] || 'Other';
  return getOrCreateSheet(ss, tabName);
}

function getOrCreateSheet(ss, name) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
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
