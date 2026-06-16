const CHUNK_SIZE = 6 * 1024 * 1024;

const GOOGLE_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_SCRIPT_URL ??
  'https://script.google.com/macros/s/AKfycbzRFtg2TDJ-YXr8svJfb7aYzec3BlSVMe6zVJqAN01xALCUOCASdaJstv2C5c-HageJ/exec';

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1] ?? '');
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

/** Upload a video in chunks to Google Apps Script (avoids ~50 MB request limit). */
export async function uploadVideoInChunks(
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  const uploadId = crypto.randomUUID();
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

  for (let i = 0; i < totalChunks; i++) {
    const start = i * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size);
    const chunk = file.slice(start, end);
    const base64 = await blobToBase64(chunk);
    const isLast = i === totalChunks - 1;

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'videoChunk',
        uploadId,
        chunkIndex: i,
        totalChunks,
        data: base64,
        mimeType: file.type || 'video/mp4',
        fileName: file.name,
        isLast,
      }),
    });

    const text = await response.text();
    const result = JSON.parse(text) as { ok?: boolean; error?: string; url?: string };
    if (result.ok === false) {
      throw new Error(result.error || 'Video upload failed');
    }

    onProgress?.(Math.round(((i + 1) / totalChunks) * 100));

    if (isLast && result.url) {
      return result.url;
    }
  }

  throw new Error('Video upload did not return a URL');
}
