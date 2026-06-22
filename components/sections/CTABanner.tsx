'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  AnimatedGrid,
  LightOrbs,
  GlowBorder,
  ScanLines,
} from '@/components/ui/Backdrop';
import { BRAND } from '@/lib/constants';

const PHONE_RAW = BRAND.phoneRaw;
const EMAIL = BRAND.email;

const CHANNELS = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    detail: 'Réponse instantanée',
    href: `https://wa.me/${PHONE_RAW.replace('+', '')}`,
    tone: 'electric',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M20.52 3.48A11.94 11.94 0 0 0 12.04 0C5.46 0 .1 5.36.1 11.94c0 2.1.55 4.16 1.6 5.97L0 24l6.27-1.64a11.92 11.92 0 0 0 5.77 1.47h.01c6.58 0 11.94-5.36 11.94-11.94a11.86 11.86 0 0 0-3.47-8.41ZM12.05 21.8h-.01a9.82 9.82 0 0 1-5-1.37l-.36-.21-3.72.97 1-3.63-.24-.37a9.82 9.82 0 0 1-1.51-5.25c0-5.43 4.42-9.85 9.85-9.85 2.63 0 5.1 1.03 6.96 2.89a9.78 9.78 0 0 1 2.88 6.96c0 5.43-4.42 9.86-9.85 9.86Zm5.4-7.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.39-1.47a8.97 8.97 0 0 1-1.65-2.06c-.17-.3 0-.46.13-.61.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.18-.24-.58-.48-.5-.66-.5l-.56-.01c-.2 0-.5.07-.76.37-.27.3-1 .98-1 2.4 0 1.4 1.02 2.76 1.16 2.95.15.2 2 3.06 4.86 4.29.68.29 1.21.46 1.62.6.68.22 1.3.19 1.78.12.55-.08 1.75-.71 2-1.4.25-.7.25-1.29.18-1.41-.07-.13-.27-.2-.57-.36Z" />
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    detail: EMAIL,
    href: `mailto:${EMAIL}`,
    tone: 'signal',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    ),
  },
  {
    id: 'tel',
    label: 'Téléphone',
    detail: BRAND.phone,
    href: `tel:${PHONE_RAW}`,
    tone: 'electric',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
  },
] as const;

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  route: string;
  message: string;
};

const initialForm: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  route: '',
  message: '',
};

