/**
 * NZ Trade Hub — Google Sheet 表单接收脚本
 * 1. 全选复制到 Sheet → 扩展程序 → Apps Script
 * 2. 保存 → 部署 → 新部署 → 网页应用 → 执行身份：我 → 谁可以访问：任何人
 * 3. 编辑器里先运行 testEmail() 授权发信，再运行 testAppend() 测写入
 */
const SHEET_NAME = 'Sheet1';
const NOTIFY_EMAIL = '359507210@qq.com'; // 留空 '' 则不发邮件
// 可选：再抄送一份到你的 Gmail（填 Google 邮箱；留空则不抄送）
const NOTIFY_GMAIL_CC = '';

const HEADERS = [
  '时间', '类型', '服务类别', '姓名', '手机', '邮箱', '地址',
  '期望日期', '预算', '表单详情', '备注',
];

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error('找不到工作表 "' + SHEET_NAME + '"，请改 SHEET_NAME 或新建该 tab');
    }

    const body = JSON.parse(e.postData.contents);
    const contact = body.contact || {};

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

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

    const emailResult = sendSubmissionEmail(body, ss.getUrl());

    return ContentService
      .createTextOutput(JSON.stringify({
        ok: true,
        emailSent: emailResult.sent,
        emailError: emailResult.error,
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendSubmissionEmail(body, sheetUrl) {
  if (!NOTIFY_EMAIL) {
    return { sent: false, error: 'NOTIFY_EMAIL 未设置' };
  }

  const contact = body.contact || {};
  const category = body.category || 'unknown';
  const type = body.type || 'quote';
  const subject = '[NZ Trade Hub] 新' + (type === 'provider' ? '服务商申请' : '报价') + ' · ' + category;

  const plainBody = [
    '新提交提醒',
    '类型: ' + type,
    '服务类别: ' + category,
    '姓名: ' + (contact.name || '-'),
    '手机: ' + (contact.phone || '-'),
    '邮箱: ' + (contact.email || '-'),
    '地址: ' + (contact.location || '-'),
    '期望日期: ' + (contact.preferredDate || '-'),
    '预算: ' + (contact.budget || '-'),
    '备注: ' + (contact.notes || '-'),
    '表单详情: ' + JSON.stringify(body.fields || {}),
    'Sheet: ' + sheetUrl,
  ].join('\n');

  try {
    const options = {
      to: NOTIFY_EMAIL,
      subject: subject,
      body: plainBody,
    };
    if (NOTIFY_GMAIL_CC) {
      options.cc = NOTIFY_GMAIL_CC;
    }
    MailApp.sendEmail(options);
    return { sent: true, error: null };
  } catch (mailErr) {
    return { sent: false, error: String(mailErr) };
  }
}

/** 第 0 步：若报 script.send_mail 无权限，先运行本函数并完成授权弹窗 */
function authorizeEmail() {
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: '[NZ Trade Hub] 授权测试',
    body: '如果你收到这封邮件，说明发信权限已 OK。',
  });
}

/** 在编辑器里运行：专门测试发邮件（会弹出授权） */
function testEmail() {
  const result = sendSubmissionEmail(
    {
      type: 'quote',
      category: 'test',
      fields: { note: 'testEmail() 邮件测试' },
      contact: {
        name: '邮件测试',
        phone: '021000000',
        location: 'Auckland',
      },
    },
    SpreadsheetApp.getActiveSpreadsheet().getUrl()
  );
  Logger.log(result);
  return result;
}

/** 在编辑器里运行：测试写入 Sheet + 发邮件 */
function testAppend() {
  const output = doPost({
    postData: {
      contents: JSON.stringify({
        type: 'quote',
        category: 'fence',
        createdAt: new Date().toISOString(),
        fields: { fenceType: 'Wooden', serviceType: 'New Install' },
        contact: {
          name: 'Test',
          phone: '021000000',
          email: 'test@example.com',
          location: 'Auckland',
        },
      }),
    },
  });
  Logger.log(output.getContent());
}
