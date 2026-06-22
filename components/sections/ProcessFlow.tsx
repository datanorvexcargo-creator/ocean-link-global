'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedGrid, LightOrbs, GlowBorder } from '@/components/ui/Backdrop';

const STEPS = [
  {
    n: '01',
    title: 'Brief',
    eta: '6 min',
    body: 'A private channel opens with your routing officer. Origin, destination, and constraints captured in plain language.',
    tone: 'electric',
    icon: (
      <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden>
        <path
          d="M6 8 L26 8 M6 14 L22 14 M6 20 L18 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Plan',
    eta: '24 hours',
    body: 'A multi-modal route built around your delivery rhythm. Quoted, contracted and insured before the box is sealed.',
    tone: 'signal',
    icon: (
      <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden>
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M16 6 L16 26 M6 16 L26 16" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="16" cy="16" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Move',
    eta: 'Live',
    body: 'Chain-of-custody from doorstep to deck to airframe. Real-time telemetry, audited at every handoff.',
    tone: 'electric',
    icon: (
      <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden>
        <path
          d="M4 22 L10 22 L14 14 L20 14 L24 22 L30 22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="11" cy="22" r="2.5" fill="currentColor" />
        <circle cx="22" cy="22" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    n: '04',
    title: 'Land',
    eta: 'On arrival',
    body: 'Concierge handover and a written post-arrival report. We close the loop, so nothing reopens.',
    tone: 'signal',
    icon: (
      <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden>
        <path
          d="M16 4 L26 14 L20 14 L20 26 L12 26 L12 14 L6 14 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
] as const;

export function ProcessFlow() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.6', 'end 0.4'],
  });
  const lineLength = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="process"
      ref={ref}
      aria-label="Chain of custody"
      className="relative overflow-hidden bg-depth py-28 md:py-40"
    >
      <GlowBorder tone="electric" />
      <AnimatedGrid opacity={0.05} />
      <LightOrbs density="subtle" />

      <div className="relative mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 font-mono text-micro uppercase tracking-wider-3 text-signal">
              <span aria-hidden className="block h-px w-6 bg-signal" />
              Process — Chain of custody
            </span>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.6vw,4rem)] font-light leading-[1.04] tracking-mega-tight text-chalk">
              Four signatures.{' '}
              <span className="font-medium bg-gradient-to-r from-electric via-chalk to-signal bg-clip-text text-transparent">
                One process.
              </span>
            </h2>
          </div>
          <p className="max-w-xs font-sans text-meta leading-relaxed text-haze md:text-right">
            A single operational standard from origin pickup to documented
            delivery — applied to every shipment, in every corridor.
          </p>
        </div>

        <div className="relative">
          {/* connector track */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[34px] hidden h-px bg-white/10 md:block"
          />
          <motion.div
            aria-hidden
            style={{ width: lineLength }}
            className="absolute left-0 top-[34px] hidden h-px origin-left md:block"
          >
            <span className="block h-full bg-gradient-to-r from-electric via-electric to-signal" />
          </motion.div>

          <ol className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-6" role="list">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.95,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.1,
                }}
                className={`group glass ${step.tone === 'signal' ? 'glass-signal' : 'glass-electric'} relative flex flex-col gap-5 rounded-2xl p-6 md:p-7`}
              >
                {/* node */}
                <div className="relative flex items-center gap-3 md:block">
                  <span
                    className={`relative flex h-[60px] w-[60px] items-center justify-center rounded-full border bg-midnight ${
                      step.tone === 'signal'
                        ? 'border-signal/45 text-signal'
                        : 'border-electric/45 text-electric'
                    }`}
                  >
                    {step.icon}
                    <span
                      aria-hidden
                      className={`absolute inset-0 -z-10 animate-pulse-glow rounded-full ${
                        step.tone === 'signal' ? 'bg-signal/20' : 'bg-electric/20'
                      } blur-md`}
                    />
                  </span>
                  <span className="font-mono text-tiny uppercase tracking-wider-3 text-haze md:absolute md:-top-7 md:left-0">
                    {step.n}
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-h4 font-semibold leading-none tracking-tight text-chalk">
                    {step.title}
                  </h3>
                  <span className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider-2 text-haze">
                    {step.eta}
                  </span>
                </div>

                <p className="font-sans text-meta leading-relaxed text-haze">
                  {step.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
