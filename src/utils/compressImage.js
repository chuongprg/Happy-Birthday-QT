// Compresses a canvas down to a JPEG data URL that fits a byte budget —
// used to keep captured photos small enough to store directly as a
// Firestore field (1 MiB per document, base64 text included) instead of
// Firebase Storage, which needs the paid Blaze plan just to create a
// bucket at all. Retries at lower quality until it fits, or gives up at
// `minQuality` rather than looping forever on a huge, busy image.
export function canvasToBudgetedDataUrl(canvas, { quality = 0.75, maxBytes = 700 * 1024, minQuality = 0.35 } = {}) {
  let q = quality;
  let dataUrl = canvas.toDataURL('image/jpeg', q);
  while (dataUrl.length > maxBytes && q > minQuality) {
    q = Math.max(minQuality, q - 0.1);
    dataUrl = canvas.toDataURL('image/jpeg', q);
  }
  return dataUrl;
}
