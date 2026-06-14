import type { ReactElement } from 'react';
import type { FormField } from '@/types';

type FormContext = Record<string, unknown>;

interface FieldIllustrationProps {
  field: FormField;
  formData: FormContext;
  translate: (key: string) => string;
}

const svgProps = {
  viewBox: '0 0 320 120',
  className: 'w-full h-auto max-h-32',
  role: 'img' as const,
};

function FenceLength() {
  return (
    <svg {...svgProps} aria-hidden>
      <rect x="0" y="0" width="320" height="120" fill="#f0fdfa" rx="8" />
      <line x1="24" y1="88" x2="296" y2="88" stroke="#0d9488" strokeWidth="2" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
      <path d="M24 70 V40 M48 70 V35 M72 70 V40 M96 70 V35 M120 70 V40 M144 70 V35 M168 70 V40 M192 70 V35 M216 70 V40 M240 70 V35 M264 70 V40 M288 70 V35" stroke="#78716c" strokeWidth="3" />
      <text x="160" y="108" textAnchor="middle" fill="#0f766e" fontSize="11" fontFamily="system-ui,sans-serif">Total length (m)</text>
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#0d9488" />
        </marker>
      </defs>
    </svg>
  );
}

function FenceHeight() {
  return (
    <svg {...svgProps} aria-hidden>
      <rect x="0" y="0" width="320" height="120" fill="#f0fdfa" rx="8" />
      <rect x="40" y="95" width="240" height="8" fill="#a8a29e" />
      <path d="M80 95 V45 M104 95 V30 M128 95 V45 M152 95 V30" stroke="#78716c" strokeWidth="4" />
      <line x1="170" y1="95" x2="170" y2="30" stroke="#0d9488" strokeWidth="2" strokeDasharray="4 3" />
      <text x="182" y="65" fill="#0f766e" fontSize="10" fontFamily="system-ui,sans-serif">Height</text>
    </svg>
  );
}

function FenceGate() {
  return (
    <svg {...svgProps} aria-hidden>
      <rect x="0" y="0" width="320" height="120" fill="#f0fdfa" rx="8" />
      <path d="M20 90 V35 H300 V90" stroke="#78716c" strokeWidth="3" fill="none" />
      <rect x="130" y="50" width="30" height="40" stroke="#0d9488" strokeWidth="2" fill="#ccfbf1" />
      <rect x="175" y="45" width="50" height="45" stroke="#0d9488" strokeWidth="2" fill="#ccfbf1" />
      <path d="M240 90 V35" stroke="#78716c" strokeWidth="3" strokeDasharray="6 4" />
      <text x="145" y="108" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="system-ui,sans-serif">Single</text>
      <text x="200" y="108" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="system-ui,sans-serif">Double</text>
      <text x="260" y="108" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="system-ui,sans-serif">Sliding</text>
    </svg>
  );
}

function FenceNewInstall() {
  return (
    <svg {...svgProps} aria-hidden>
      <rect x="0" y="0" width="320" height="120" fill="#f0fdfa" rx="8" />
      <rect x="20" y="75" width="280" height="20" fill="#d6d3d1" />
      <path d="M40 95 V50 M70 95 V40 M100 95 V50 M130 95 V40 M160 95 V50 M190 95 V40 M220 95 V50 M250 95 V40 M280 95 V50" stroke="#78716c" strokeWidth="3" />
      <text x="160" y="28" textAnchor="middle" fill="#0f766e" fontSize="11" fontWeight="600" fontFamily="system-ui,sans-serif">New install</text>
      <text x="160" y="44" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="system-ui,sans-serif">Full new fence on property boundary</text>
    </svg>
  );
}

function FenceRepair() {
  return (
    <svg {...svgProps} aria-hidden>
      <rect x="0" y="0" width="320" height="120" fill="#fef3c7" rx="8" />
      <path d="M30 90 V45 M55 90 V35 M80 90 V45 M105 90 V55 L120 90 M145 90 V35 M170 90 V45" stroke="#78716c" strokeWidth="3" fill="none" />
      <circle cx="112" cy="72" r="14" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 2" />
      <text x="160" y="28" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="600" fontFamily="system-ui,sans-serif">Repair / replace section</text>
      <text x="160" y="44" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="system-ui,sans-serif">Damaged or partial section only</text>
    </svg>
  );
}

