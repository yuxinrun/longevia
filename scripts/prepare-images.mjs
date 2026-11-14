/**
 * Prepare generated photography for the web: trim the generator watermark strip,
 * downscale to responsive widths and encode as WebP.
 * Usage: node scripts/prepare-images.mjs
 */
import sharp from 'sharp';
import { readdir, unlink } from 'node:fs/promises';
import path from 'node:path';

const dir = path.join(process.cwd(), 'public', 'images');
const files = (await readdir(dir)).filter((f) => f.toLowerCase().endsWith('.png'));

if (files.length === 0) {
  console.log('No source PNG files found; existing WebP assets are kept.');
}

for (const file of files) {
  const src = path.join(dir, file);
  const meta = await sharp(src).metadata();
  if (!meta.width || !meta.height) continue;
  const wide = meta.width > meta.height;
  const trim = wide ? 70 : 95;
  const out = path.join(dir, wide ? 'hero-wide.webp' : 'hero-tall.webp');
  await sharp(src)
    .extract({ left: 0, top: 0, width: meta.width, height: meta.height - trim })
    .resize({ width: wide ? 1600 : 900 })
    .webp({ quality: 82, effort: 5 })
    .toFile(out);
  await unlink(src);
  console.log(`${file} -> ${path.basename(out)} (${meta.width}x${meta.height - trim})`);
}
