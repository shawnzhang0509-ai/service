import { compressImageFile } from '@/lib/compressImage';
import type { SitePhotoPayload } from '@/types';

const VIDEO_MAX_BYTES = 100 * 1024 * 1024;
const VIDEO_TYPES = new Set(['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo']);

export async function processMediaFile(file: File): Promise<SitePhotoPayload> {
  if (file.type.startsWith('image/')) {
    const compressed = await compressImageFile(file);
    return {
      mediaKind: 'image',
      base64: compressed.base64,
      mimeType: compressed.mimeType,
      fileName: compressed.fileName,
      previewUrl: compressed.previewUrl,
    };
  }

  if (VIDEO_TYPES.has(file.type) || file.type.startsWith('video/')) {
    if (file.size > VIDEO_MAX_BYTES) {
      throw new Error('VIDEO_TOO_LARGE');
    }
    return {
      mediaKind: 'video',
      mimeType: file.type || 'video/mp4',
      fileName: file.name,
      previewUrl: URL.createObjectURL(file),
      file,
    };
  }

  throw new Error('INVALID_TYPE');
}
