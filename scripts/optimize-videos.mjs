#!/usr/bin/env node
/**
 * Re-encode the heavy videos in /public/media to H.264 Baseline 1080p so they
 * play smoothly on hardware ranging from a 2011 laptop to a 2025 desktop.
 *
 * Uses the bundled ffmpeg-static binary — no system ffmpeg required.
 *
 *   node scripts/optimize-videos.mjs
 *
 * Output files keep the same names so the components don't need updating.
 * Originals are backed up with .orig.mp4 extension on first run.
 */
import { spawn } from 'node:child_process';
import { existsSync, renameSync, statSync, copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import ffmpegPath from 'ffmpeg-static';

if (!ffmpegPath) {
  console.error('✗ ffmpeg-static binary not found');
  process.exit(1);
}

const VIDEOS = [
  {
    file: 'public/media/footer-loop.mp4',
    maxWidth: 1920,
    crf: 22,
    label: 'Footer banner — 1080p',
  },
  {
    file: 'public/media/network-globe.mp4',
    maxWidth: 1080,
    crf: 22,
    label: 'Network globe loop',
  },
];

function run(args) {
  return new Promise((res, rej) => {
    const p = spawn(ffmpegPath, args, { stdio: ['ignore', 'inherit', 'inherit'] });
    p.on('exit', (code) => (code === 0 ? res() : rej(new Error(`ffmpeg exited ${code}`))));
  });
}

const fmt = (b) => (b / 1024 / 1024).toFixed(2) + ' MB';

for (const v of VIDEOS) {
  const src = resolve(v.file);
  if (!existsSync(src)) {
    console.warn(`⚠  skipping ${v.file} (not found)`);
    continue;
  }

  const backup = src.replace(/\.mp4$/, '.orig.mp4');
  if (!existsSync(backup)) {
    copyFileSync(src, backup);
    console.log(`→ backup → ${backup.replace(process.cwd(), '.')}`);
  }

  const tmp = src.replace(/\.mp4$/, '.tmp.mp4');
  const srcSize = statSync(src).size;
  console.log(`\n▸ ${v.label} (${fmt(srcSize)})`);
  console.log('  re-encoding to H.264 Baseline · faststart · width ≤', v.maxWidth);

  await run([
    '-y',
    '-hide_banner',
    '-loglevel', 'warning',
    '-i', backup,            // re-encode from the backed-up original each time
    '-c:v', 'libx264',
    '-profile:v', 'baseline',
    '-level', '3.1',
    '-pix_fmt', 'yuv420p',
    '-vf', `scale='min(${v.maxWidth},iw)':-2:flags=lanczos`,
    '-crf', String(v.crf),
    '-preset', 'slow',
    '-maxrate', '6M',
    '-bufsize', '12M',
    '-movflags', '+faststart',
    '-an',
    tmp,
  ]);

  renameSync(tmp, src);
  const newSize = statSync(src).size;
  const saved = ((1 - newSize / srcSize) * 100).toFixed(1);
  console.log(`✓ ${fmt(srcSize)} → ${fmt(newSize)}  (-${saved}%)`);
}

console.log('\n✓ all videos optimised — refresh the dev server');
