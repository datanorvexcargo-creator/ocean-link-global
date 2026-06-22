'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 36,
    mass: 0.5,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0% 50%' }}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[80] h-[2px] bg-gradient-to-r from-azure via-signal to-azure origin-left"
    />
  );
}
