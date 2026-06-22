'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Marquee } from '@/components/ui/Marquee';
import { AnimatedGrid, LightOrbs, GlowBorder } from '@/components/ui/Backdrop';

const CAPABILITIES = [
  {
    num: '01',
    title: 'Transport Maritime',
    lede: 'Solutions import/export et fret maritime.',
    body: 'Conteneurisation complète et groupage, sur tous les corridors trans-méditerranéens, trans-atlantiques et asiatiques. Manutention portuaire prioritaire et gestion documentaire complète.',
    items: [
      { code: 'FCL', label: 'Full Container Load' },
      { code: 'LCL', label: 'Less than Container Load — Groupage' },
      { code: 'I/E', label: 'Import / Export' },
    ],
    meta: 'FCL · LCL · I/E',
    tone: 'electric',
  },
  {
    num: '02',
    title: 'Transport Routier',
    lede: 'Transport national et international sécurisé.',
    body: 'Flotte routière dédiée à la marchandise générale, au groupage et au fret spécialisé. Suivi temps réel, douanes intégrées et livraison porte-à-porte sur toute l’Europe et le Maghreb.',
    items: [
      { code: 'NAT', label: 'Transport routier national' },
      { code: 'INT', label: 'Transport routier international' },
      { code: 'D2D', label: 'Door-to-Door Shipping' },
    ],
    meta: 'National · International · D2D',
    tone: 'signal',
  },
  {
    num: '03',
    title: 'Transport Aérien',
    lede: 'Livraison rapide pour vos expéditions urgentes.',
    body: 'Fret aérien express, charters dédiés et logistique sensible au temps. Coordination directe avec les compagnies, dédouanement accéléré, livraison aval à l’aéroport ou à l’adresse finale.',
    items: [
      { code: 'XPS', label: 'Aérien Express' },
      { code: 'CHR', label: 'Charters dédiés' },
      { code: 'TTM', label: 'Sensible au temps' },
    ],
    meta: 'Express · Charters',
    tone: 'electric',
  },
  {
    num: '04',
    title: 'Transit & Dédouanement',
    lede: 'Customs brokerage et conformité internationale.',
    body: 'Gestion complète de la chaîne douanière à l’import comme à l’export. Préparation et dépôt des déclarations, classement tarifaire, conformité aux régimes spéciaux et accompagnement audit.',
    items: [
      { code: 'TDD', label: 'Transit & Dédouanement Douanier' },
      { code: 'CSB', label: 'Customs Brokerage' },
      { code: 'I/E', label: 'Import / Export' },
    ],
    meta: 'Douanes · Brokerage · I/E',
    tone: 'signal',
  },
  {
    num: '05',
    title: 'Supply Chain & Multimodal',
    lede: 'Logistique internationale et solutions intégrées.',
    body: 'Orchestration de bout en bout : sourcing, stockage, planification, et coordination multimodale (mer + air + route). Une seule équipe, une seule chaîne de responsabilité.',
    items: [
      { code: 'LIN', label: 'Logistique Internationale' },
      { code: 'SCM', label: 'Supply Chain Management' },
      { code: 'MMD', label: 'Solutions Multimodales — Mer + Air + Route' },
    ],
    meta: 'SCM · Multimodal',
    tone: 'electric',
  },
  {
    num: '06',
    title: 'Suivi & Conseil',
    lede: 'Visibilité totale et expertise logistique.',
    body: 'Plateforme de tracking pour chaque expédition, alertes automatiques et reporting personnalisé. Une équipe d’experts pour vous accompagner sur le choix des routes, des incoterms et de la conformité.',
    items: [
      { code: 'TRK', label: 'Tracking & Suivi des Expéditions' },
      { code: 'CON', label: 'Consultation Logistique' },
    ],
    meta: 'Tracking · Conseil',
    tone: 'signal',
  },
] as const;

