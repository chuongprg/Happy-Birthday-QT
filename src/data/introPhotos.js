// Photos for the cinematic Ken Burns montage that plays right after the
// invitation is opened. Drop ~20 photos of Trân into public/images/intro/,
// named intro-01.jpg through intro-20.jpg (any of jpg/png/webp works, just
// keep the two-digit number in the filename matching this list). Add/remove
// entries here to change how many photos play — the montage adapts either way.
export const introPhotos = Array.from({ length: 20 }, (_, i) => ({
  image: `/images/intro/intro-${String(i + 1).padStart(2, '0')}.jpg`,
}));
