'use client';

import { useEffect, useState } from 'react';

export type DeviceTier = 'low' | 'medium' | 'high';

type Caps = {
  tier: DeviceTier;
  reducedMotion: boolean;
  reducedData: boolean;
  /** true when we should render heavy backdrops (orbs, grid, glow) */
  allowAtmosphere: boolean;
  /** true when we should run the mouse-follow glow */
  allowMouseGlow: boolean;
  /** true when we should keep backdrop-blur on glass cards */
  allowBackdropBlur: boolean;
  /** true when we should preload videos eagerly */
  eagerVideo: boolean;
};

const initial: Caps = {
  tier: 'high',
  reducedMotion: false,
  reducedData: false,
  allowAtmosphere: true,
  allowMouseGlow: true,
  allowBackdropBlur: true,
  eagerVideo: true,
};

/**
 * Hook that classifies the device into low / medium / high tier based on
 * `prefers-reduced-motion`, `prefers-reduced-data`, hardware concurrency,
 * device memory, and network type.
 *
 * Components consume the boolean helpers (`allowAtmosphere`, `allowMouseGlow`,
 * `allowBackdropBlur`) to gate expensive effects without sprinkling tier
 * checks everywhere.
 */
export function useDeviceCapability(): Caps {
  const [caps, setCaps] = useState<Caps>(initial);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reducedData =
      window.matchMedia('(prefers-reduced-data: reduce)').matches ||
      Boolean((navigator as any).connection?.saveData);

    const cores = navigator.hardwareConcurrency ?? 8;
    const memory = (navigator as any).deviceMemory ?? 8;
    const effectiveType =
      (navigator as any).connection?.effectiveType ?? '4g';
    const slowNet = effectiveType === '2g' || effectiveType === 'slow-2g' || effectiveType === '3g';

    // Tier classification
    let tier: DeviceTier = 'high';
    if (reducedMotion || reducedData || slowNet) tier = 'low';
    else if (cores <= 4 || memory <= 4) tier = 'medium';
    if (cores <= 2 || memory <= 2) tier = 'low';

    setCaps({
      tier,
      reducedMotion,
      reducedData,
      allowAtmosphere: tier !== 'low',
      allowMouseGlow: tier === 'high' && !reducedMotion,
      allowBackdropBlur: tier !== 'low',
      eagerVideo: tier === 'high' && !reducedData,
    });
  }, []);

  return caps;
}