function FenceTypes() {
  return (
    <svg {...svgProps} aria-hidden>
      <rect x="0" y="0" width="320" height="120" fill="#f0fdfa" rx="8" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${20 + i * 76}, 30)`}>
          <path d="M0 60 V20 M8 60 V10 M16 60 V20 M24 60 V10 M32 60 V20 M40 60 V10 M48 60" stroke={['#92400e', '#64748b', '#0891b2', '#57534e'][i]} strokeWidth="2" />
          <text x="24" y="75" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="system-ui,sans-serif">{['Wood', 'Metal', 'PVC', 'Other'][i]}</text>
        </g>
      ))}
    </svg>
  );
}

function PaintArea() {
  return (
    <svg viewBox="0 0 320 120" className="w-full h-auto max-h-32" aria-hidden>
      <rect x="0" y="0" width="320" height="120" fill="#eff6ff" rx="8" />
      <rect x="100" y="25" width="120" height="70" stroke="#3b82f6" strokeWidth="2" fill="#dbeafe" />
      <polygon points="100,25 160,5 220,25" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1" />
      <text x="55" y="65" fill="#64748b" fontSize="9" fontFamily="system-ui,sans-serif">Interior</text>
      <text x="160" y="115" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="system-ui,sans-serif">Exterior / roof / whole house</text>
    </svg>
  );
}

function PaintMeasure() {
  return (
    <svg {...svgProps} aria-hidden>
      <rect x="0" y="0" width="320" height="120" fill="#eff6ff" rx="8" />
      <rect x="80" y="30" width="160" height="60" stroke="#3b82f6" strokeWidth="2" fill="none" />
      <line x1="80" y1="100" x2="240" y2="100" stroke="#2563eb" strokeWidth="1.5" />
      <line x1="80" y1="96" x2="80" y2="104" stroke="#2563eb" strokeWidth="1.5" />
      <line x1="240" y1="96" x2="240" y2="104" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="115" textAnchor="middle" fill="#1d4ed8" fontSize="10" fontFamily="system-ui,sans-serif">Area (m²)</text>
    </svg>
  );
}

function CleanRooms() {
  return (
    <svg {...svgProps} aria-hidden>
      <rect x="0" y="0" width="320" height="120" fill="#f0fdfa" rx="8" />
      <rect x="40" y="35" width="50" height="45" stroke="#14b8a6" strokeWidth="1.5" fill="#ccfbf1" />
      <rect x="110" y="35" width="50" height="45" stroke="#14b8a6" strokeWidth="1.5" fill="#ccfbf1" />
      <rect x="180" y="35" width="35" height="45" stroke="#14b8a6" strokeWidth="1.5" fill="#ccfbf1" />
      <text x="65" y="62" textAnchor="middle" fill="#0f766e" fontSize="8" fontFamily="system-ui,sans-serif">Bed</text>
      <text x="135" y="62" textAnchor="middle" fill="#0f766e" fontSize="8" fontFamily="system-ui,sans-serif">Bed</text>
      <text x="197" y="62" textAnchor="middle" fill="#0f766e" fontSize="8" fontFamily="system-ui,sans-serif">Bath</text>
    </svg>
  );
}

function MoveLoad() {
  return (
    <svg {...svgProps} aria-hidden>
      <rect x="0" y="0" width="320" height="120" fill="#eef2ff" rx="8" />
      <rect x="60" y="50" width="200" height="45" rx="4" fill="#c7d2fe" stroke="#6366f1" strokeWidth="2" />
      <rect x="220" y="35" width="50" height="35" fill="#a5b4fc" stroke="#6366f1" strokeWidth="1.5" />
      <circle cx="90" cy="98" r="10" fill="#475569" />
      <circle cx="230" cy="98" r="10" fill="#475569" />
      <text x="160" y="30" textAnchor="middle" fill="#4338ca" fontSize="10" fontFamily="system-ui,sans-serif">Studio → 4+ bed load size</text>
    </svg>
  );
}

function MoveRoute() {
  return (
    <svg {...svgProps} aria-hidden>
      <rect x="0" y="0" width="320" height="120" fill="#eef2ff" rx="8" />
      <rect x="30" y="45" width="40" height="35" fill="#c7d2fe" stroke="#6366f1" strokeWidth="1.5" rx="2" />
      <rect x="250" y="45" width="40" height="35" fill="#c7d2fe" stroke="#6366f1" strokeWidth="1.5" rx="2" />
      <path d="M75 62 H245" stroke="#6366f1" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#arr2)" />
      <text x="55" y="95" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="system-ui,sans-serif">From</text>
      <text x="270" y="95" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="system-ui,sans-serif">To</text>
      <defs><marker id="arr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#6366f1" /></marker></defs>
    </svg>
  );
}

function FurnAssembly() {
  return (
    <svg {...svgProps} aria-hidden>
      <rect x="0" y="0" width="320" height="120" fill="#fff1f2" rx="8" />
      <rect x="80" y="40" width="80" height="12" fill="#fda4af" stroke="#e11d48" strokeWidth="1" />
      <rect x="80" y="55" width="12" height="40" fill="#fda4af" stroke="#e11d48" strokeWidth="1" />
      <rect x="148" y="55" width="12" height="40" fill="#fda4af" stroke="#e11d48" strokeWidth="1" />
      <rect x="200" y="30" width="60" height="8" fill="#fecdd3" stroke="#e11d48" strokeWidth="1" transform="rotate(15 230 34)" />
      <text x="160" y="110" textAnchor="middle" fill="#be123c" fontSize="9" fontFamily="system-ui,sans-serif">Flat-pack / IKEA assembly</text>
    </svg>
  );
}

function PlumbLocation() {
  return (
    <svg {...svgProps} aria-hidden>
      <rect x="0" y="0" width="320" height="120" fill="#ecfeff" rx="8" />
      <rect x="30" y="30" width="260" height="70" stroke="#06b6d4" strokeWidth="1.5" fill="none" rx="2" />
      <rect x="40" y="40" width="70" height="50" fill="#cffafe" stroke="#0891b2" strokeWidth="1" />
      <text x="75" y="68" textAnchor="middle" fill="#0e7490" fontSize="8" fontFamily="system-ui,sans-serif">Kitchen</text>
      <rect x="130" y="40" width="55" height="50" fill="#cffafe" stroke="#0891b2" strokeWidth="1" />
      <text x="157" y="68" textAnchor="middle" fill="#0e7490" fontSize="8" fontFamily="system-ui,sans-serif">Bath</text>
    </svg>
  );
}

function ElecItems() {
  return (
    <svg {...svgProps} aria-hidden>
      <rect x="0" y="0" width="320" height="120" fill="#fffbeb" rx="8" />
      <circle cx="80" cy="55" r="18" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <circle cx="160" cy="55" r="18" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <rect x="210" y="42" width="24" height="24" rx="2" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="160" y="100" textAnchor="middle" fill="#b45309" fontSize="9" fontFamily="system-ui,sans-serif">Lights / sockets / items count</text>
    </svg>
  );
}

function resolveArt(key: string, formData: FormContext, translate: (key: string) => string) {
  if (key === 'ill_fence_service') {
    const st = formData.serviceType;
    if (st === translate('opt_new_install')) return <FenceNewInstall />;
    if (st && st !== translate('opt_select')) return <FenceRepair />;
    return <FenceNewInstall />;
  }

  const map: Record<string, ReactElement> = {
    ill_fence_types: <FenceTypes />,
    ill_fence_length: <FenceLength />,
    ill_fence_height: <FenceHeight />,
    ill_fence_gate: <FenceGate />,
    ill_paint_area: <PaintArea />,
    ill_paint_measure: <PaintMeasure />,
    ill_clean_rooms: <CleanRooms />,
    ill_move_load: <MoveLoad />,
    ill_move_route: <MoveRoute />,
    ill_furn_assembly: <FurnAssembly />,
    ill_plumb_location: <PlumbLocation />,
    ill_elec_items: <ElecItems />,
  };
  return map[key] ?? null;
}

export default function FieldIllustration({ field, formData, translate }: FieldIllustrationProps) {
  if (!field.illustrationKey) return null;

  const art = resolveArt(field.illustrationKey, formData, translate);
  if (!art) return null;

  const caption = field.illustrationCaption || translate('ill_reference');

  return (
    <figure className="mb-3 overflow-hidden rounded-lg border border-teal-100 bg-gradient-to-br from-teal-50/80 to-white">
      <figcaption className="px-3 pt-2 text-xs font-medium text-teal-800">{caption}</figcaption>
      <div className="px-2 pb-2">{art}</div>
    </figure>
  );
}
