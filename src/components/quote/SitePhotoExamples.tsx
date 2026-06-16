import type { ComponentType } from 'react';

const svgClass = 'w-full max-w-xs h-auto rounded-md border border-teal-100';

export function FencePhotoExample() {
  return (
    <svg viewBox="0 0 320 150" className={svgClass} aria-hidden>
      <rect width="320" height="150" fill="#e7f5f3" />
      <rect x="95" y="45" width="70" height="55" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" rx="2" />
      <text x="130" y="78" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="system-ui,sans-serif">House</text>
      <path d="M40 115 Q80 95 120 115 T200 115 T280 115" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="6 4" />
      <ellipse cx="200" cy="108" rx="55" ry="18" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="40" y1="130" x2="280" y2="130" stroke="#0d9488" strokeWidth="1.5" />
      <text x="160" y="145" textAnchor="middle" fill="#0f766e" fontSize="9" fontFamily="system-ui,sans-serif">~15m length</text>
      <path d="M250 95 L265 80 L280 95" fill="none" stroke="#b45309" strokeWidth="1.5" />
      <text x="268" y="72" fill="#b45309" fontSize="8" fontFamily="system-ui,sans-serif">slope</text>
      <text x="160" y="18" textAnchor="middle" fill="#0f766e" fontSize="10" fontWeight="600" fontFamily="system-ui,sans-serif">Map / street view with fence line</text>
    </svg>
  );
}

export function PaintingPhotoExample() {
  return (
    <svg viewBox="0 0 320 150" className={svgClass} aria-hidden>
      <rect width="320" height="150" fill="#fef3c7" />
      <rect x="60" y="30" width="200" height="100" fill="#fff" stroke="#94a3b8" strokeWidth="1.5" rx="2" />
      <rect x="60" y="30" width="200" height="12" fill="#e2e8f0" />
      <rect x="60" y="30" width="80" height="100" fill="#fca5a5" fillOpacity="0.45" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x="180" y="30" width="80" height="100" fill="#93c5fd" fillOpacity="0.35" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="100" y="88" textAnchor="middle" fill="#b91c1c" fontSize="8" fontFamily="system-ui,sans-serif">accent wall</text>
      <text x="220" y="88" textAnchor="middle" fill="#1d4ed8" fontSize="8" fontFamily="system-ui,sans-serif">main area</text>
      <text x="160" y="18" textAnchor="middle" fill="#b45309" fontSize="10" fontWeight="600" fontFamily="system-ui,sans-serif">Room photo with walls highlighted</text>
    </svg>
  );
}

export function CleaningPhotoExample() {
  return (
    <svg viewBox="0 0 320 150" className={svgClass} aria-hidden>
      <rect width="320" height="150" fill="#ecfdf5" />
      <rect x="70" y="35" width="180" height="90" fill="#fff" stroke="#64748b" strokeWidth="1.5" rx="2" />
      <rect x="70" y="35" width="90" height="55" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
      <rect x="160" y="35" width="90" height="55" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
      <rect x="70" y="90" width="180" height="35" fill="#a7f3d0" stroke="#059669" strokeWidth="1" />
      <text x="115" y="68" textAnchor="middle" fill="#047857" fontSize="8" fontFamily="system-ui,sans-serif">bedroom</text>
      <text x="205" y="68" textAnchor="middle" fill="#047857" fontSize="8" fontFamily="system-ui,sans-serif">living</text>
      <text x="160" y="112" textAnchor="middle" fill="#047857" fontSize="8" fontFamily="system-ui,sans-serif">kitchen</text>
      <text x="160" y="18" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="600" fontFamily="system-ui,sans-serif">Floor plan or room layout</text>
    </svg>
  );
}

export function PlumbingPhotoExample() {
  return (
    <svg viewBox="0 0 320 150" className={svgClass} aria-hidden>
      <rect width="320" height="150" fill="#eff6ff" />
      <rect x="100" y="50" width="120" height="70" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" rx="4" />
      <ellipse cx="160" cy="72" rx="28" ry="10" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
      <rect x="155" y="82" width="10" height="18" fill="#94a3b8" />
      <circle cx="160" cy="108" r="6" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
      <path d="M148 108 Q160 125 172 108" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="3 2" />
      <circle cx="160" cy="118" r="8" fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x="185" y="120" fill="#dc2626" fontSize="9" fontFamily="system-ui,sans-serif">leak</text>
      <text x="160" y="18" textAnchor="middle" fill="#1d4ed8" fontSize="10" fontWeight="600" fontFamily="system-ui,sans-serif">Problem area marked on photo</text>
    </svg>
  );
}

