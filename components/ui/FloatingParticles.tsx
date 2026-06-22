'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

type Particle = {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  tone: 'electric' | 'signal';
};

export function FloatingParticles({
  count = 36,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const { tier, allowAtmosphere } = useDeviceCapability();
  // Auto-scale particle count down on weaker hardware
  const effectiveCount =
    !allowAtmosphere ? 0 : tier === 'medium' ? Math.round(count * 0.4) : count;

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: effectiveCount }, (_, i) => ({
      x: (i * 37) % 100,
      y: (i * 53) % 100,
      size: 1 + ((i * 7) % 3),
      delay: (i * 0.31) % 6,
      duration: 7 + ((i * 11) % 9),
      drift: ((i * 17) % 60) - 30,
      tone: i % 3 === 0 ? 'signal' : 'electric',
    }));
  }, [count]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}
    >
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className={`absolute rounded-full will-change-transform ${
            p.tone === 'signal'
              ? 'bg-signal/70 shadow-[0_0_10px_rgba(229,57,53,0.7)]'
              : 'bg-electric/70 shadow-[0_0_10px_rgba(37,99,235,0.7)]'
          }`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.9, 0],
            y: [0, -110],
            x: [0, p.drift],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
