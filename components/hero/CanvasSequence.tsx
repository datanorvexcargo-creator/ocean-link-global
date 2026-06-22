'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useImageSequence } from '@/hooks/useImageSequence';

type Props = {
  containerRef: React.RefObject<HTMLElement>;
  count: number;
  path: string;
  ext?: string;
  pad?: number;
  /** if true, falls back to children while frames are loading */
  showFallback?: boolean;
  children?: React.ReactNode;
};

export function CanvasSequence({
  containerRef,
  count,
  path,
  ext = 'webp',
  pad = 4,
  showFallback = true,
  children,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const { images, loaded, ready } = useImageSequence({ count, path, ext, pad });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const smooth: MotionValue<number> = useSpring(scrollYProgress, {
    damping: 32,
    stiffness: 180,
    mass: 0.5,
  });
  const frame = useTransform(smooth, [0, 1], [0, Math.max(0, count - 1)]);

  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    sizeRef.current = { w, h, dpr };
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    draw(frame.get());
  };

  const draw = (idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    const img = images[Math.floor(idx)];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const { w, h, dpr } = sizeRef.current;
    const cw = w * dpr;
    const ch = h * dpr;
    const ar = img.naturalWidth / img.naturalHeight;
    const cAr = cw / ch;
    let dw: number;
    let dh: number;
    let dx: number;
    let dy: number;
    if (cAr > ar) {
      dw = cw;
      dh = cw / ar;
      dx = 0;
      dy = (ch - dh) / 2;
    } else {
      dh = ch;
      dw = ch * ar;
      dx = (cw - dw) / 2;
      dy = 0;
    }
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  useEffect(() => {
    if (!ready) return;
    resize();
    const onResize = () => resize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  useMotionValueEvent(frame, 'change', (latest) => {
    if (!ready) return;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => draw(latest));
  });

  const progress = count > 0 ? loaded / count : 0;

  if (count <= 0) {
    return showFallback ? <>{children}</> : null;
  }

  return (
    <>
      <motion.canvas
        ref={canvasRef}
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 h-full w-full will-change-transform"
      />
      {!ready && showFallback ? <>{children}</> : null}
      {!ready ? <PreloadOverlay progress={progress} /> : null}
    </>
  );
}

function PreloadOverlay({ progress }: { progress: number }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 1 ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-0 bottom-12 z-40 mx-auto flex max-w-[1640px] items-end justify-between px-8 font-mono text-[10px] uppercase tracking-wider-3 text-paper/85 md:px-12"
    >
      <span className="flex items-center gap-3">
        <span className="inline-block h-px w-10 bg-paper" />
        Loading sequence
      </span>
      <span className="flex items-center gap-4">
        <span className="relative h-px w-40 overflow-hidden bg-paper/30">
          <motion.span
            style={{ scaleX: progress, transformOrigin: '0% 50%' }}
            className="absolute inset-y-0 left-0 right-0 bg-signal"
          />
        </span>
        <span>{String(Math.round(progress * 100)).padStart(3, '0')} %</span>
      </span>
    </motion.div>
  );
}
