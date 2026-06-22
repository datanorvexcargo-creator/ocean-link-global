'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedGrid, LightOrbs, GlowBorder } from '@/components/ui/Backdrop';

type Vertical = {
  title: string;
  blurb: string;
  span: 'lg' | 'md' | 'sm';
  tone: 'electric' | 'signal';
};

const VERTICALS: Vertical[] = [
  { title: 'Pharmaceutical', blurb: '2–8 °C cold chain with continuous telemetry and GDP-validated routes.', span: 'lg', tone: 'electric' },
  { title: 'Fine Art',       blurb: 'Climate-controlled, museum-grade handling with bonded warehousing.',     span: 'md', tone: 'signal'   },
  { title: 'Aerospace',      blurb: 'Over-dimensional, ITAR-aware, hand-cleared at the apron.',               span: 'sm', tone: 'electric' },
  { title: 'Automotive',     blurb: 'Whole-vehicle and component flows on weekly rotation.',                  span: 'sm', tone: 'signal'   },
  { title: 'Fashion',        blurb: 'Drop-day calendars protected end-to-end across three continents.',       span: 'md', tone: 'electric' },
  { title: 'Fine Wine',      blurb: 'Reefers tuned to vintage temperature curves and humidity windows.',      span: 'sm', tone: 'signal'   },
  { title: 'Energy',         blurb: 'Heavy industrial freight on bespoke charters with port priority.',       span: 'sm', tone: 'electric' },
  { title: 'Technology',     blurb: 'Same-week launches across three continents, hand-released.',             span: 'md', tone: 'signal'   },
];

const SPAN_CLASS: Record<Vertical['span'], string> = {
  lg: 'md:col-span-2 md:row-span-2',
  md: 'md:col-span-2',
  sm: '',
};

export function Industries() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const fade = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.7, 0.4]);

  return (
    <section
      id="industries"
      ref={ref}
      aria-label="Industries we serve"
      className="relative overflow-hidden bg-midnight py-28 md:py-40"
    >
      <GlowBorder tone="signal" />
      <AnimatedGrid opacity={0.05} size={56} />
      <LightOrbs density="normal" />
      <motion.div
        aria-hidden
        style={{ opacity: fade }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(37,99,235,0.18),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 font-mono text-micro uppercase tracking-wider-3 text-signal">
              <span aria-hidden className="block h-px w-6 bg-signal" />
              Solutions — Verticals
            </span>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.6vw,4rem)] font-light leading-[1.04] tracking-mega-tight text-chalk">
              Built for cargo that{' '}
              <span className="font-medium bg-gradient-to-r from-electric via-chalk to-signal bg-clip-text text-transparent">
                doesn&rsquo;t forgive.
              </span>
            </h2>
          </div>
          <p className="max-w-xs font-sans text-meta leading-relaxed text-haze md:text-right">
            Each vertical brings its own choreography of permits, temperatures
            and timing. Our routing teams are sector-trained.
          </p>
        </div>

        <ul
          className="grid grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4 md:gap-4"
          role="list"
        >
          {VERTICALS.map((v, i) => (
            <motion.li
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
                delay: (i % 4) * 0.06,
              }}
              tabIndex={0}
              className={`group glass ${v.tone === 'signal' ? 'glass-signal' : 'glass-electric'} relative overflow-hidden rounded-2xl p-5 outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-midnight md:p-6 ${SPAN_CLASS[v.span]}`}
            >
              <div className="flex h-full flex-col justify-between gap-6">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-micro uppercase tracking-wider-3 text-haze">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    aria-hidden
                    className={`relative h-2 w-2 rounded-full ${v.tone === 'signal' ? 'bg-signal' : 'bg-electric'} transition-transform duration-500 group-hover:scale-150`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-0 animate-ping rounded-full ${v.tone === 'signal' ? 'bg-signal' : 'bg-electric'} opacity-60`}
                    />
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3
                    className={`font-display text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-tight tracking-tight text-chalk transition-colors duration-500 ${v.tone === 'signal' ? 'group-hover:text-signal-300' : 'group-hover:text-electric-300'}`}
                  >
                    {v.title}
                  </h3>
                  <p className="max-w-[34ch] font-sans text-tiny leading-relaxed text-haze">
                    {v.blurb}
                  </p>
                </div>
              </div>

              {/* corner cross-hair detail */}
              <span
                aria-hidden
                className="absolute right-3 top-3 h-3 w-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              >
                <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-chalk/40" />
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-chalk/40" />
              </span>

              {/* corner glow */}
              <span
                aria-hidden
                className={`pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full ${v.tone === 'signal' ? 'bg-signal/25' : 'bg-electric/30'} blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
