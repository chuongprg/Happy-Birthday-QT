import { canvasToBudgetedDataUrl } from './compressImage.js';

// Downscales a captured photo before it's stored — keeps it small enough
// for sessionStorage AND for a Firestore document field (see
// compressImage.js; photos are stored inline in Firestore, not Storage).
export function resizeImageFile(file, maxDimension = 800, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Could not read image'));
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvasToBudgetedDataUrl(canvas, { quality }));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
