'use client';

import { useEffect } from 'react';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

/**
 * Mounts a body class for the active device tier so CSS rules can react
 * (e.g. drop backdrop-filter on low-tier hardware where it murders frame rate).
 */
export function DeviceTierClass() {
  const { tier, allowBackdropBlur } = useDeviceCapability();

  useEffect(() => {
    const cls = ['tier-low', 'tier-medium', 'tier-high'];
    document.body.classList.remove(...cls);
    document.body.classList.add(`tier-${tier}`);
    document.body.classList.toggle('no-blur', !allowBackdropBlur);
  }, [tier, allowBackdropBlur]);

  return null;
}
