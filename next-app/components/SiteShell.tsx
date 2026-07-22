'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { IntroLoader } from '@/components/IntroLoader';
import { SiteFooter } from '@/components/SiteFooter';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/') return children;

  return (
    <>
      <IntroLoader />
      <Header />
      {children}
      <SiteFooter />
    </>
  );
}
