'use client';

import { forwardRef } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { useMagnetic } from '@/hooks/useMagnetic';
import { useCursor } from '@/components/providers/CursorProvider';
import { cn } from '@/lib/utils';

type Props = MotionProps & {
  children: React.ReactNode;
  className?: string;
  variant?: 'solid' | 'ghost' | 'signal';
  href?: string;
  ariaLabel?: string;
  strength?: number;
};

export const MagneticButton = forwardRef<HTMLButtonElement, Props>(
  function MagneticButton(
    { children, className, variant = 'solid', strength = 0.35, ariaLabel, href, ...rest },
    _ref,
  ) {
    const { ref, x, y } = useMagnetic<HTMLButtonElement>(strength);
    const cursor = useCursor();

    const Wrapper: any = href ? motion.a : motion.button;

    const tone =
      variant === 'solid'
        ? 'bg-electric text-chalk hover:bg-electric-300 shadow-[0_12px_36px_-12px_rgba(37,99,235,0.7)]'
        : variant === 'signal'
          ? 'bg-signal text-chalk hover:bg-ember shadow-[0_12px_36px_-12px_rgba(229,57,53,0.7)]'
          : 'border border-white/25 text-chalk hover:border-chalk bg-white/[0.04] backdrop-blur';

    return (
      <Wrapper
        ref={(node: HTMLButtonElement) => {
          (ref as any).current = node;
        }}
        href={href}
        aria-label={ariaLabel}
        onPointerEnter={() => {
          cursor.setMode('magnetic');
          cursor.setLabel(null);
        }}
        onPointerLeave={() => {
          cursor.setMode('default');
          cursor.setLabel(null);
        }}
        style={{ x, y }}
        className={cn(
          'group relative inline-flex items-center justify-center overflow-hidden rounded-full px-9 py-4 font-mono text-xs uppercase tracking-wider-2 will-change-transform transition-colors duration-500 ease-out-expo',
          tone,
          className,
        )}
        {...rest}
      >
        <span className="relative z-10 flex items-center gap-3">
          <span className="block h-1 w-1 rounded-full bg-current" />
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-t from-white/25 to-transparent transition-transform duration-700 ease-out-expo group-hover:translate-y-0"
        />
      </Wrapper>
    );
  },
);
