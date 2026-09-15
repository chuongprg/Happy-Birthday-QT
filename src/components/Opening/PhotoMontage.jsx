import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SkipForward } from 'lucide-react';
import { introPhotos } from '../../data/introPhotos.js';

// Alternating zoom-in/zoom-out with a different pan direction each time, so
// consecutive photos never drift the same way — the classic Ken Burns look.
const ZOOMS = [
  [1, 1.15],
  [1.15, 1],
];
const PANS = [
  { x: [0, -4], y: [0, -3] },
  { x: [0, 4], y: [0, 3] },
  { x: [0, -3], y: [0, 4] },
  { x: [0, 3], y: [0, -4] },
];
// A static gradient tint stands in for a real photo backdrop — a live
// blurred copy of every photo looked nicer but blurring a full-screen image
// every frame while it's also being scaled is one of the heaviest things a
// phone GPU can be asked to do continuously, and it was the main source of
// the stutter here. This costs nothing (one paint, no filter).
const TINTS = ['from-wine/70 via-pink/40 to-mint/40', 'from-pink/70 via-mint/40 to-wine/40'];

// Warms the browser's decode cache for the next couple of photos a beat
// before they're shown, so the crossfade never stalls on a fresh
// multi-megapixel decode — the other main source of stutter in a phone-photo
// montage like this.
function usePreload(urls) {
  const key = urls.join(',');
  useEffect(() => {
    urls.forEach((url) => {
      if (!url) return;
      const img = new Image();
      img.decoding = 'async';
      img.src = url;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}

export default function PhotoMontage({ slideMs = 2000, onDone }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const isLast = index >= introPhotos.length - 1;
    const t = setTimeout(() => (isLast ? onDone() : setIndex((i) => i + 1)), slideMs);
    return () => clearTimeout(t);
  }, [index, slideMs, onDone]);

  usePreload([introPhotos[index + 1]?.image, introPhotos[index + 2]?.image]);

  const photo = introPhotos[index];
  const [s0, s1] = ZOOMS[index % ZOOMS.length];
  const pan = PANS[index % PANS.length];
  const kenBurnsDuration = (slideMs + 900) / 1000;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[85] overflow-hidden bg-ink"
    >
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className={`absolute inset-0 bg-gradient-to-br ${TINTS[index % TINTS.length]}`}
        >
          <img
            src={photo.image}
            alt=""
            decoding="async"
            className="h-full w-full animate-ken-burns object-contain"
            style={{
              willChange: 'transform',
              animationDuration: `${kenBurnsDuration}s`,
              '--kb-s0': `${s0}`,
              '--kb-s1': `${s1}`,
              '--kb-x0': `${pan.x[0]}%`,
              '--kb-x1': `${pan.x[1]}%`,
              '--kb-y0': `${pan.y[0]}%`,
              '--kb-y1': `${pan.y[1]}%`,
            }}
            onError={(e) => {
              e.currentTarget.style.opacity = 0;
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* cinema letterbox bars, wiping in like a shutter opening */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5 }}
        style={{ transformOrigin: 'top' }}
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[4%] bg-ink"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5 }}
        style={{ transformOrigin: 'bottom' }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[4%] bg-ink"
      />

      {/* subtle film flicker + vignette so the skip button stays legible over any photo */}
      <div className="pointer-events-none absolute inset-0 z-[1] animate-film-flicker bg-gradient-to-t from-ink/50 via-transparent to-ink/25" />

      <button
        type="button"
        onClick={onDone}
        className="absolute bottom-[7%] right-6 z-10 flex items-center gap-1.5 rounded-full border-2 border-cream/40 bg-ink/40 px-4 py-2 font-body text-xs font-bold text-cream/80 backdrop-blur-sm"
      >
        Bỏ qua
        <SkipForward size={13} />
      </button>
    </motion.section>
  );
}
