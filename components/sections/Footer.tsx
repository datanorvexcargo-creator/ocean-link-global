'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { AnimatedGrid, LightOrbs, GlowBorder } from '@/components/ui/Backdrop';
import { useLazyVideo } from '@/hooks/useLazyVideo';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import {
  BRAND,
  CERTIFICATIONS,
  FOOTER_COLUMNS,
  REGIONAL_OFFICES,
} from '@/lib/constants';

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-abyss text-chalk">
      <GlowBorder tone="electric" />
      <AnimatedGrid opacity={0.04} />
      <LightOrbs density="subtle" tones={['electric', 'signal']} />
      <div className="relative">
        <VideoBanner />
        <NewsletterRow />
        <LinkColumns />
        <RegionalOffices />
        <Certifications />
        <LegalBar />
      </div>
    </footer>
  );
}

function VideoBanner() {
  const ref = useRef<HTMLVideoElement>(null);
  const { eagerVideo, reducedData } = useDeviceCapability();
  useLazyVideo(ref);

  return (
    <div className="relative isolate overflow-hidden border-b border-white/10">
      {reducedData ? null : (
        <video
          ref={ref}
          src="/media/footer-loop.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload={eagerVideo ? 'auto' : 'metadata'}
          data-decorative="true"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {/* Gradient overlays for legibility */}
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,15,0.45)_0%,rgba(2,8,15,0.25)_40%,rgba(2,8,15,0.85)_100%)]" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(37,99,235,0.25),transparent_55%),radial-gradient(ellipse_at_85%_70%,rgba(229,57,53,0.22),transparent_55%)]" />

      <div className="relative mx-auto flex min-h-[420px] max-w-[1480px] flex-col justify-end px-6 py-16 md:min-h-[560px] md:px-10 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 font-mono text-micro uppercase tracking-wider-3 text-signal">
            <span aria-hidden className="relative block h-1.5 w-1.5 rounded-full bg-signal">
              <span className="absolute inset-0 animate-ping rounded-full bg-signal opacity-75" />
            </span>
            Ocean Link Global · Showreel
          </span>
          <h2 className="mt-6 font-display text-[clamp(2.4rem,5.6vw,5rem)] font-light leading-[1.02] tracking-mega-tight text-chalk">
            {BRAND.tagline}
          </h2>
          <p className="mt-5 max-w-xl font-sans text-lede leading-relaxed text-chalk/85">
            {BRAND.promise}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function NewsletterRow() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  return (
    <div className="border-b border-paper/10">
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:px-10 md:py-24">
        <div className="md:col-span-6">
          <span className="font-mono text-micro uppercase tracking-wider-3 text-paper/45">
            Quarterly briefing
          </span>
          <h3 className="mt-4 max-w-md font-display text-h2 font-light text-paper">
            Insights from the corridors we operate.
          </h3>
          <p className="mt-5 max-w-md font-sans text-meta leading-relaxed text-paper/65">
            A short, factual update — capacity outlook, regulatory shifts, and
            seasonal rate guidance. Sent four times a year. No marketing follow-up.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
            if (!ok) {
              setError('Please enter a valid corporate email.');
              return;
            }
            setError('');
            setDone(true);
          }}
          noValidate
          className="md:col-span-6 md:pt-12"
        >
          {!done ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex-1">
                <span className="sr-only">Work email</span>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@yourcompany.com"
                  aria-invalid={!!error}
                  aria-describedby={error ? 'newsletter-error' : undefined}
                  className="h-14 w-full rounded-full border border-paper/15 bg-paper/[0.04] px-6 font-sans text-meta text-paper outline-none transition-colors duration-300 placeholder:text-paper/35 focus:border-paper/40"
                />
              </label>
              <button
                type="submit"
                className="h-14 rounded-full bg-paper px-7 font-sans text-sm font-semibold tracking-tight text-ink transition-colors duration-300 hover:bg-mist-100"
              >
                Subscribe
              </button>
            </div>
          ) : (
            <motion.div
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 rounded-full border border-paper/15 bg-paper/[0.04] px-6 py-4 font-sans text-meta text-paper"
            >
              <span aria-hidden className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-paper text-ink">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              Subscribed — confirm via the email we just sent to {email}.
            </motion.div>
          )}
          {error ? (
            <p id="newsletter-error" role="alert" className="mt-3 font-mono text-tiny uppercase tracking-wider-2 text-signal-300">
              {error}
            </p>
          ) : null}
          <p className="mt-4 max-w-md font-sans text-tiny text-paper/45">
            We process your email in accordance with GDPR. Unsubscribe in one click.
          </p>
        </form>
      </div>
    </div>
  );
}

