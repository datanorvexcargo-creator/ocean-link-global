'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FloatingParticles } from '@/components/ui/FloatingParticles';
import { AnimatedGrid, LightOrbs, GlowBorder, ScanLines } from '@/components/ui/Backdrop';

const STATEMENT = [
  ['Engineered for', 'predictability.'],
  ['Operated with', 'accountability.'],
  ['Delivered with', 'discretion.'],
];

const COLUMNS = [
  {
    label: 'Predictability',
    body: 'Quoted, contracted and insured before the box is sealed. Schedules held to within hours, not days.',
    tone: 'electric',
  },
  {
    label: 'Accountability',
    body: 'A named routing officer per account. Every handoff documented, every exception escalated within the hour.',
    tone: 'signal',
  },
  {
    label: 'Discretion',
    body: 'Tier-one customers expect confidentiality. We treat your manifest as we would our own balance sheet.',
    tone: 'electric',
  },
] as const;

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative overflow-hidden bg-depth py-28 md:py-40"
    >
      <GlowBorder tone="electric" />
      <AnimatedGrid opacity={0.04} size={64} />
      <LightOrbs density="dense" />
      <FloatingParticles count={20} />
      <ScanLines count={2} />

      <div className="relative mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="flex items-baseline justify-between font-mono text-micro uppercase tracking-wider-3 text-haze">
          <span className="text-signal">Approach</span>
          <span>Doc. ref. 2026 / 011 · Rotterdam</span>
        </div>
        <motion.div
          style={{ width: lineWidth }}
          className="mt-6 h-px origin-left bg-gradient-to-r from-electric via-chalk/60 to-signal"
        />

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="space-y-6 md:space-y-9">
              {STATEMENT.map((row, rowIdx) => (
                <h2
                  key={rowIdx}
                  className="flex flex-wrap gap-x-4 font-display text-[clamp(2.2rem,6vw,5.2rem)] font-light leading-[1.05] tracking-mega-tight"
                >
                  {row.map((chunk, i) => {
                    const isAccent = i === 1;
                    return (
                      <motion.span
                        key={`${rowIdx}-${i}`}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                          duration: 1,
                          ease: [0.16, 1, 0.3, 1],
                          delay: (rowIdx * 2 + i) * 0.08,
                        }}
                        className={
                          isAccent
                            ? 'font-medium bg-gradient-to-r from-electric via-chalk to-signal bg-clip-text text-transparent'
                            : 'text-haze'
                        }
                      >
                        {chunk}
                      </motion.span>
                    );
                  })}
                </h2>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 md:pt-12">
            <div className="glass glass-electric rounded-2xl p-8">
              <p className="font-editorial text-2xl italic leading-snug text-chalk md:text-3xl">
                &ldquo;A logistics provider is judged in the hour something goes
                wrong. We have built our company for that hour.&rdquo;
              </p>
              <div className="mt-7 flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-electric/40 bg-electric/10 font-mono text-tiny font-medium uppercase tracking-wider-2 text-electric"
                >
                  AM
                </span>
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-medium text-chalk">
                    Aiko Mori
                  </span>
                  <span className="font-mono text-tiny uppercase tracking-wider-2 text-haze">
                    Chief Operating Officer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-3">
          {COLUMNS.map((c) => (
            <div key={c.label} className="flex flex-col gap-3">
              <span
                className={`font-mono text-micro uppercase tracking-wider-3 ${
                  c.tone === 'signal' ? 'text-signal' : 'text-electric'
                }`}
              >
                {c.label}
              </span>
              <p className="max-w-xs font-sans text-meta leading-relaxed text-haze">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
