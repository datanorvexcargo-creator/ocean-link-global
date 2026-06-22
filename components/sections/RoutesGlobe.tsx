'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CITIES } from '@/lib/routes';
import { AnimatedGrid, LightOrbs, GlowBorder } from '@/components/ui/Backdrop';
import { useLazyVideo } from '@/hooks/useLazyVideo';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

export function RoutesGlobe() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { eagerVideo } = useDeviceCapability();
  useLazyVideo(videoRef);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const rotateLabel = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      id="routes"
      ref={ref}
      aria-label="Global routes"
      className="relative overflow-hidden bg-midnight py-28 text-chalk md:py-40"
    >
      <GlowBorder tone="electric" />
      <AnimatedGrid opacity={0.04} size={56} />
      <LightOrbs density="normal" tones={['electric', 'signal']} />

      <div className="relative mx-auto grid max-w-[1480px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-12 md:px-10">
        {/* left — looping video globe */}
        <div className="relative flex items-center justify-center md:col-span-5">
          <div className="relative aspect-square w-full max-w-[440px]">
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <video
                ref={videoRef}
                src="/media/network-globe.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload={eagerVideo ? 'auto' : 'metadata'}
                data-decorative="true"
                aria-hidden
                className="h-full w-full object-cover"
              />
              {/* subtle atmospheric rim */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(37,99,235,0.35),inset_0_0_120px_rgba(7,15,34,0.6)]"
              />
              {/* outer halo */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-4 rounded-full bg-[radial-gradient(circle,transparent_55%,rgba(37,99,235,0.18)_75%,transparent_90%)] blur-md"
              />
            </div>

            {/* rotating label ring around the video */}
            <motion.div
              style={{ rotate: rotateLabel }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
            >
              <svg viewBox="0 0 600 600" className="h-full w-full opacity-55">
                <defs>
                  <path
                    id="routeRing"
                    d="M300,300 m-285,0 a285,285 0 1,1 570,0 a285,285 0 1,1 -570,0"
                  />
                </defs>
                <text
                  fill="#c5d3ff"
                  className="font-mono"
                  fontSize="10"
                  letterSpacing="5"
                >
                  <textPath href="#routeRing">
                    {' '}
                    SEA · SKY · GROUND · OCEAN LINK GLOBAL · ROUTES 2026 · SEA ·
                    SKY · GROUND · OCEAN LINK GLOBAL · ROUTES 2026 ·
                  </textPath>
                </text>
              </svg>
            </motion.div>
          </div>
        </div>

        {/* right — copy */}
        <motion.div
          style={{ y }}
          className="flex flex-col gap-8 md:col-span-7 md:pt-10 will-change-transform"
        >
          <span className="inline-flex items-center gap-2 font-mono text-micro uppercase tracking-wider-3 text-signal">
            <span aria-hidden className="block h-px w-6 bg-signal" />
            Network atlas
          </span>
          <h2 className="font-display text-[clamp(2.2rem,4.2vw,3.8rem)] font-light leading-[1.05] tracking-mega-tight text-chalk">
            Seven primary hubs.<br />
            <span className="font-medium bg-gradient-to-r from-electric via-chalk to-signal bg-clip-text text-transparent">
              One continuous network.
            </span>
          </h2>
          <p className="max-w-md font-sans text-lede leading-relaxed text-haze">
            Our network is built as a single global circuit, not a federation of
            point-to-point lanes. Every shipment joins a corridor that already
            operates daily — accelerating clearance, reducing dwell time.
          </p>

          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
            {CITIES.map((city, i) => (
              <motion.li
                key={city.code}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.05 * i,
                }}
                className="group flex items-baseline gap-3 border-l border-white/12 pl-3 transition-colors duration-300 hover:border-electric"
              >
                <span className="font-mono text-tiny uppercase tracking-wider-2 text-signal">
                  {city.code}
                </span>
                <div className="flex-1">
                  <div className="font-sans text-sm text-chalk">{city.name}</div>
                  <div className="font-mono text-tiny uppercase tracking-wider-2 text-haze">
                    {city.region}
                  </div>
                </div>
                <span
                  aria-hidden
                  className="relative h-1.5 w-1.5 rounded-full bg-signal transition-transform duration-500 group-hover:scale-150"
                >
                  <span className="absolute inset-0 animate-ping rounded-full bg-signal opacity-60" />
                </span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-4 flex items-center gap-4 font-mono text-tiny uppercase tracking-wider-2 text-haze">
            <span aria-hidden className="block h-px w-8 bg-white/30" />
            <span>Atlas updates · monthly</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