function LinkColumns() {
  return (
    <div className="border-b border-paper/10">
      <div className="mx-auto grid max-w-[1480px] grid-cols-2 gap-y-12 px-6 py-20 md:grid-cols-12 md:gap-x-10 md:px-10">
        {/* brand */}
        <div className="col-span-2 md:col-span-3 md:row-span-2">
          <Logo variant="full" size={42} />
          <p className="mt-7 max-w-xs font-sans text-meta leading-relaxed text-paper/70">
            {BRAND.promise}
          </p>
          <p className="mt-6 font-mono text-tiny uppercase tracking-wider-2 text-paper/45">
            HQ · {BRAND.hq}<br />
            Founded {BRAND.founded}
          </p>
          <div className="mt-8 flex items-center gap-3">
            <SocialIcon
              label="LinkedIn"
              href="#"
              path="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56V24H.22V8zM8.34 8h4.37v2.18h.06C13.32 8.94 14.99 7.6 17.5 7.6c4.55 0 5.4 3 5.4 6.9V24h-4.56v-7c0-1.67-.03-3.82-2.33-3.82-2.34 0-2.7 1.83-2.7 3.72V24H8.34V8z"
            />
            <SocialIcon
              label="X"
              href="#"
              path="M18.244 2H21.5l-7.21 8.24L22.5 22h-6.84l-5.36-7.04L4.2 22H.94l7.7-8.8L0 2h6.92l4.84 6.4L18.244 2zm-2.4 18.06h1.88L7.24 3.84H5.22l10.62 16.22z"
            />
            <SocialIcon
              label="Vimeo"
              href="#"
              path="M23.98 6.86c-.1 2.34-1.74 5.54-4.92 9.58-3.28 4.22-6.06 6.34-8.34 6.34-1.4 0-2.6-1.32-3.58-3.96l-1.96-7.18C4.46 8.98 3.68 7.66 2.84 7.66c-.18 0-.82.4-1.92 1.18L0 7.32C1.26 6.2 2.5 5.08 3.72 3.94c1.68-1.46 2.94-2.22 3.78-2.3 2-.18 3.22 1.18 3.68 4.08.5 3.16.84 5.12 1.04 5.88.6 2.68 1.24 4.02 1.96 4.02.56 0 1.4-.88 2.52-2.64 1.12-1.76 1.72-3.1 1.82-4.02.18-1.7-.48-2.56-1.98-2.56-.72 0-1.46.16-2.22.5.8-2.62 2.34-3.9 4.6-3.82 1.68.06 2.48 1.16 2.4 3.32z"
            />
            <SocialIcon
              label="YouTube"
              href="#"
              path="M23.5 6.18a3 3 0 0 0-2.11-2.13C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.39.55A3 3 0 0 0 .5 6.18 31.4 31.4 0 0 0 0 12c0 1.97.17 3.93.5 5.82a3 3 0 0 0 2.11 2.13C4.5 20.5 12 20.5 12 20.5s7.5 0 9.39-.55a3 3 0 0 0 2.11-2.13c.33-1.89.5-3.85.5-5.82s-.17-3.93-.5-5.82zM9.6 15.6V8.4l6.24 3.6L9.6 15.6z"
            />
          </div>
        </div>

        {/* link columns */}
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.heading} className="md:col-span-2">
            <h4 className="font-mono text-tiny uppercase tracking-wider-3 text-paper/45">
              {col.heading}
            </h4>
            <ul className="mt-5 space-y-3.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 font-sans text-meta text-paper/85 transition-colors duration-200 hover:text-paper"
                  >
                    {l.label}
                    <span
                      aria-hidden
                      className="block h-px w-0 bg-paper transition-all duration-300 group-hover:w-3"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function RegionalOffices() {
  const primary = REGIONAL_OFFICES[0];
  return (
    <div className="border-b border-paper/10">
      <div className="mx-auto max-w-[1480px] px-6 py-20 md:px-10">
        <div className="flex flex-col items-baseline justify-between gap-2 md:flex-row">
          <h3 className="font-display text-h3 font-light tracking-tight text-paper">
            Nous contacter
          </h3>
          <span className="font-mono text-tiny uppercase tracking-wider-2 text-paper/45">
            Siège social · Maroc
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12"
        >
          {/* Adresse */}
          <div className="glass glass-electric flex flex-col gap-4 rounded-2xl p-7">
            <span className="inline-flex items-center gap-2 font-mono text-micro uppercase tracking-wider-3 text-electric-200">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M12 22s-7-7.5-7-13a7 7 0 1 1 14 0c0 5.5-7 13-7 13Z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              Adresse
            </span>
            <p className="font-display text-lg font-medium leading-snug text-paper">
              {primary.address}
            </p>
            <p className="font-sans text-meta text-haze">
              {primary.role}
            </p>
            <p className="mt-auto font-mono text-tiny uppercase tracking-wider-2 text-paper/45">
              {primary.city}
            </p>
          </div>

          {/* Téléphone */}
          <a
            href={`tel:${primary.phoneRaw ?? primary.phone.replace(/\s+/g, '')}`}
            className="glass glass-signal group flex flex-col gap-4 rounded-2xl p-7"
          >
            <span className="inline-flex items-center gap-2 font-mono text-micro uppercase tracking-wider-3 text-signal-200">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
              </svg>
              Téléphone
            </span>
            <p className="font-display text-lg font-medium leading-snug text-paper transition-colors group-hover:text-signal-200">
              {primary.phone}
            </p>
            <p className="font-sans text-meta text-haze">
              Lun – Sam · 24/7 sur rendez-vous
            </p>
            <p className="mt-auto font-mono text-tiny uppercase tracking-wider-2 text-paper/45">
              Appel direct
            </p>
          </a>

          {/* Email */}
          <a
            href={`mailto:${primary.email}`}
            className="glass glass-electric group flex flex-col gap-4 rounded-2xl p-7"
          >
            <span className="inline-flex items-center gap-2 font-mono text-micro uppercase tracking-wider-3 text-electric-200">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 6-10 7L2 6" />
              </svg>
              E-mail
            </span>
            <p className="font-display text-lg font-medium leading-snug text-paper transition-colors group-hover:text-electric-200 break-all">
              {primary.email}
            </p>
            <p className="font-sans text-meta text-haze">
              Réponse sous 6 minutes en heures ouvrables.
            </p>
            <p className="mt-auto font-mono text-tiny uppercase tracking-wider-2 text-paper/45">
              Canal direct
            </p>
          </a>
        </motion.div>
      </div>
    </div>
  );
}

function Certifications() {
  return (
    <div className="border-b border-paper/10">
      <div className="mx-auto max-w-[1480px] px-6 py-14 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <span className="font-mono text-tiny uppercase tracking-wider-3 text-paper/45">
            Certifications · Compliance
          </span>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4 lg:grid-cols-8">
            {CERTIFICATIONS.map((c) => (
              <li
                key={c.code}
                className="group flex items-baseline gap-2"
                title={c.body}
              >
                <span className="font-mono text-tiny font-medium uppercase tracking-wider-2 text-paper">
                  {c.code}
                </span>
                <span className="block h-px w-3 bg-paper/35 transition-all duration-300 group-hover:bg-signal group-hover:w-5" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function LegalBar() {
  return (
    <div className="mx-auto max-w-[1480px] px-6 py-8 md:px-10">
      <div className="flex flex-col items-start justify-between gap-4 font-mono text-tiny uppercase tracking-wider-2 text-paper/45 md:flex-row md:items-center">
        <span>© {new Date().getFullYear()} {BRAND.copy}</span>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href="#" className="transition-colors hover:text-paper">Privacy</a>
          <a href="#" className="transition-colors hover:text-paper">Terms</a>
          <a href="#" className="transition-colors hover:text-paper">Cookies</a>
          <a href="#" className="transition-colors hover:text-paper">Sitemap</a>
          <span aria-hidden className="block h-3 w-px bg-paper/20" />
          <span>Built in Tokyo · v0.7</span>
        </div>
      </div>
    </div>
  );
}

function SocialIcon({ label, href, path }: { label: string; href: string; path: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-paper/75 transition-all duration-300 hover:border-paper hover:text-paper"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d={path} />
      </svg>
    </a>
  );
}
