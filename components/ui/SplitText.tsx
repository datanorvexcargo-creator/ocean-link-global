'use client';

import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  inView?: boolean;
  amount?: number;
};

const containerVariant: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.04 },
  }),
};

const wordVariant: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
  },
};

export function SplitText({
  text,
  as: Tag = 'h2',
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  once = true,
  inView = true,
  amount = 0.4,
}: Props) {
  const words = text.split(' ');
  const MotionTag = motion[Tag] as any;

  return (
    <MotionTag
      className={cn('overflow-hidden', className)}
      initial="hidden"
      whileInView={inView ? 'visible' : undefined}
      animate={!inView ? 'visible' : undefined}
      viewport={{ once, amount }}
      variants={containerVariant}
      custom={stagger}
      transition={{ delay }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-baseline pr-[0.22em]"
        >
          <motion.span
            variants={wordVariant}
            className={cn('inline-block will-change-transform', wordClassName)}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
