// Splits a grid-layout sticker sheet (photo stickers on a flat-color
// background) into individual transparent PNGs — one per cell — via
// chroma-keying the background color, then extracting each cell with a
// small inward margin to avoid bleed from neighboring stickers.
//
// Usage: node scripts/crop-sticker-sheet.cjs <source.jpg> [cols] [rows]
// Output: public/images/stickers/sticker-01.png, sticker-02.png, ...
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = process.argv[2];
const COLS = Number(process.argv[3] || 4);
const ROWS = Number(process.argv[4] || 4);
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'stickers');

// Background color to key out — sampled from the sheet's corner pixel.
const BG = { r: 254, g: 245, b: 228 };
const T1 = 22; // color distance below which a pixel is fully transparent
const T2 = 68; // color distance above which a pixel is fully opaque
const MARGIN = 24; // px shaved off any side that borders another cell

// Per-cell fine-tuning (1-indexed, row-major) for stickers whose art bleeds
// past the base margin — extra px to shave off one side (negative extends
// back outward). Adjust after a visual check of scripts' output.
const OVERRIDES = {};

if (!SRC) {
  console.error('Usage: node scripts/crop-sticker-sheet.cjs <source.jpg> [cols] [rows]');
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

function dist(r, g, b) {
  const dr = r - BG.r;
  const dg = g - BG.g;
  const db = b - BG.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

async function main() {
  const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0, p = 0; i < width * height; i++, p += channels) {
    const r = data[p];
    const g = data[p + 1];
    const b = data[p + 2];
    const d = dist(r, g, b);
    let alpha;
    if (d <= T1) alpha = 0;
    else if (d >= T2) alpha = 255;
    else alpha = Math.round(((d - T1) / (T2 - T1)) * 255);
    const o = i * 4;
    rgba[o] = r;
    rgba[o + 1] = g;
    rgba[o + 2] = b;
    rgba[o + 3] = alpha;
  }

  const colBounds = Array.from({ length: COLS + 1 }, (_, i) => Math.round((i * width) / COLS));
  const rowBounds = Array.from({ length: ROWS + 1 }, (_, i) => Math.round((i * height) / ROWS));

  let n = 1;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const o = OVERRIDES[n] || {};
      const mLeft = (col === 0 ? 0 : MARGIN) + (o.left || 0);
      const mRight = (col === COLS - 1 ? 0 : MARGIN) + (o.right || 0);
      const mTop = (row === 0 ? 0 : MARGIN) + (o.top || 0);
      const mBottom = (row === ROWS - 1 ? 0 : MARGIN) + (o.bottom || 0);

      const left = colBounds[col] + mLeft;
      const top = rowBounds[row] + mTop;
      const w = colBounds[col + 1] - colBounds[col] - mLeft - mRight;
      const h = rowBounds[row + 1] - rowBounds[row] - mTop - mBottom;

      const outPath = path.join(OUT_DIR, `sticker-${String(n).padStart(2, '0')}.png`);
      await sharp(rgba, { raw: { width, height, channels: 4 } })
        .extract({ left, top, width: w, height: h })
        .png()
        .toFile(outPath);
      console.log('wrote', outPath);
      n++;
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
