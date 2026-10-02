/** Kleine, einheitlich gezeichnete Linien-Icons (24er Raster, 1,5 Strich). */
const PATHS = {
  arrow: <path d="M5 12h13M13 6l6 6-6 6" />,
  external: <path d="M8 16 17 7M9 7h8v8" />,
  phone: <path d="M6.5 3.5h3l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />,
  mail: <><rect x="3.5" y="5.5" width="17" height="13" rx="1" /><path d="m4 6.5 8 6 8-6" /></>,
  train: <><rect x="6" y="3.5" width="12" height="13" rx="2" /><path d="M6 11h12M9.5 14h.01M14.5 14h.01M8.5 20.5l2-4M15.5 20.5l-2-4" /></>,
  car: <><path d="M5 16.5v-4l2-5h10l2 5v4" /><path d="M4 16.5h16M7 19.5v-3M17 19.5v-3M8 13h.01M16 13h.01" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  bag: <><path d="M5.5 8.5h13l-1 12h-11l-1-12Z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></>,
  pin: <><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></>,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  access: <><circle cx="12" cy="4.8" r="1.6" /><path d="M7 8.5h10M12 8.5v5.5M12 14l-3 6.5M12 14l3 6.5" /></>,
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {PATHS[name]}
    </svg>
  );
}
