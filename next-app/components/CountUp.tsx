'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  end: number;
  start?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
};

export function CountUp({
  end,
  start = 0,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 1400,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState<number>(end);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setValue(end);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          io.disconnect();
          let startT: number | null = null;
          const tick = (now: number) => {
            if (startT === null) startT = now;
            const t = Math.min((now - startT) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(start + (end - start) * eased);
            if (t < 1) requestAnimationFrame(tick);
            else setValue(end);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, start, duration]);

  const formatted = value.toFixed(decimals).replace('.', ',');
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}
