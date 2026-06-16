import { useId, useRef, useState } from 'react';
import { ImagePlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import type { SitePhotoPayload } from '@/types';
import { compressImageFile } from '@/lib/compressImage';

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

function FencePhotoExample() {
  return (
    <svg viewBox="0 0 320 150" className="w-full max-w-xs h-auto rounded-md border border-teal-100" aria-hidden>
      <rect width="320" height="150" fill="#e7f5f3" />
      <rect x="95" y="45" width="70" height="55" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" rx="2" />
      <text x="130" y="78" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="system-ui,sans-serif">House</text>
      <path d="M40 115 Q80 95 120 115 T200 115 T280 115" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="6 4" />
      <ellipse cx="200" cy="108" rx="55" ry="18" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="40" y1="130" x2="280" y2="130" stroke="#0d9488" strokeWidth="1.5" />
      <text x="160" y="145" textAnchor="middle" fill="#0f766e" fontSize="9" fontFamily="system-ui,sans-serif">~15m length</text>
      <path d="M250 95 L265 80 L280 95" fill="none" stroke="#b45309" strokeWidth="1.5" />
      <text x="268" y="72" fill="#b45309" fontSize="8" fontFamily="system-ui,sans-serif">slope</text>
      <text x="160" y="18" textAnchor="middle" fill="#0f766e" fontSize="10" fontWeight="600" fontFamily="system-ui,sans-serif">Example: annotated map / street view</text>
    </svg>
  );
}

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
      const compressed = await compressImageFile(file);
      if (value?.previewUrl) URL.revokeObjectURL(value.previewUrl);
      onChange({
        base64: compressed.base64,
        mimeType: compressed.mimeType,
        fileName: compressed.fileName,
        previewUrl: compressed.previewUrl,
      });
    } catch (err) {
      const code = err instanceof Error ? err.message : '';
      if (code === 'NOT_IMAGE') setError(translate('quote_site_photo_type_error'));
      else if (code === 'TOO_LARGE') setError(translate('quote_site_photo_size_error'));
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
        {categoryId === 'fence' ? (
          <FencePhotoExample />
        ) : (
          <div className="flex h-24 max-w-xs items-center justify-center rounded-md border border-dashed border-teal-200 bg-white text-xs text-gray-500 px-4 text-center">
            {translate('quote_site_photo_example_generic')}
          </div>
        )}
        <p className="text-xs text-gray-600 leading-relaxed">{translate(hintKey)}</p>
      </div>

      {value ? (
        <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          <img
            src={value.previewUrl}
            alt={translate('quote_site_photo_preview_alt')}
            className="max-h-64 w-full object-contain"
          />
          <div className="flex items-center justify-between gap-2 border-t border-gray-200 bg-white px-3 py-2">
            <span className="truncate text-xs text-gray-500">{value.fileName}</span>
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
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
        className="sr-only"
        disabled={loading}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-gray-400">{translate('quote_site_photo_optional')}</p>
    </div>
  );
}
