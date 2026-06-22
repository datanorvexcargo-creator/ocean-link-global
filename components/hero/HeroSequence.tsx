'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { CanvasSequence } from './CanvasSequence';
import { SceneCaption } from './SceneCaption';
import { SectionIndicator } from '@/components/navigation/SectionIndicator';
import { Logo } from '@/components/ui/Logo';
import { useMousePosition } from '@/hooks/useMousePosition';
import {
  BRAND,
  SCENES,
  SCENE_COUNT,
  FRAME_COUNT,
  FRAME_PATH,
  FRAME_EXT,
} from '@/lib/constants';

export function HeroSequence() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 36,
    stiffness: 180,
    mass: 0.5,
  });

  const pointer = useMousePosition();
  const parallaxX = useTransform(pointer.nx, [-1, 1], [-12, 12]);
  const parallaxY = useTransform(pointer.ny, [-1, 1], [-8, 8]);

  const counterOpacity = useTransform(scrollYProgress, [0, 0.04, 0.08], [1, 1, 0]);
  const counterY = useTransform(scrollYProgress, [0, 0.08], [0, -30]);

  return (
    <section
      id="sequence"
      ref={containerRef}
      className="relative bg-ink"
      style={{ height: `${SCENE_COUNT * 110}vh` }}
    >
      <SectionIndicator containerRef={containerRef} />

      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        {/* SCROLL-BOUND CANVAS IMAGE SEQUENCE */}
        <motion.div
          style={{ x: parallaxX, y: parallaxY }}
          className="absolute inset-0 will-change-transform"
        >
          <CanvasSequence
            containerRef={containerRef}
            count={FRAME_COUNT}
            path={FRAME_PATH}
            ext={FRAME_EXT}
            showFallback
          >
            <BrandedPreloader />
          </CanvasSequence>
        </motion.div>

        {/* cinematic letterbox to lock 21:9 feeling and frame captions */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[14vh] bg-gradient-to-b from-ink/85 via-ink/35 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[32vh] bg-gradient-to-t from-ink/90 via-ink/45 to-transparent" />

        {/* scene captions — each tied to its scroll window */}
        {SCENES.map((scene, i) => (
          <CaptionLayer
            key={scene.id}
            index={i}
            scene={scene}
            progress={smoothProgress}
          />
        ))}

        {/* corner timecode */}
        <div className="pointer-events-none absolute left-8 top-1/2 z-30 hidden -translate-y-1/2 -rotate-90 font-mono text-[10px] uppercase tracking-wider-3 text-paper/40 md:block">
          OLG · Cinematic Logistics · v0.7
        </div>

        {/* scene 01 intro */}
        <motion.div
          style={{ opacity: counterOpacity, y: counterY }}
          className="absolute left-6 top-28 z-30 flex items-baseline gap-4 font-mono text-micro uppercase tracking-wider-3 text-paper/85 md:left-10 md:top-32"
        >
          <span className="text-signal">Ocean Link Global</span>
          <span aria-hidden>·</span>
          <span>An integrated logistics film, in seven movements</span>
        </motion.div>

        {/* final reveal — overlay on last scene window */}
        <FinalReveal progress={smoothProgress} />
      </div>
    </section>
  );
}

type CaptionLayerProps = {
  index: number;
  scene: (typeof SCENES)[number];
  progress: MotionValue<number>;
};

function CaptionLayer({ index, scene, progress }: CaptionLayerProps) {
  const total = SCENE_COUNT;
  const start = index / total;
  const end = (index + 1) / total;
  const local = useTransform(progress, [start, end], [0, 1], { clamp: true });
  if (index === total - 1) return null;
  return (
    <SceneCaption
      progress={local}
      eyebrow={scene.eyebrow}
      title={scene.title}
      caption={scene.caption}
      align={index % 2 === 0 ? 'left' : 'right'}
    />
  );
}

function FinalReveal({ progress }: { progress: MotionValue<number> }) {
  const start = (SCENE_COUNT - 1) / SCENE_COUNT;
  // ramp veil aggressively so logo is always legible inside the final window
  const veil = useTransform(progress, [start - 0.01, start, 1], [0, 0.55, 0.82]);
  const opacity = useTransform(progress, [start - 0.01, start + 0.04, 1], [0, 1, 1]);
  const y = useTransform(progress, [start, 1], [40, 0]);
  const scale = useTransform(progress, [start, 1], [0.92, 1]);
  const lineW = useTransform(progress, [start + 0.02, start + 0.08, 1], ['0%', '60%', '60%']);

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-auto absolute inset-0 z-30 flex flex-col items-center justify-center text-center"
    >
      <motion.div
        style={{ opacity: veil }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(7,15,34,0.95)_0%,rgba(7,15,34,0.65)_60%,rgba(7,15,34,0.4)_100%)]"
      />
      <motion.div style={{ y, scale }} className="relative z-10 px-6 md:px-10 will-change-transform">
        <Logo variant="stacked" size={120} />
        <motion.div
          style={{ width: lineW }}
          className="mx-auto mt-10 h-px origin-left bg-gradient-to-r from-transparent via-signal to-transparent"
        />
        <p className="mx-auto mt-8 max-w-xl font-display text-lg font-light leading-snug text-paper md:text-2xl">
          {BRAND.tagline}
        </p>
        <p className="mx-auto mt-4 max-w-md font-sans text-meta leading-relaxed text-paper/70 md:text-base">
          {BRAND.promise}
        </p>
        <div className="mt-10 flex items-center justify-center gap-3 font-mono text-tiny uppercase tracking-wider-2 text-paper/60">
          <span className="h-px w-10 bg-paper/45" />
          07 — Delivered
          <span className="h-px w-10 bg-paper/45" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function BrandedPreloader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_45%,#13203a_0%,#070f22_70%)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col items-center gap-6"
      >
        <div className="relative">
          <span className="absolute inset-0 -m-6 animate-orbit-slow rounded-full border border-dashed border-azure/35" />
          <span className="absolute inset-0 -m-12 animate-orbit-slow rounded-full border border-signal/20" style={{ animationDuration: '32s', animationDirection: 'reverse' }} />
          <Logo variant="mark" size={64} />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider-3 text-paper/70">
          {BRAND.full}
        </span>
      </motion.div>
    </div>
  );
}
