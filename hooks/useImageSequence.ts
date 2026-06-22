'use client';

import { useEffect, useRef, useState } from 'react';

export type SequenceConfig = {
  count: number;
  path: string;
  ext?: string;
  pad?: number;
  start?: number;
};

export type SequenceState = {
  images: HTMLImageElement[];
  loaded: number;
  ready: boolean;
};

export function useImageSequence({
  count,
  path,
  ext = 'webp',
  pad = 4,
  start = 1,
}: SequenceConfig): SequenceState {
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    if (count <= 0) {
      setReady(false);
      return;
    }
    const images: HTMLImageElement[] = new Array(count);
    let cancelled = false;
    let loadedCount = 0;

    const onLoad = () => {
      if (cancelled) return;
      loadedCount += 1;
      setLoaded(loadedCount);
      if (loadedCount === count) setReady(true);
    };

    for (let i = 0; i < count; i++) {
      const img = new Image();
      img.decoding = 'async';
      img.src = `${path}/${String(i + start).padStart(pad, '0')}.${ext}`;
      img.onload = onLoad;
      img.onerror = onLoad;
      images[i] = img;
    }
    imagesRef.current = images;

    return () => {
      cancelled = true;
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [count, path, ext, pad, start]);

  return { images: imagesRef.current, loaded, ready };
}
