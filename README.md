# KOMMODO — Cinematic Logistics

Ultra-premium scroll-driven website. Apple meets luxury maritime logistics.

```
Next.js 14  ·  Framer Motion 11  ·  Lenis  ·  Tailwind CSS
```

## Quickstart

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Architecture

```
app/
  layout.tsx            root shell — fonts, providers, overlays
  page.tsx              hero sequence + capabilities + manifesto + footer
  globals.css           tokens, cursor reset, reduced motion

components/
  providers/            LenisProvider, CursorProvider
  ui/                   AnimatedCursor, MagneticButton, SplitText,
                        GrainOverlay, FloatingParticles, Marquee
  navigation/           FloatingNav, ScrollProgress, SectionIndicator
  hero/
    CanvasSequence.tsx  reusable canvas image-sequence engine
    HeroSequence.tsx    sticky 7-scene orchestrator
    SceneCaption.tsx    editorial caption overlay
    scenes/             7 scroll-bound SVG/CSS scenes (fallback when
                        no image sequence is present)
  sections/             Capabilities, Manifesto, Footer

hooks/                  useImageSequence, useMousePosition, useMagnetic,
                        usePrefersReducedMotion

lib/                    utils, easing curves, scene + brand constants
scripts/                extract-frames.mjs — ffmpeg → webp pipeline
```

## Swapping in real cinematic frames

1. Drop the source video at the project root, e.g. `source.mov`.
2. Run:

   ```bash
   npm run extract-frames -- source.mov 240 1920
   ```

   - arg 1: video path
   - arg 2: frame count (default 240)
   - arg 3: max width in px

   This writes `public/frames/0001.webp … NNNN.webp` (requires `ffmpeg` and `cwebp`).

3. Set the count in `lib/constants.ts`:

   ```ts
   export const FRAME_COUNT = 240;
   ```

The `CanvasSequence` component preloads every frame, then draws the active frame on `requestAnimationFrame` against scroll progress. When `FRAME_COUNT` is `0` (default) it falls back to the SVG/CSS scenes so the site looks finished out of the box.

## Motion system

- **Lenis** wraps the page in inertial scroll (`lerp 0.1`, easeOutExpo).
- **Framer Motion** `useScroll` + `useSpring` provide smoothed scroll-bound `MotionValue`s.
- Each hero scene receives its own local `0 → 1` progress via `useTransform`, then animates SVG layers, gradients and parallax independently.
- All transforms are GPU-promoted (`translateZ(0)`, `will-change: transform`).
- `prefers-reduced-motion: reduce` disables Lenis, the animated cursor, and dampens keyframes globally.

## Visual tokens

| Token        | Value      | Use                              |
| ------------ | ---------- | -------------------------------- |
| `ink`        | `#0a0908`  | Page surface, deep shadows       |
| `cream`      | `#f2ece1`  | Body type, marks                 |
| `copper`     | `#c47a4a`  | Accents, CTAs, micro-indicators  |
| `ember`      | `#e89a5a`  | Highlights, headlight glow       |
| `smoke`      | `#3a3633`  | Mid-greys, container fills       |

Typography:

- **Editorial**: Instrument Serif (titles, manifesto)
- **Sans**: Inter (UI body)
- **Mono**: JetBrains Mono (eyebrows, micro-meta)

## Performance

- Canvas sequence stays GPU-bound; only one image is drawn per frame.
- `useSpring` damps scroll into the canvas to prevent jitter on fast wheels.
- All scenes use `transform`-only animations — no layout reflows mid-scroll.
- Particles are absolute, throttled, and respect reduced motion.
- Frames are preloaded with `decoding="async"` and only painted once `ready === true`.
