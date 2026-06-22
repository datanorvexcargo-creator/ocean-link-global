'use client';

import { useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { LOCALES, PRIMARY_NAV, REGIONS, UTILITY_LINKS } from '@/lib/constants';
import { useCursor } from '@/components/providers/CursorProvider';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [locale, setLocale] = useState(LOCALES[0]);
  const [region, setRegion] = useState(REGIONS[0]);
  const cursor = useCursor();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 80);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-[70]">
      {/* Top utility bar — collapses on scroll */}
      <motion.div
        initial={false}
        animate={{
          height: scrolled ? 0 : 36,
          opacity: scrolled ? 0 : 1,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden border-b border-white/[0.06] bg-abyss text-chalk/85"
      >
        <div className="mx-auto flex h-9 max-w-[1480px] items-center justify-between px-6 font-mono text-[10.5px] uppercase tracking-wider-2 md:px-10">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span aria-hidden className="relative block h-1.5 w-1.5 rounded-full bg-signal">
                <span className="absolute inset-0 animate-ping rounded-full bg-signal opacity-75" />
              </span>
              <span className="hidden sm:inline">Operations · 24 / 7</span>
            </span>
            <Select label="Region" value={region} options={REGIONS} onChange={setRegion} />
          </div>
          <ul className="hidden items-center gap-7 md:flex">
            {UTILITY_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="transition-colors duration-300 hover:text-chalk"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2 border-l border-white/10 pl-7">
              <Select label="Lang" value={locale} options={LOCALES} onChange={setLocale} />
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Main nav — glass on dark */}
      <motion.div
        animate={{
          backgroundColor: scrolled ? 'rgba(2,8,15,0.72)' : 'rgba(2,8,15,0.55)',
          borderColor: scrolled ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.06)',
          boxShadow: scrolled
            ? '0 1px 40px -8px rgba(37,99,235,0.45)'
            : '0 1px 0 0 rgba(255,255,255,0.04)',
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative border-b backdrop-blur-xl will-change-transform"
      >
        {/* shimmer underline */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-electric/55 to-transparent"
        />
        <div className="mx-auto flex h-[68px] max-w-[1480px] items-center gap-6 px-6 md:h-[76px] md:px-10">
          {/* logo */}
          <a
            href="#top"
            onPointerEnter={() => cursor.setLabel('Home')}
            onPointerLeave={() => cursor.setLabel(null)}
            className="flex items-center gap-3"
          >
            <Logo variant="full" size={36} />
          </a>

          {/* primary nav */}
          <nav
            aria-label="Primary"
            className="ml-6 hidden flex-1 items-center gap-1 lg:flex"
          >
            {PRIMARY_NAV.map((item) =>
              'items' in item ? (
                <Dropdown key={item.label} label={item.label} items={item.items!} />
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onPointerEnter={() => cursor.setLabel(item.label)}
                  onPointerLeave={() => cursor.setLabel(null)}
                  className="rounded-md px-3 py-2 font-sans text-[14px] font-medium tracking-tight text-chalk/75 transition-colors duration-300 hover:text-chalk"
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>

          {/* primary CTA */}
          <a
            href="#open-route"
            onPointerEnter={() => {
              cursor.setMode('magnetic');
              cursor.setLabel(null);
            }}
            onPointerLeave={() => {
              cursor.setMode('default');
              cursor.setLabel(null);
            }}
            className="ml-auto hidden items-center gap-2 rounded-full bg-signal px-5 py-3 font-sans text-[13px] font-semibold tracking-tight text-chalk transition-all duration-300 hover:bg-ember hover:shadow-[0_8px_28px_-8px_rgba(229,57,53,0.7)] md:inline-flex"
          >
            Request a quote
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>

          {/* mobile toggle */}
          <button
            type="button"
            onClick={() => setDrawer(!drawer)}
            aria-label={drawer ? 'Close menu' : 'Open menu'}
            aria-expanded={drawer}
            className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-chalk lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              {drawer ? (
                <>
                  <path d="M6 6 18 18" />
                  <path d="M18 6 6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </motion.div>

      {/* mobile drawer */}
      <AnimatePresence>
        {drawer ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-full border-b border-white/10 bg-midnight/95 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl"
            >
              <nav
                aria-label="Mobile"
                className="mx-auto flex max-w-[1480px] flex-col px-6 py-6 md:px-10"
              >
                <ul className="flex flex-col">
                  {PRIMARY_NAV.map((item) => (
                    <li key={item.label} className="border-b border-white/8 py-4">
                      <a
                        href={'href' in item ? item.href : '#'}
                        onClick={() => setDrawer(false)}
                        className="flex items-center justify-between font-display text-lg font-semibold tracking-tight text-chalk"
                      >
                        {item.label}
                        <svg viewBox="0 0 16 16" className="h-4 w-4 text-haze" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href="#open-route"
                    onClick={() => setDrawer(false)}
                    className="rounded-full bg-signal px-5 py-4 text-center font-sans text-sm font-semibold text-chalk"
                  >
                    Request a quote
                  </a>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[10px] uppercase tracking-wider-2 text-haze">
                  {UTILITY_LINKS.map((l) => (
                    <a key={l.label} href={l.href}>{l.label}</a>
                  ))}
                </div>
              </nav>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function Dropdown({
  label,
  items,
}: {
  label: string;
  items: Array<{ id: string; label: string; href: string }>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-md px-3 py-2 font-sans text-[14px] font-medium tracking-tight text-chalk/75 transition-colors duration-300 hover:text-chalk"
      >
        {label}
        <svg viewBox="0 0 12 12" className={cn('h-2.5 w-2.5 transition-transform duration-300', open && 'rotate-180')} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="m3 4.5 3 3 3-3" />
        </svg>
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="menu"
            className="absolute left-0 top-full z-10 min-w-[240px] pt-3"
          >
            <ul className="rounded-2xl border border-white/10 bg-midnight/95 p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              {items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    role="menuitem"
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 font-sans text-sm text-chalk/80 transition-colors duration-200 hover:bg-white/[0.04] hover:text-chalk"
                  >
                    {item.label}
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-haze" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                      <path d="M5 3l5 5-5 5" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-2">
      <span className="hidden text-haze md:inline">{label}</span>
      <span className="relative inline-flex">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
          className="cursor-pointer appearance-none bg-transparent pr-4 font-mono text-[10.5px] uppercase tracking-wider-2 text-chalk outline-none"
        >
          {options.map((o) => (
            <option key={o} value={o} className="bg-abyss text-chalk">
              {o}
            </option>
          ))}
        </select>
        <svg viewBox="0 0 10 10" className="pointer-events-none absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 text-haze" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="m2 4 3 3 3-3" />
        </svg>
      </span>
    </label>
  );
}
