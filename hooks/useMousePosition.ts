'use client';

import { useEffect } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion';

type Pointer = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  nx: MotionValue<number>;
  ny: MotionValue<number>;
};

const SPRING = { damping: 30, stiffness: 220, mass: 0.6 };

export function useMousePosition(): Pointer {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);

  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);
  const snx = useSpring(nx, SPRING);
  const sny = useSpring(ny, SPRING);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      nx.set((e.clientX / window.innerWidth) * 2 - 1);
      ny.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [x, y, nx, ny]);

  return { x: sx, y: sy, nx: snx, ny: sny };
}
