export interface SheetFormPayload {
  type: 'quote' | 'provider';
  category?: string;
  createdAt: string;
  fields?: Record<string, unknown>;
  contact?: Record<string, string>;
}

const GOOGLE_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_SCRIPT_URL ??
  'https://script.google.com/macros/s/AKfycbyys9Zww05NvrCZb9uARRiC6porFs4RN1PQKdcBlKJbvMfmOAtGtDHKsHd_s51X8kpw/exec';

/** POST JSON to Google Apps Script web app (writes a row to the linked Sheet). */
export async function submitToGoogleSheet(payload: SheetFormPayload): Promise<void> {
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  try {
    const data = JSON.parse(text) as { ok?: boolean; error?: string };
    if (data.ok === false) {
      throw new Error(data.error || 'Submission failed');
    }
  } catch (err) {
    if (err instanceof SyntaxError) {
      if (!response.ok) {
        throw new Error('Submission failed');
      }
      return;
    }
    throw err;
  }
}
