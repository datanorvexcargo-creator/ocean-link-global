'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BRAND } from '@/lib/constants';

type Props = {
  className?: string;
  size?: number;
  variant?: 'mark' | 'full' | 'stacked';
  animated?: boolean;
};

export function Logo({
  className,
  size = 40,
  variant = 'mark',
  animated = true,
}: Props) {
  const mark = (
    <LogoMark size={size} animated={animated} />
  );

  if (variant === 'mark') {
    return <span className={cn('inline-flex', className)}>{mark}</span>;
  }

  if (variant === 'stacked') {
    return (
      <span className={cn('inline-flex flex-col items-center gap-3', className)}>
        {mark}
        <Wordmark />
      </span>
    );
  }

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      {mark}
      <Wordmark />
    </span>
  );
}

function LogoMark({ size, animated }: { size: number; animated: boolean }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label="Ocean Link Global"
      className="block shrink-0"
    >
      <defs>
        <linearGradient id="ol-arrow" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#b9211a" />
          <stop offset="55%" stopColor="#e0322a" />
          <stop offset="100%" stopColor="#f25549" />
        </linearGradient>
        <linearGradient id="ol-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a82f7" />
          <stop offset="100%" stopColor="#1e4fd6" />
        </linearGradient>
      </defs>

      {/* globe — outer ring */}
      <motion.g
        initial={animated ? { rotate: -8, opacity: 0 } : undefined}
        animate={animated ? { rotate: 0, opacity: 1 } : undefined}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        style={{ transformOrigin: '100px 100px' }}
      >
        <circle cx="100" cy="100" r="62" stroke="url(#ol-blue)" strokeWidth="9" fill="none" />
        <ellipse cx="100" cy="100" rx="62" ry="22" stroke="url(#ol-blue)" strokeWidth="6" fill="none" />
        <ellipse cx="100" cy="100" rx="22" ry="62" stroke="url(#ol-blue)" strokeWidth="6" fill="none" />
        <ellipse cx="100" cy="100" rx="44" ry="62" stroke="url(#ol-blue)" strokeWidth="5" fill="none" opacity="0.65" />
      </motion.g>

      {/* red arrow swoosh */}
      <motion.g
        initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
        animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
      >
        <motion.path
          d="M 24 138 C 50 70, 130 22, 178 42"
          stroke="url(#ol-arrow)"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
          initial={animated ? { pathLength: 0 } : undefined}
          animate={animated ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
        />
        {/* arrowhead */}
        <path d="M 158 22 L 188 36 L 174 64 Z" fill="url(#ol-arrow)" />
      </motion.g>

      {/* tail flicks under the globe */}
      <path
        d="M 30 158 Q 65 178 110 168"
        stroke="url(#ol-arrow)"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      <path
        d="M 78 178 Q 100 188 138 174"
        stroke="url(#ol-arrow)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
    </svg>
  );
}

function Wordmark() {
  return (
    <span className="flex flex-col leading-none">
      <span className="font-display text-[clamp(1.05rem,1.4vw,1.25rem)] font-bold tracking-tight text-chalk">
        {BRAND.name}
      </span>
      <span className="mt-1 font-mono text-[10px] uppercase tracking-wider-3 text-signal">
        {BRAND.suffix}
      </span>
    </span>
  );
}
