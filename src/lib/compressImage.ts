const MAX_WIDTH = 1600;
const MAX_BYTES = 1.5 * 1024 * 1024;
const JPEG_QUALITY_START = 0.85;

export interface CompressedImage {
  base64: string;
  mimeType: string;
  fileName: string;
  previewUrl: string;
}

export async function compressImageFile(file: File): Promise<CompressedImage> {
  if (!file.type.startsWith('image/')) {
    throw new Error('NOT_IMAGE');
  }
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('TOO_LARGE');
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('CANVAS');
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  let quality = JPEG_QUALITY_START;
  let blob = await canvasToBlob(canvas, quality);
  while (blob.size > MAX_BYTES && quality > 0.4) {
    quality -= 0.1;
    blob = await canvasToBlob(canvas, quality);
  }

  const base64 = await blobToBase64(blob);
  const previewUrl = URL.createObjectURL(blob);
  const fileName = file.name.replace(/\.[^.]+$/, '') + '.jpg';

  return { base64, mimeType: 'image/jpeg', fileName, previewUrl };
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('BLOB'))), 'image/jpeg', quality);
  });
}

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
