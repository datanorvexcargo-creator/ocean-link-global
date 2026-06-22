'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SCENES } from '@/lib/constants';
import { useCursor } from '@/components/providers/CursorProvider';

type Props = {
  containerRef: React.RefObject<HTMLElement>;
};

export function SectionIndicator({ containerRef }: Props) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const cursor = useCursor();

  return (
    <aside className="pointer-events-none fixed right-8 top-1/2 z-[65] hidden -translate-y-1/2 md:block">
      <ul className="flex flex-col gap-4 font-mono text-[10px] uppercase tracking-wider-2 text-paper/65 mix-blend-difference">
        {SCENES.map((scene, i) => (
          <IndicatorRow
            key={scene.id}
            index={i}
            label={scene.title}
            progress={scrollYProgress}
            onEnter={() => cursor.setLabel(scene.eyebrow)}
            onLeave={() => cursor.setLabel(null)}
          />
        ))}
      </ul>
    </aside>
  );
}

type RowProps = {
  index: number;
  label: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  onEnter: () => void;
  onLeave: () => void;
};

function IndicatorRow({ index, label, progress, onEnter, onLeave }: RowProps) {
  const total = SCENES.length;
  const ref = useRef<HTMLLIElement>(null);
  const start = index / total;
  const end = (index + 1) / total;
  const active = useTransform(progress, [start, end], [0, 1]);
  const opacity = useTransform(active, [0, 0.5, 1], [0.45, 1, 0.45]);
  const lineScale = useTransform(active, [0, 1], [0.35, 1]);

  return (
    <motion.li
      ref={ref}
      style={{ opacity }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className="pointer-events-auto flex items-center gap-3 will-change-transform"
    >
      <motion.span
        style={{ scaleX: lineScale }}
        className="block h-px w-7 origin-left bg-paper"
      />
      <span className="hidden md:inline">{label}</span>
    </motion.li>
  );
}