export function CTABanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const mark = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sentTo, setSentTo] = useState<'email' | 'whatsapp' | null>(null);

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = 'Champ requis.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Email valide requis.';
    }
    if (!form.message.trim()) next.message = 'Décrivez votre besoin.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const dash = '—';

  const composeBody = (channel: 'email' | 'whatsapp') => {
    const timestamp = new Date().toLocaleString('fr-FR', {
      dateStyle: 'long',
      timeStyle: 'short',
    });

    // emphasis marks differ per channel (WhatsApp supports *bold*; email keeps plain)
    const b = (s: string) => (channel === 'whatsapp' ? `*${s}*` : s);

    const lines = [
      b('— DEMANDE DE DEVIS · OCEAN LINK GLOBAL —'),
      '',
      b('▸ Contact'),
      `Nom complet         : ${form.name.trim() || dash}`,
      `Entreprise          : ${form.company.trim() || dash}`,
      `Email               : ${form.email.trim() || dash}`,
      `Téléphone           : ${form.phone.trim() || dash}`,
      '',
      b('▸ Expédition'),
      `Origine → Destination : ${form.route.trim() || dash}`,
      '',
      b('▸ Besoin logistique'),
      form.message.trim() || dash,
      '',
      '— — — — — — — — — — — — — — — — — — —',
      `Envoyée le        : ${timestamp}`,
      `Canal             : ${channel === 'whatsapp' ? 'WhatsApp' : 'Email'}`,
      `Source            : oceanlink-global.com / #open-route`,
    ];

    return lines.join('\n');
  };

  const sendEmail = () => {
    if (!validate()) return;
    const subject = encodeURIComponent(
      `Demande de devis — ${form.name}${form.company ? ' (' + form.company + ')' : ''}${form.route ? ' · ' + form.route : ''}`,
    );
    const body = encodeURIComponent(composeBody('email'));
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSentTo('email');
  };

  const sendWhatsApp = () => {
    if (!validate()) return;
    const text = encodeURIComponent(composeBody('whatsapp'));
    window.open(
      `https://wa.me/${PHONE_RAW.replace('+', '')}?text=${text}`,
      '_blank',
      'noopener,noreferrer',
    );
    setSentTo('whatsapp');
  };

  return (
    <section
      ref={ref}
      id="open-route"
      aria-label="Demande de devis"
      className="relative overflow-hidden bg-abyss py-24 text-chalk md:py-36"
    >
      <GlowBorder tone="signal" />
      <AnimatedGrid opacity={0.05} />
      <LightOrbs density="dense" />
      <ScanLines count={3} />

      <motion.div
        aria-hidden
        style={{ width: mark }}
        className="absolute left-1/2 top-[12%] h-px origin-center -translate-x-1/2 bg-gradient-to-r from-transparent via-signal to-transparent"
      />

      <div className="relative mx-auto grid max-w-[1480px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-10">
        {/* LEFT — pitch + channels */}
        <div className="md:col-span-5">
          <span className="inline-flex items-center gap-2 font-mono text-micro uppercase tracking-wider-3 text-signal">
            <span aria-hidden className="block h-px w-6 bg-signal" />
            Request a quote
          </span>
          <h2 className="mt-7 font-display text-[clamp(2.4rem,4.6vw,4.2rem)] font-light leading-[1.02] tracking-mega-tight text-chalk">
            Parlons de votre{' '}
            <span className="font-medium bg-gradient-to-r from-electric via-chalk to-signal bg-clip-text text-transparent">
              prochain envoi.
            </span>
          </h2>
          <p className="mt-7 max-w-md font-sans text-lede leading-relaxed text-haze">
            Notre équipe répond sous 24 heures avec une proposition logistique
            détaillée et un devis transparent.
          </p>

          {/* Channels */}
          <ul className="mt-10 flex flex-col gap-3">
            {CHANNELS.map((c) => (
              <li key={c.id}>
                <a
                  href={c.href}
                  target={c.id === 'whatsapp' ? '_blank' : undefined}
                  rel={c.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
                  className={`glass ${c.tone === 'signal' ? 'glass-signal' : 'glass-electric'} group flex items-center gap-4 rounded-2xl p-4 md:p-5`}
                >
                  <span
                    aria-hidden
                    className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${c.tone === 'signal' ? 'border-signal/45 bg-signal/10 text-signal-200' : 'border-electric/45 bg-electric/10 text-electric-200'}`}
                  >
                    {c.icon}
                  </span>
                  <div className="flex flex-1 flex-col">
                    <span className="font-sans text-sm font-medium text-chalk">{c.label}</span>
                    <span className="font-mono text-tiny uppercase tracking-wider-2 text-haze break-all">
                      {c.detail}
                    </span>
                  </div>
                  <svg viewBox="0 0 16 16" className={`h-4 w-4 ${c.tone === 'signal' ? 'text-signal' : 'text-electric'} transition-transform duration-500 group-hover:translate-x-1`} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          {/* Support badge */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5">
            <span aria-hidden className="relative inline-flex h-2 w-2 rounded-full bg-signal">
              <span className="absolute inset-0 animate-ping rounded-full bg-signal opacity-75" />
            </span>
            <span className="font-mono text-tiny uppercase tracking-wider-2 text-chalk">
              Support · 24/7 · Multi-langues
            </span>
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="md:col-span-7">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendEmail();
            }}
            noValidate
            className="glass glass-electric rounded-3xl p-7 md:p-10"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
              <Field
                id="cq-name"
                label="Nom complet"
                required
                value={form.name}
                onChange={update('name')}
                error={errors.name}
                autoComplete="name"
              />
              <Field
                id="cq-company"
                label="Entreprise"
                value={form.company}
                onChange={update('company')}
                autoComplete="organization"
              />
              <Field
                id="cq-email"
                type="email"
                inputMode="email"
                label="Email"
                required
                value={form.email}
                onChange={update('email')}
                error={errors.email}
                autoComplete="email"
              />
              <Field
                id="cq-phone"
                type="tel"
                inputMode="tel"
                label="Téléphone"
                value={form.phone}
                onChange={update('phone')}
                autoComplete="tel"
              />
              <div className="md:col-span-2">
                <Field
                  id="cq-route"
                  label="Origine → Destination"
                  value={form.route}
                  onChange={update('route')}
                  placeholder="Tanger → Marseille · 20ft FCL"
                />
              </div>
              <div className="md:col-span-2">
                <Textarea
                  id="cq-message"
                  label="Décrivez votre besoin logistique"
                  required
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  error={errors.message}
                  placeholder="Type de marchandise, volume, contraintes, deadlines, douanes…"
                />
              </div>
            </div>

            <p className="mt-7 font-sans text-tiny leading-relaxed text-haze">
              Choisissez votre canal — <span className="text-chalk">WhatsApp (instantané)</span>{' '}
              ou <span className="text-chalk">Email</span> ({EMAIL}).
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="group inline-flex flex-1 items-center justify-center gap-3 rounded-full bg-signal px-7 py-4 font-sans text-sm font-semibold tracking-tight text-chalk transition-all duration-300 hover:bg-ember hover:shadow-[0_14px_44px_-12px_rgba(229,57,53,0.7)]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
                Envoyer par email
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </button>
              <button
                type="button"
                onClick={sendWhatsApp}
                className="group inline-flex flex-1 items-center justify-center gap-3 rounded-full bg-electric px-7 py-4 font-sans text-sm font-semibold tracking-tight text-chalk transition-all duration-300 hover:bg-electric-300 hover:shadow-[0_14px_44px_-12px_rgba(37,99,235,0.7)]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M20.52 3.48A11.94 11.94 0 0 0 12.04 0C5.46 0 .1 5.36.1 11.94c0 2.1.55 4.16 1.6 5.97L0 24l6.27-1.64a11.92 11.92 0 0 0 5.77 1.47h.01c6.58 0 11.94-5.36 11.94-11.94a11.86 11.86 0 0 0-3.47-8.41Zm-3.07 10.94c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.39-1.47a8.97 8.97 0 0 1-1.65-2.06c-.17-.3 0-.46.13-.61.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.18-.24-.58-.48-.5-.66-.5l-.56-.01c-.2 0-.5.07-.76.37-.27.3-1 .98-1 2.4 0 1.4 1.02 2.76 1.16 2.95.15.2 2 3.06 4.86 4.29.68.29 1.21.46 1.62.6.68.22 1.3.19 1.78.12.55-.08 1.75-.71 2-1.4.25-.7.25-1.29.18-1.41-.07-.13-.27-.2-.57-.36Z" />
                </svg>
                Envoyer via WhatsApp
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </button>
            </div>

            {sentTo ? (
              <motion.p
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 font-mono text-tiny uppercase tracking-wider-2 text-electric-200"
              >
                ✓ Ouverture du canal{' '}
                {sentTo === 'whatsapp' ? 'WhatsApp' : 'Email'} — finalisez l'envoi depuis votre application.
              </motion.p>
            ) : null}

            <p className="mt-7 max-w-lg font-sans text-[11px] leading-relaxed text-haze">
              En soumettant ce formulaire, vous acceptez d'être recontacté
              par notre équipe routage. Aucune liste marketing — uniquement
              le suivi de votre demande.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- Form primitives ---------- */

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'tel';
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  required?: boolean;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
};

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  inputMode,
  required,
  error,
  placeholder,
  autoComplete,
}: FieldProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="block font-mono text-micro uppercase tracking-wider-3 text-haze">
        {label}
        {required ? <span className="ml-1 text-signal">*</span> : null}
      </span>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder ?? label}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 w-full border-b bg-transparent pb-2 font-sans text-base text-chalk outline-none transition-colors duration-300 placeholder:text-haze/45 ${
          error ? 'border-signal focus:border-signal' : 'border-white/20 focus:border-electric'
        }`}
      />
      {error ? (
        <span
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 block font-mono text-[10px] uppercase tracking-wider-2 text-signal"
        >
          {error}
        </span>
      ) : null}
    </label>
  );
}

type TextareaProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  error?: string;
  placeholder?: string;
};

function Textarea({
  id,
  label,
  value,
  onChange,
  required,
  rows = 4,
  error,
  placeholder,
}: TextareaProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="block font-mono text-micro uppercase tracking-wider-3 text-haze">
        {label}
        {required ? <span className="ml-1 text-signal">*</span> : null}
      </span>
      <textarea
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder ?? label}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 w-full resize-none border bg-white/[0.02] p-4 font-sans text-base text-chalk outline-none transition-colors duration-300 placeholder:text-haze/45 ${
          error ? 'border-signal focus:border-signal' : 'border-white/15 focus:border-electric'
        } rounded-xl`}
      />
      {error ? (
        <span
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 block font-mono text-[10px] uppercase tracking-wider-2 text-signal"
        >
          {error}
        </span>
      ) : null}
    </label>
  );
}
