import type { Metadata, Viewport } from 'next';
import { displayFont, editorialFont, sansFont, monoFont } from './fonts';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { CursorProvider } from '@/components/providers/CursorProvider';
import { DeviceTierClass } from '@/components/providers/DeviceTierClass';
import { AnimatedCursor } from '@/components/ui/AnimatedCursor';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { MouseGlow } from '@/components/ui/MouseGlow';
import { ScrollProgress } from '@/components/navigation/ScrollProgress';
import { FloatingNav } from '@/components/navigation/FloatingNav';
import { cn } from '@/lib/utils';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ocean Link Global — Integrated logistics. Sea. Sky. Ground.',
  description:
    'Ocean Link Global is an integrated logistics provider operating maritime, air, and ground corridors across 47 countries. ISO 27001, SOC 2, AEO authorised.',
  metadataBase: new URL('https://oceanlink.global'),
  openGraph: {
    title: 'Ocean Link Global',
    description: 'Integrated logistics. Sea. Sky. Ground.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#06142a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        displayFont.variable,
        editorialFont.variable,
        sansFont.variable,
        monoFont.variable,
      )}
    >
      <body className="relative bg-navy font-sans text-chalk antialiased">
        <a href="#sequence" className="skip-link">
          Skip to main content
        </a>
        <CursorProvider>
          <LenisProvider>
            <DeviceTierClass />
            <ScrollProgress />
            <FloatingNav />
            <MouseGlow />
            <AnimatedCursor />
            <GrainOverlay />
            <div id="top" className="fadein">
              {children}
            </div>
          </LenisProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
