'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedGrid, LightOrbs, GlowBorder } from '@/components/ui/Backdrop';

const QUOTES = [
  {
    text: 'Ocean Link runs our seasonal launches with a precision we used to think only existed in our atelier.',
    name: 'Cécile Marais',
    role: 'COO',
    company: 'Maison Verre, Paris',
    initials: 'CM',
    tone: 'electric',
  },
  {
    text: 'They made the schedule feel optional — in the way that mattered. We say the date. They make it real.',
    name: 'Daniel Okonkwo',
    role: 'VP Supply Chain',
    company: 'Hawthorn Pharmaceutical',
    initials: 'DO',
    tone: 'signal',
  },
  {
    text: 'A logistics partner that returns calls in minutes is rare. One that returns artwork undamaged is rarer.',
    name: 'Hiroshi Tanaka',
    role: 'Head of Collections',
    company: 'Mori Foundation, Tokyo',
    initials: 'HT',
    tone: 'electric',
  },
] as const;

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const lineW = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '100%']);

  return (
    <section
      id="testimonials"
      ref={ref}
      aria-label="What clients say"
      className="relative overflow-hidden bg-navy py-28 md:py-40"
    >
      <GlowBorder tone="signal" />
      <AnimatedGrid opacity={0.04} />
      <LightOrbs density="normal" tones={['electric', 'signal']} />

      <div className="relative mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <span className="inline-flex items-center gap-2 font-mono text-micro uppercase tracking-wider-3 text-signal">
            <span aria-hidden className="block h-px w-6 bg-signal" />
            Client testimony
          </span>
          <span className="font-mono text-tiny uppercase tracking-wider-2 text-haze">
            Verified accounts · NPS 78 · ESG audited
          </span>
        </div>
        <motion.div
          aria-hidden
          style={{ width: lineW }}
          className="mt-8 h-px origin-left bg-gradient-to-r from-electric via-chalk/50 to-signal"
        />

        <ul
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
          role="list"
        >
          {QUOTES.map((q, i) => (
            <motion.li
              key={q.name}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.12,
              }}
              className={`group glass ${q.tone === 'signal' ? 'glass-signal' : 'glass-electric'} relative flex flex-col gap-8 overflow-hidden rounded-2xl p-8 md:p-10`}
            >
              <span
                aria-hidden
                className={`absolute -left-2 -top-10 font-editorial text-[7rem] leading-none ${q.tone === 'signal' ? 'text-signal/25' : 'text-electric/25'}`}
              >
                &ldquo;
              </span>

              <blockquote className="relative">
                <p className="font-editorial text-[clamp(1.35rem,1.7vw,1.6rem)] italic leading-snug tracking-ultra-tight text-chalk">
                  {q.text}
                </p>
              </blockquote>

              <div className="mt-auto flex items-center gap-4">
                <span
                  aria-hidden
                  className={`flex h-12 w-12 items-center justify-center rounded-full border ${q.tone === 'signal' ? 'border-signal/45 bg-signal/10 text-signal-200' : 'border-electric/45 bg-electric/10 text-electric-200'} font-mono text-tiny font-medium uppercase tracking-wider-2`}
                >
                  {q.initials}
                </span>
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-medium text-chalk">{q.name}</span>
                  <span className="font-mono text-tiny uppercase tracking-wider-2 text-haze">
                    {q.role} · {q.company}
                  </span>
                </div>
              </div>

              {/* corner glow */}
              <span
                aria-hidden
                className={`pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full ${q.tone === 'signal' ? 'bg-signal/25' : 'bg-electric/30'} blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
