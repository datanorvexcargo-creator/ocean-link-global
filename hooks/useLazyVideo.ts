'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Pauses a background video when it scrolls off-screen and resumes it on
 * re-entry. Drops decoder/GPU load to zero for off-screen videos so the
 * page stays smooth on low-end machines even with multiple bg videos.
 */
export function useLazyVideo(
  ref: RefObject<HTMLVideoElement>,
  options: { rootMargin?: string; threshold?: number } = {},
) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            // best-effort resume; ignore play() rejection (autoplay policy)
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      {
        rootMargin: options.rootMargin ?? '200px 0px',
        threshold: options.threshold ?? 0.05,
      },
    );

    io.observe(video);
    return () => io.disconnect();
  }, [ref, options.rootMargin, options.threshold]);
}
