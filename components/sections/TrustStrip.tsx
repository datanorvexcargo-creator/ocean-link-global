'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { AnimatedGrid, LightOrbs, GlowBorder } from '@/components/ui/Backdrop';

const STATS = [
  { value: 47,   suffix: '',  label: 'Vessels at sea',     meta: 'Active fleet',            tone: 'electric' },
  { value: 24,   suffix: '',  label: 'Aircraft chartered', meta: 'Widebody & freighter',    tone: 'signal'   },
  { value: 1200, suffix: '+', label: 'Ground vehicles',    meta: 'Cross-border operations', tone: 'electric' },
  { value: 39,   suffix: '',  label: 'Logistics hubs',     meta: 'Across six continents',   tone: 'signal'   },
  { value: 47,   suffix: '',  label: 'Countries served',   meta: 'Operations today',        tone: 'electric' },
] as const;

export function TrustStrip() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <section
      ref={ref}
      aria-label="Operational reach"
      className="relative overflow-hidden border-y border-white/[0.06] bg-midnight"
    >
      <GlowBorder tone="electric" />
      <AnimatedGrid opacity={0.04} size={48} />
      <LightOrbs density="subtle" tones={['electric', 'signal']} />

      <motion.div style={{ y }} className="relative mx-auto max-w-[1480px] px-6 py-16 will-change-transform md:px-10 md:py-24">
        <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <span className="inline-flex items-center gap-2 font-mono text-micro uppercase tracking-wider-3 text-signal">
            <span aria-hidden className="block h-px w-6 bg-signal" />
            Operational reach · Q2 2026
          </span>
          <span className="font-mono text-tiny uppercase tracking-wider-2 text-haze">
            Audited monthly · IMO compliant
          </span>
        </div>

        <ul
          className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-5 md:gap-x-10"
          role="list"
        >
          {STATS.map((stat, i) => (
            <motion.li
              key={stat.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.08,
              }}
              className="group relative flex flex-col gap-2.5 md:gap-3"
            >
              <span className="font-mono text-micro uppercase tracking-wider-3 text-haze">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="relative inline-flex">
                <AnimatedCounter
                  to={stat.value}
                  suffix={stat.suffix}
                  duration={2 + i * 0.15}
                  className="font-display text-[clamp(2.8rem,5vw,4.2rem)] font-light leading-none tracking-tight text-chalk"
                />
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -bottom-1 left-0 h-px w-12 origin-left transition-all duration-700 group-hover:w-24 ${
                    stat.tone === 'signal' ? 'bg-signal' : 'bg-electric'
                  }`}
                />
              </span>
              <span className="font-sans text-sm font-medium text-chalk">
                {stat.label}
              </span>
              <span className="font-sans text-meta leading-relaxed text-haze">
                {stat.meta}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
