// Turns full-size photos into web-ready copies for the site.
//
//   1. Put originals in  raw/<project-slug>/   (any .jpg / .jpeg / .png)
//   2. Run               npm run images
//
// For every photo it writes
//   public/work/<slug>/<name>.jpg        2000px on the long side
//   public/work/<slug>/thumb/<name>.jpg  640px, used on the desk and in grids
// and refreshes src/content/images.json, which the site reads.
// Photos already converted are skipped, so it is safe to run again and again.
// The raw/ folder is never uploaded to GitHub.

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const RAW = path.join(ROOT, 'raw');
const OUT = path.join(ROOT, 'public', 'work');
const MANIFEST = path.join(ROOT, 'src', 'content', 'images.json');
const IMG = /\.(jpe?g|png)$/i;

const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {};
const slugs = fs.existsSync(RAW) ? fs.readdirSync(RAW).filter((d) => fs.statSync(path.join(RAW, d)).isDirectory()) : [];

for (const slug of slugs) {
  const src = path.join(RAW, slug);
  const dst = path.join(OUT, slug);
  fs.mkdirSync(path.join(dst, 'thumb'), { recursive: true });
  const known = new Map((manifest[slug] || []).map((i) => [i.file, i]));

  for (const f of fs.readdirSync(src).filter((n) => IMG.test(n)).sort()) {
    const name = path.parse(f).name.toLowerCase() + '.jpg';
    const full = path.join(dst, name);
    const thumb = path.join(dst, 'thumb', name);
    if (!fs.existsSync(full) || !fs.existsSync(thumb)) {
      const input = sharp(path.join(src, f), { limitInputPixels: false }).rotate();
      await input.clone().resize(2000, 2000, { fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 80, progressive: true, mozjpeg: true }).toFile(full);
      await input.clone().resize(640, 640, { fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 76, progressive: true, mozjpeg: true }).toFile(thumb);
      console.log('added', `${slug}/${name}`);
    }
    if (!known.has(name)) {
      const { width, height } = await sharp(full).metadata();
      known.set(name, { file: name, w: width, h: height });
    }
  }
  manifest[slug] = [...known.values()].sort((a, b) => a.file.localeCompare(b.file));
}

fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log('images.json updated:', Object.entries(manifest).map(([k, v]) => `${k} (${v.length})`).join(', '));
