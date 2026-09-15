// Prepares flower photos for FlowerBurst: keys out a flat background color
// (sampled from each image's own corner pixel, so it works for white, black,
// or any other solid backdrop), trims to visible pixels, downsizes, and
// writes a compact numbered PNG set at public/images/flowers/flower-NN.png.
//
// Two kinds of source are supported:
//   TRANSPARENT_SOURCES — already carry real alpha. Just trimmed + resized +
//     compressed as-is.
//   KEYED_BG_SOURCES — flat solid-background photos (white studio backdrop,
//     black app export background, etc). Background color is sampled from
//     the image's own corner pixel, then keyed out with a soft-edged
//     distance threshold.
//
// Usage: node scripts/prepare-flowers.cjs
// Add new filenames to the arrays below (drop the files into
// public/images/flowers/ first), continuing the flower-NN numbering.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'public', 'images', 'flowers');
const MAX_DIMENSION = 480;
const T1 = 18; // color distance below which a pixel is fully transparent
const T2 = 60; // color distance above which a pixel is fully opaque

const TRANSPARENT_SOURCES = [];

// One representative filename per duplicate group (several files in the
// folder were byte-identical copies under different names).
const KEYED_BG_SOURCES = [
  '0901(1).png',
  '0901(10).png',
  '0901(12).png',
  '0901(13).png',
  '0901(14).png',
  '0901(17).png',
  '0901(18).png',
  '0901(21).png',
  '0901(22).png',
  '0901(23).png',
  '0901(24).png',
  '0901(25).png',
  '0901(26).png',
  '0901(27).png',
  '0901(28).png',
  '0901(3).png',
  '0901(7).png',
];

function dist(r, g, b, bg) {
  const dr = r - bg.r;
  const dg = g - bg.g;
  const db = b - bg.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

// Keys out the background sampled from the top-left corner pixel, returning
// a sharp instance over the resulting RGBA buffer.
async function keyOutBackground(srcPath) {
  const { data, info } = await sharp(srcPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const bg = { r: data[0], g: data[1], b: data[2] };

  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0, p = 0; i < width * height; i++, p += 4) {
    const r = data[p];
    const g = data[p + 1];
    const b = data[p + 2];
    const d = dist(r, g, b, bg);
    let alpha;
    if (d <= T1) alpha = 0;
    else if (d >= T2) alpha = 255;
    else alpha = Math.round(((d - T1) / (T2 - T1)) * 255);
    rgba[p] = r;
    rgba[p + 1] = g;
    rgba[p + 2] = b;
    rgba[p + 3] = alpha;
  }
  return sharp(rgba, { raw: { width, height, channels: 4 } });
}

async function writeFlower(image, n) {
  const outPath = path.join(DIR, `flower-${String(n).padStart(2, '0')}.png`);
  await image
    .trim()
    .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true })
    .png({ palette: true, quality: 85, effort: 8 })
    .toFile(outPath);
  console.log('wrote', outPath);
}

async function main() {
  // Clear out any previous numbered set so stale flower-NN.png files don't
  // linger if this run produces fewer images than the last one.
  for (const name of fs.readdirSync(DIR)) {
    if (/^flower-\d+\.png$/.test(name)) fs.unlinkSync(path.join(DIR, name));
  }

  let n = 1;
  const used = [];

  for (const name of TRANSPARENT_SOURCES) {
    const srcPath = path.join(DIR, name);
    if (!fs.existsSync(srcPath)) {
      console.warn('skip (missing):', name);
      continue;
    }
    await writeFlower(sharp(srcPath), n);
    used.push(name);
    n++;
  }

  for (const name of KEYED_BG_SOURCES) {
    const srcPath = path.join(DIR, name);
    if (!fs.existsSync(srcPath)) {
      console.warn('skip (missing):', name);
      continue;
    }
    await writeFlower(await keyOutBackground(srcPath), n);
    used.push(name);
    n++;
  }

  // Clean up the raw stock photos now that the numbered set above replaces them.
  for (const name of fs.readdirSync(DIR)) {
    if (/^flower-\d+\.png$/.test(name)) continue;
    fs.unlinkSync(path.join(DIR, name));
    console.log('removed source', name);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
