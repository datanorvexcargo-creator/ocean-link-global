'use client';

import { motion, useTransform, type MotionValue } from 'framer-motion';

type Props = {
  progress: MotionValue<number>;
  eyebrow: string;
  title: string;
  caption: string;
  align?: 'left' | 'right' | 'center';
};

export function SceneCaption({
  progress,
  eyebrow,
  title,
  caption,
  align = 'left',
}: Props) {
  const opacity = useTransform(progress, [0, 0.18, 0.78, 1], [0, 1, 1, 0]);
  const y = useTransform(progress, [0, 0.18, 0.78, 1], [40, 0, 0, -30]);
  const blur = useTransform(progress, [0, 0.2, 0.8, 1], [8, 0, 0, 6]);

  const justify =
    align === 'right'
      ? 'items-end text-right'
      : align === 'center'
        ? 'items-center text-center'
        : 'items-start text-left';

  return (
    <motion.div
      style={{
        opacity,
        y,
        filter: useTransform(blur, (b) => `blur(${b}px)`),
      }}
      className={`absolute inset-x-0 bottom-[14vh] z-30 mx-auto flex max-w-[1480px] flex-col gap-5 px-6 md:px-10 ${justify}`}
    >
      <span className="inline-flex items-center gap-2 font-mono text-micro uppercase tracking-wider-3 text-signal">
        <span aria-hidden className="h-px w-6 bg-signal" />
        {eyebrow}
      </span>
      <h2 className="font-display text-[clamp(2.6rem,6vw,5.6rem)] font-medium leading-[1.02] tracking-mega-tight text-paper drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
        {title}
      </h2>
      <p className="max-w-md font-sans text-meta leading-relaxed text-paper/85 drop-shadow-[0_4px_18px_rgba(0,0,0,0.5)] md:text-base">
        {caption}
      </p>
    </motion.div>
  );
}
