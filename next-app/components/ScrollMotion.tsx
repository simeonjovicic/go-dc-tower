'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type MotionElement = HTMLElement & {
  dataset: DOMStringMap & {
    parallax?: string;
    scrollX?: string;
    rotate?: string;
  };
};

export function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;

    const elements = Array.from(
      document.querySelectorAll<MotionElement>('[data-parallax], [data-scroll-x]'),
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - viewport);
      document.documentElement.style.setProperty(
        '--page-progress',
        String(Math.min(1, Math.max(0, window.scrollY / maxScroll))),
      );

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -viewport * 0.35 || rect.top > viewport * 1.35) return;

        const center = rect.top + rect.height / 2;
        const position = Math.max(-1, Math.min(1, (viewport / 2 - center) / (viewport + rect.height) * 2));
        const y = Number(element.dataset.parallax ?? 0) * position;
        const x = Number(element.dataset.scrollX ?? 0) * position;
        const rotation = Number(element.dataset.rotate ?? 0) * position;

        element.style.setProperty('--motion-y', `${y.toFixed(2)}px`);
        element.style.setProperty('--motion-x', `${x.toFixed(2)}px`);
        element.style.setProperty('--motion-r', `${rotation.toFixed(2)}deg`);
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <i />
    </div>
  );
}
