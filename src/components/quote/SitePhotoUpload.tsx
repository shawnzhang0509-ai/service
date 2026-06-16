import { useId, useRef, useState } from 'react';
import { Film, ImagePlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import type { SitePhotoPayload } from '@/types';
import { processMediaFile } from '@/lib/processMedia';
import { SitePhotoExample } from '@/components/quote/SitePhotoExamples';

interface SitePhotoUploadProps {
  categoryId: string;
  value: SitePhotoPayload | null;
  onChange: (photo: SitePhotoPayload | null) => void;
  translate: (key: string) => string;
}

const HINT_KEYS: Record<string, string> = {
  fence: 'quote_site_photo_hint_fence',
  painting: 'quote_site_photo_hint_painting',
  cleaning: 'quote_site_photo_hint_cleaning',
  plumbing: 'quote_site_photo_hint_plumbing',
  electrical: 'quote_site_photo_hint_electrical',
  moving: 'quote_site_photo_hint_moving',
  furniture: 'quote_site_photo_hint_furniture',
};

export default function SitePhotoUpload({ categoryId, value, onChange, translate }: SitePhotoUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const hintKey = HINT_KEYS[categoryId] ?? 'quote_site_photo_hint_default';

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setLoading(true);
    try {
      const processed = await processMediaFile(file);
      if (value?.previewUrl) URL.revokeObjectURL(value.previewUrl);
      onChange(processed);
    } catch (err) {
      const code = err instanceof Error ? err.message : '';
      if (code === 'INVALID_TYPE' || code === 'NOT_IMAGE') setError(translate('quote_site_photo_type_error'));
      else if (code === 'TOO_LARGE') setError(translate('quote_site_photo_size_error'));
      else if (code === 'VIDEO_TOO_LARGE') setError(translate('quote_site_photo_video_size_error'));
      else setError(translate('quote_site_photo_upload_error'));
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    if (value?.previewUrl) URL.revokeObjectURL(value.previewUrl);
    onChange(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-semibold text-gray-800 mb-1 block">
          {translate('quote_site_photo_title')}
        </Label>
        <p className="text-sm text-gray-500">{translate('quote_site_photo_desc')}</p>
      </div>

      <div className="rounded-lg border border-teal-100 bg-teal-50/40 p-4 space-y-3">
        <p className="text-xs font-medium text-teal-800">{translate('quote_site_photo_example')}</p>
        <SitePhotoExample categoryId={categoryId} />
        <p className="text-xs text-gray-600 leading-relaxed">{translate(hintKey)}</p>
      </div>

      {value ? (
        <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          {value.mediaKind === 'video' ? (
            <video
              src={value.previewUrl}
              controls
              className="max-h-64 w-full object-contain bg-black"
              aria-label={translate('quote_site_photo_video_preview_alt')}
            />
          ) : (
            <img
              src={value.previewUrl}
              alt={translate('quote_site_photo_preview_alt')}
              className="max-h-64 w-full object-contain"
            />
          )}
          <div className="flex items-center justify-between gap-2 border-t border-gray-200 bg-white px-3 py-2">
            <span className="truncate text-xs text-gray-500">
              {value.mediaKind === 'video' && <Film className="inline h-3 w-3 mr-1 text-teal-600" />}
              {value.fileName}
            </span>
            <div className="flex shrink-0 gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
                {translate('quote_site_photo_change')}
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={handleRemove} className="text-red-600 hover:text-red-700">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-white px-6 py-8 text-center transition-colors hover:border-teal-300 hover:bg-teal-50/30"
        >
          <ImagePlus className="mb-2 h-8 w-8 text-teal-600" />
          <span className="text-sm font-medium text-gray-700">{translate('quote_site_photo_upload')}</span>
          <span className="mt-1 text-xs text-gray-400">{translate('quote_site_photo_types')}</span>
          {loading && <span className="mt-2 text-xs text-teal-600">{translate('quote_site_photo_processing')}</span>}
        </label>
      )}

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif,video/mp4,video/webm,video/quicktime"
        className="sr-only"
        disabled={loading}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-gray-400">{translate('quote_site_photo_optional')}</p>
    </div>
  );
}
