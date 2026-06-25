'use client';

import { motion } from 'framer-motion';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

/**
 * Light orbs that drift behind content. Density and count auto-scale down
 * on low/medium-tier devices.
 */
export function LightOrbs(_props: {
  density?: 'subtle' | 'normal' | 'dense';
  tones?: Array<'electric' | 'signal'>;
}) {
  // Disabled globally per client request — the drifting background blobs
  // were distracting on every viewport. Keeping the export signature so
  // existing call sites compile unchanged; the component just renders
  // nothing now. Re-enable by restoring the previous implementation.
  return null;
}

/**
 * Subtle SVG grid that sits behind content. Disabled on low tier.
 */
export function AnimatedGrid({
  opacity = 0.06,
  size = 64,
}: {
  opacity?: number;
  size?: number;
}) {
  const { allowAtmosphere } = useDeviceCapability();
  if (!allowAtmosphere) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          `linear-gradient(rgba(255,255,255,${opacity}) 1px, transparent 1px),` +
          ` linear-gradient(90deg, rgba(255,255,255,${opacity}) 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        maskImage:
          'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 30%, transparent 75%)',
        WebkitMaskImage:
          'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 30%, transparent 75%)',
      }}
    />
  );
}

/**
 * Aurora — drifting blurred gradient. Light cost (no JS), kept on all tiers.
 */
export function Aurora() {
  return (
    <div
      aria-hidden
      className="aurora-base pointer-events-none animate-drift"
      style={{ opacity: 0.85 }}
    />
  );
}

/**
 * Diagonal scan-line streaks that travel across a section. Disabled on low tier.
 */
export function ScanLines({ count = 3 }: { count?: number }) {
  const { tier, allowAtmosphere } = useDeviceCapability();
  if (!allowAtmosphere) return null;
  const effective = tier === 'medium' ? Math.min(count, 1) : count;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: effective }).map((_, i) => (
        <span
          key={i}
          className="absolute -left-1/3 right-0 h-px animate-scan-line bg-gradient-to-r from-transparent via-electric/60 to-transparent"
          style={{
            top: `${(i * 31) % 90}%`,
            animationDelay: `${i * 2.1}s`,
            animationDuration: `${10 + (i * 2) % 6}s`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Animated gradient edge ribbon at the top of a section. The colour peak
 * travels left ↔ right every 8 s via a `background-position` keyframe on a
 * 200% oversized gradient. Cheap (single compositor property), always on
 * unless `prefers-reduced-motion` is set.
 */
export function GlowBorder({ tone = 'electric' }: { tone?: 'electric' | 'signal' }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px animate-glow-line will-change-[background-position]"
      style={{
        backgroundImage:
          tone === 'electric'
            ? 'linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.65) 30%, rgba(229,57,53,0.55) 70%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(229,57,53,0.65) 30%, rgba(37,99,235,0.55) 70%, transparent 100%)',
        backgroundSize: '200% 100%',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
}
