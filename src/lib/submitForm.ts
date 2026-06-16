import type { SitePhotoSubmitPayload } from '@/types';

export interface SheetFormPayload {
  type: 'quote' | 'provider';
  category?: string;
  createdAt: string;
  fields?: Record<string, unknown>;
  contact?: Record<string, string>;
  /** Annotated site photo or video (image base64 or pre-uploaded video URL). */
  sitePhoto?: SitePhotoSubmitPayload;
}

const GOOGLE_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_SCRIPT_URL ??
  'https://script.google.com/macros/s/AKfycbzRFtg2TDJ-YXr8svJfb7aYzec3BlSVMe6zVJqAN01xALCUOCASdaJstv2C5c-HageJ/exec';

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
