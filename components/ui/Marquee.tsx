'use client';

import { cn } from '@/lib/utils';

export function Marquee({
  items,
  className,
  separator = '·',
}: {
  items: string[];
  className?: string;
  separator?: string;
}) {
  const row = [...items, ...items];
  return (
    <div
      className={cn(
        'relative flex w-full overflow-hidden border-y border-white/10 py-7',
        className,
      )}
    >
      <div className="flex shrink-0 items-center gap-12 animate-marquee whitespace-nowrap will-change-transform">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-12 font-display text-[clamp(2.4rem,5vw,4rem)] font-light tracking-mega-tight text-chalk/90"
          >
            {item}
            <span className="text-signal">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
