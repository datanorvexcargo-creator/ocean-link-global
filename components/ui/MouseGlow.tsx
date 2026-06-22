'use client';

import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

/**
 * Global radial glow that tracks the pointer. Disabled on low/medium-tier
 * devices and when reduced-motion is on — it tracks mouse at 60fps via a
 * spring, which is one of the heavier global effects.
 */
export function MouseGlow() {
  const p = useMousePosition();
  const { allowMouseGlow } = useDeviceCapability();
  if (!allowMouseGlow) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: p.x, y: p.y }}
      className="pointer-events-none fixed left-[-320px] top-[-320px] z-[55] h-[640px] w-[640px] rounded-full mix-blend-screen will-change-transform"
    >
      <div className="h-full w-full bg-[radial-gradient(circle,rgba(37,99,235,0.20)_0%,rgba(37,99,235,0.06)_45%,transparent_70%)]" />
    </motion.div>
  );
}
