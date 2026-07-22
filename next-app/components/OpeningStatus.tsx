'use client';

import { useEffect, useState } from 'react';

type Schedule = { start: number; end: number } | null;

const VIENNA_TIME = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Vienna',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

const DAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const DAY_NAMES = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

// Sunday 11–17, Monday–Friday 11–22, Saturday closed.
const HOURS: Schedule[] = [
  { start: 11 * 60, end: 17 * 60 },
  { start: 11 * 60, end: 22 * 60 },
  { start: 11 * 60, end: 22 * 60 },
  { start: 11 * 60, end: 22 * 60 },
  { start: 11 * 60, end: 22 * 60 },
  { start: 11 * 60, end: 22 * 60 },
  null,
];

type Status = {
  open: boolean;
  primary: string;
  secondary: string;
};

function formatTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} Uhr`;
}

function getViennaStatus(): Status {
  const parts = Object.fromEntries(
    VIENNA_TIME.formatToParts(new Date()).map((part) => [part.type, part.value]),
  );
  const day = DAY_INDEX[parts.weekday];
  const now = Number(parts.hour) * 60 + Number(parts.minute);
  const today = HOURS[day];

  if (today && now >= today.start && now < today.end) {
    return {
      open: true,
      primary: 'Jetzt geöffnet',
      secondary: `Bis ${formatTime(today.end)} · Donau City`,
    };
  }

  if (today && now < today.start) {
    return {
      open: false,
      primary: 'Heute geschlossen',
      secondary: `Öffnet um ${formatTime(today.start)} · Donau City`,
    };
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const nextDay = (day + offset) % 7;
    const next = HOURS[nextDay];
    if (next) {
      return {
        open: false,
        primary: 'Heute geschlossen',
        secondary: `${offset === 1 ? 'Morgen' : DAY_NAMES[nextDay]} ab ${formatTime(next.start)}`,
      };
    }
  }

  return { open: false, primary: 'Heute geschlossen', secondary: 'Öffnungszeiten ansehen' };
}

export function OpeningStatus() {
  const [status, setStatus] = useState<Status>(getViennaStatus);

  useEffect(() => {
    const timer = window.setInterval(() => setStatus(getViennaStatus()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className="hero-hours"
      aria-live="polite"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 14,
        marginTop: 26,
      }}
    >
      <span
        className="hero-hours__text"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 9,
          background: 'rgba(250,246,236,0.95)',
          padding: '9px 14px',
          borderRadius: 999,
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: '0.02em',
          color: '#16181C',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: 8,
            height: 8,
            background: status.open ? '#2FA36B' : 'var(--go-red)',
            borderRadius: '50%',
          }}
        />
        {status.primary}
      </span>
      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: 'rgba(250,246,236,0.8)',
        }}
      >
        {status.secondary}
      </span>
    </div>
  );
}
