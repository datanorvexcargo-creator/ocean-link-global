#!/usr/bin/env node
/**
 * Re-encode the public/media videos at higher quality so they remain crisp
 * on mobile retina screens (where the 1080p baseline started to look soft).
 *
 *   node scripts/upscale-videos.mjs
 *
 * Uses the .orig.mp4 backups created by optimize-videos.mjs as source.
 */
import { spawn } from 'node:child_process';
import { existsSync, renameSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import ffmpegPath from 'ffmpeg-static';

if (!ffmpegPath) {
  console.error('✗ ffmpeg-static binary not found');
  process.exit(1);
}

const fmt = (b) => (b / 1024 / 1024).toFixed(2) + ' MB';

const JOBS = [
  {
    src: 'public/media/footer-loop.orig.mp4',
    out: 'public/media/footer-loop.mp4',
    width: 1920,
    crf: 19,
    maxrate: '12M',
    bufsize: '24M',
    label: 'Footer banner · 1080p · high quality',
  },
  {
    src: 'public/media/network-globe.orig.mp4',
    out: 'public/media/network-globe.mp4',
    width: 1080,
    crf: 18,
    maxrate: '8M',
    bufsize: '16M',
    label: 'Network globe · 1080 retina',
  },
];

function run(args) {
  return new Promise((res, rej) => {
    const p = spawn(ffmpegPath, args, { stdio: ['ignore', 'inherit', 'inherit'] });
    p.on('exit', (code) => (code === 0 ? res() : rej(new Error(`ffmpeg ${code}`))));
  });
}

for (const j of JOBS) {
  const src = resolve(j.src);
  const out = resolve(j.out);
  if (!existsSync(src)) {
    console.warn(`⚠  skipping ${j.src} (no .orig backup)`);
    continue;
  }
  const before = statSync(out).size;
  console.log(`\n▸ ${j.label}`);
  const tmp = out.replace(/\.mp4$/, '.tmp.mp4');
  await run([
    '-y',
    '-hide_banner',
    '-loglevel', 'warning',
    '-i', src,
    '-c:v', 'libx264',
    '-profile:v', 'high',
    '-level', '4.0',
    '-pix_fmt', 'yuv420p',
    '-vf', `scale='min(${j.width},iw)':-2:flags=lanczos`,
    '-crf', String(j.crf),
    '-preset', 'slow',
    '-maxrate', j.maxrate,
    '-bufsize', j.bufsize,
    '-movflags', '+faststart',
    '-an',
    tmp,
  ]);
  renameSync(tmp, out);
  const after = statSync(out).size;
  console.log(`  ${fmt(before)} → ${fmt(after)}`);
}

console.log('\n✓ videos re-encoded at higher quality');