export function ElectricalPhotoExample() {
  return (
    <svg viewBox="0 0 320 150" className={svgClass} aria-hidden>
      <rect width="320" height="150" fill="#fefce8" />
      <rect x="110" y="35" width="100" height="90" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" rx="3" />
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={120 + col * 28}
            y={48 + row * 18}
            width="20"
            height="12"
            fill={row === 1 && col === 1 ? '#fbbf24' : '#475569'}
            stroke="#94a3b8"
            strokeWidth="0.5"
            rx="1"
          />
        ))
      )}
      <rect x="200" y="70" width="14" height="14" fill="#fff" stroke="#64748b" strokeWidth="1" rx="2" />
      <circle cx="207" cy="77" r="10" fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x="222" y="80" fill="#dc2626" fontSize="8" fontFamily="system-ui,sans-serif">outlet</text>
      <text x="160" y="18" textAnchor="middle" fill="#a16207" fontSize="10" fontWeight="600" fontFamily="system-ui,sans-serif">Switchboard or outlet photo</text>
    </svg>
  );
}

export function MovingPhotoExample() {
  return (
    <svg viewBox="0 0 320 150" className={svgClass} aria-hidden>
      <rect width="320" height="150" fill="#f5f3ff" />
      <rect x="50" y="100" width="220" height="8" fill="#d4d4d8" />
      <rect x="70" y="55" width="50" height="45" fill="#a78bfa" stroke="#7c3aed" strokeWidth="1.5" rx="2" />
      <rect x="135" y="45" width="70" height="55" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="1.5" rx="2" />
      <ellipse cx="220" cy="78" rx="22" ry="22" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="1.5" />
      <path d="M70 55 L85 40 L120 40 L135 55" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 2" />
      <path d="M135 45 L150 30 L205 30 L220 50" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 2" />
      <circle cx="220" cy="78" r="26" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="95" y="78" textAnchor="middle" fill="#5b21b6" fontSize="7" fontFamily="system-ui,sans-serif">boxes</text>
      <text x="170" y="78" textAnchor="middle" fill="#5b21b6" fontSize="7" fontFamily="system-ui,sans-serif">sofa</text>
      <text x="220" y="82" textAnchor="middle" fill="#5b21b6" fontSize="7" fontFamily="system-ui,sans-serif">table</text>
      <text x="160" y="18" textAnchor="middle" fill="#6d28d9" fontSize="10" fontWeight="600" fontFamily="system-ui,sans-serif">Large items or floor plan marked</text>
    </svg>
  );
}

export function FurniturePhotoExample() {
  return (
    <svg viewBox="0 0 320 150" className={svgClass} aria-hidden>
      <rect width="320" height="150" fill="#fff7ed" />
      <rect x="55" y="70" width="45" height="35" fill="#fdba74" stroke="#ea580c" strokeWidth="1.5" rx="1" />
      <rect x="58" y="73" width="39" height="4" fill="#fff" />
      <text x="77" y="92" textAnchor="middle" fill="#9a3412" fontSize="6" fontFamily="system-ui,sans-serif">IKEA</text>
      <rect x="110" y="75" width="40" height="30" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" rx="1" />
      <rect x="200" y="45" width="70" height="60" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="5 3" rx="2" />
      <rect x="215" y="75" width="40" height="25" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" rx="1" />
      <text x="235" y="68" textAnchor="middle" fill="#dc2626" fontSize="8" fontFamily="system-ui,sans-serif">space</text>
      <text x="160" y="18" textAnchor="middle" fill="#c2410c" fontSize="10" fontWeight="600" fontFamily="system-ui,sans-serif">Flat-pack boxes + target area</text>
    </svg>
  );
}

const EXAMPLES: Record<string, ComponentType> = {
  fence: FencePhotoExample,
  painting: PaintingPhotoExample,
  cleaning: CleaningPhotoExample,
  plumbing: PlumbingPhotoExample,
  electrical: ElectricalPhotoExample,
  moving: MovingPhotoExample,
  furniture: FurniturePhotoExample,
};

export function SitePhotoExample({ categoryId }: { categoryId: string }) {
  const Example = EXAMPLES[categoryId] ?? FencePhotoExample;
  return <Example />;
}
