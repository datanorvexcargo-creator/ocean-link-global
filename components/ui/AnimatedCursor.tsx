'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '@/components/providers/CursorProvider';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function AnimatedCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 28, stiffness: 360, mass: 0.4 });
  const sy = useSpring(y, { damping: 28, stiffness: 360, mass: 0.4 });
  const { mode, label } = useCursor();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced, x, y]);

  if (reduced) return null;

  const size = mode === 'view' ? 96 : mode === 'magnetic' ? 56 : 14;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden mix-blend-difference md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={{ width: size, height: size }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/90 bg-paper/15 backdrop-blur-[2px] flex items-center justify-center"
      >
        {label ? (
          <span className="text-[10px] font-mono uppercase tracking-wider-2 text-paper">
            {label}
          </span>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