export function Capabilities() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);

  return (
    <section
      id="capabilities"
      ref={ref}
      className="relative overflow-hidden bg-navy py-28 md:py-40"
    >
      <GlowBorder tone="signal" />
      <AnimatedGrid opacity={0.05} />
      <LightOrbs density="normal" />

      <Marquee
        items={[
          'Transport Routier',
          'Transport Maritime',
          'Transport Aérien',
          'FCL',
          'LCL',
          'Import / Export',
          'Customs Brokerage',
          'Supply Chain',
          'Door-to-Door',
          'Tracking',
          'Multimodal',
          'Consultation',
        ]}
        className="mb-20"
      />

      <div className="relative mx-auto max-w-[1480px] px-6 md:px-10">
        {/* header row */}
        <div className="grid gap-12 md:grid-cols-12">
          <motion.div style={{ y }} className="md:col-span-5 will-change-transform">
            <span className="inline-flex items-center gap-2 font-mono text-micro uppercase tracking-wider-3 text-signal">
              <span aria-hidden className="block h-px w-6 bg-signal" />
              Nos Services
            </span>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4rem)] font-light leading-[1.04] tracking-mega-tight text-chalk">
              13 services.<br />
              <span className="font-medium">
                <span className="bg-gradient-to-r from-electric via-chalk to-signal bg-clip-text text-transparent">
                  Une chaîne logistique.
                </span>
              </span>
            </h2>
            <p className="mt-7 max-w-md font-sans text-lede leading-relaxed text-haze">
              Ocean Link Global opère comme un prestataire logistique
              intégré — maritime, aérien, routier, douanes et conseil — sous
              une seule équipe et une seule chaîne de responsabilité.
            </p>
            <div className="mt-9 flex items-center gap-3 font-mono text-tiny uppercase tracking-wider-2 text-haze">
              <span aria-hidden className="block h-px w-8 bg-white/30" />
              Présent à l’international · 47 pays desservis
            </div>
          </motion.div>

          <div className="md:col-span-6 md:col-start-7">
            <p className="font-sans text-meta leading-relaxed text-haze">
              <span className="font-mono text-micro uppercase tracking-wider-3 text-electric">
                Six disciplines · 13 services
              </span>
              <br />
              <span className="mt-3 block">
                FCL, LCL, transport routier national et international, fret aérien express,
                transit & dédouanement, customs brokerage, import/export, logistique
                internationale, supply chain management, door-to-door, tracking, solutions
                multimodales et consultation logistique.
              </span>
            </p>
          </div>
        </div>

        {/* services grid */}
        <ul
          className="mt-16 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-2 md:gap-6 xl:grid-cols-3"
          role="list"
        >
          {CAPABILITIES.map((cap, i) => (
            <motion.li
              key={cap.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
                delay: (i % 3) * 0.08,
              }}
              className={`group glass ${cap.tone === 'signal' ? 'glass-signal' : 'glass-electric'} relative flex flex-col gap-5 overflow-hidden rounded-2xl p-7 md:p-8`}
            >
              {/* corner accent */}
              <span
                aria-hidden
                className={`absolute right-6 top-6 inline-flex h-8 w-8 items-center justify-center rounded-full border ${cap.tone === 'signal' ? 'border-signal/40 text-signal' : 'border-electric/40 text-electric'}`}
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="M5 3l5 5-5 5" />
                </svg>
              </span>

              <div className="flex items-baseline gap-4 pr-12">
                <span
                  className={`font-mono text-tiny font-medium uppercase tracking-wider-3 ${
                    cap.tone === 'signal' ? 'text-signal' : 'text-electric'
                  }`}
                >
                  {cap.num}
                </span>
                <h3 className="font-display text-h4 font-medium leading-none tracking-tight text-chalk">
                  {cap.title}
                </h3>
              </div>

              <p className={`font-display text-lede font-light leading-snug ${cap.tone === 'signal' ? 'text-signal-200' : 'text-electric-200'}`}>
                {cap.lede}
              </p>

              <p className="font-sans text-meta leading-relaxed text-haze">
                {cap.body}
              </p>

              {/* sub-services */}
              <ul className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-4">
                {cap.items.map((item) => (
                  <li
                    key={`${cap.num}-${item.code}`}
                    className="flex items-center gap-3 font-sans text-tiny text-chalk/85"
                  >
                    <span
                      aria-hidden
                      className={`flex h-5 w-9 shrink-0 items-center justify-center rounded-full border ${cap.tone === 'signal' ? 'border-signal/35 bg-signal/10 text-signal-200' : 'border-electric/35 bg-electric/10 text-electric-200'} font-mono text-[9px] font-medium uppercase tracking-wider-2`}
                    >
                      {item.code}
                    </span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider-2 text-haze">
                <span aria-hidden className={`block h-px w-6 ${cap.tone === 'signal' ? 'bg-signal' : 'bg-electric'}`} />
                {cap.meta}
              </div>

              {/* corner glow */}
              <span
                aria-hidden
                className={`pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full ${cap.tone === 'signal' ? 'bg-signal/20' : 'bg-electric/25'} blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
