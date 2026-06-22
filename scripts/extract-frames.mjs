#!/usr/bin/env node
/**
 * Extract scroll-bound frames from the source video into /public/frames.
 *
 *   node scripts/extract-frames.mjs [src] [count] [width]
 *
 *   src    – path to .mov / .mp4   (default: ./source.mov)
 *   count  – frames to sample      (default: 180)
 *   width  – output width in px    (default: 1600)
 *
 * Uses ffmpeg-static + sharp; no system binaries required.
 * After it runs, set FRAME_COUNT in lib/constants.ts to the number printed.
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';

const src = process.argv[2] ?? 'source.mov';
const count = Number(process.argv[3] ?? 180);
const width = Number(process.argv[4] ?? 1600);

if (!existsSync(src)) {
  console.error(`✗ source video not found: ${src}`);
  process.exit(1);
}
if (!ffmpegPath) {
  console.error('✗ ffmpeg-static did not provide a binary');
  process.exit(1);
}

const out = resolve('public/frames');
if (existsSync(out)) rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const tmp = resolve('public/frames/_tmp');
mkdirSync(tmp, { recursive: true });

function run(args) {
  return new Promise((res, rej) => {
    const p = spawn(ffmpegPath, args, { stdio: ['ignore', 'inherit', 'inherit'] });
    p.on('exit', (code) =>
      code === 0 ? res() : rej(new Error(`ffmpeg exited ${code}`)),
    );
  });
}

function probeDuration() {
  return new Promise((res, rej) => {
    const p = spawn(
      ffmpegPath,
      ['-hide_banner', '-i', src],
      { stdio: ['ignore', 'pipe', 'pipe'] },
    );
    let buf = '';
    p.stderr.on('data', (d) => (buf += d.toString()));
    p.on('exit', () => {
      const m = buf.match(/Duration:\s*(\d+):(\d+):([\d.]+)/);
      if (!m) return rej(new Error('could not parse duration'));
      const [, h, mm, ss] = m;
      res(Number(h) * 3600 + Number(mm) * 60 + Number(ss));
    });
  });
}

console.log(`→ probing ${src}…`);
const duration = await probeDuration();
const fps = count / duration;
console.log(`→ duration ${duration.toFixed(2)}s · sampling ${count} frames at ${fps.toFixed(3)} fps · width ${width}px`);

console.log('→ extracting JPEGs with ffmpeg…');
await run([
  '-y',
  '-hide_banner',
  '-loglevel', 'warning',
  '-i', src,
  '-vf', `fps=${fps},scale=${width}:-2:flags=lanczos`,
  '-qscale:v', '4',
  resolve(tmp, '%04d.jpg'),
]);

console.log('→ converting to webp with sharp…');
const files = readdirSync(tmp)
  .filter((f) => f.endsWith('.jpg'))
  .sort()
  .slice(0, count);

let i = 0;
for (const f of files) {
  i += 1;
  await sharp(resolve(tmp, f))
    .webp({ quality: 78, effort: 4 })
    .toFile(resolve(out, `${String(i).padStart(4, '0')}.webp`));
}
rmSync(tmp, { recursive: true, force: true });

console.log(`✓ wrote ${i} frames to public/frames`);
console.log(`  → set FRAME_COUNT = ${i} in lib/constants.ts`);
