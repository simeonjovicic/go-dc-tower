type Props = { size?: number; className?: string };

const base = (size = 20) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
});

export const Calendar = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="5" width="18" height="16" rx="2.5" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

export const Clock = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const Users = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <path d="M17 11a4 4 0 1 0-4-4" />
    <path d="M3 21v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" />
    <circle cx="9" cy="8" r="4" />
    <path d="M21 21v-1a5 5 0 0 0-4-4.9" />
  </svg>
);

export const User = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
  </svg>
);

export const Phone = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2.1z" />
  </svg>
);

export const Mail = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="M3 6.5l9 6 9-6" />
  </svg>
);

export const MapPin = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <path d="M12 22s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const Train = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <rect x="5" y="3" width="14" height="14" rx="3" />
    <path d="M9 17l-2 3M15 17l2 3M5 11h14" />
    <circle cx="9" cy="14" r=".8" fill="currentColor" />
    <circle cx="15" cy="14" r=".8" fill="currentColor" />
  </svg>
);

export const Parking = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M10 17V8h3.5a3 3 0 0 1 0 6H10" />
  </svg>
);

export const Sparkle = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3z" />
  </svg>
);

export const Note = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <path d="M5 4.5h11l3 3V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1z" />
    <path d="M9 12h6M9 16h4" />
  </svg>
);

export const ArrowRight = ({ size, className }: Props) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);
