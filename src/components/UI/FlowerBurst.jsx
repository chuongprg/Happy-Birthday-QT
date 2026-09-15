import { useMemo } from 'react';
import { flowerPack } from '../../data/flowerPack.js';

const DEFAULT_COUNT = 200; // photos are reused/duplicated as needed to reach this

// A one-shot bloom of real flower photos radiating outward from screen
// center, growing steadily larger and spinning slowly as they go so the
// spread floods the whole viewport by the end. Runs 3-5s total. Mount fresh
// (change `key` on the parent) to replay it; unmount once `durationMs` has
// elapsed.
//
// Driven by the `animate-bloom` CSS keyframes (tailwind.config.js) rather
// than Framer Motion: at 100-200 concurrent instances, a JS-driven tween
// recomputing every element's transform on every frame gets janky fast —
// a plain CSS animation runs on the compositor instead, so the main thread
// is barely touched once these are mounted.
export default function FlowerBurst({ count = DEFAULT_COUNT }) {
  const petals = useMemo(() => {
    // Shuffle which photo lands in which screen slot, so repeats don't
    // always sit in the same relative order around the circle.
    const order = Array.from({ length: count }, (_, i) => flowerPack[i % flowerPack.length]);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    return order.map((src, i) => {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.35;
      // dx is in vw and dy in vh, so a 45°-ish flower only gets dist*0.7 of
      // this in each axis — needs to run past ~71 to actually reach the
      // screen corners (50vw, 50vh) rather than stopping short of them.
      const dist = 18 + Math.random() * 70;
      const spinDir = Math.random() < 0.5 ? -1 : 1;
      return {
        id: i,
        src,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        rotate: spinDir * (200 + Math.random() * 160), // slow, mostly one-directional spin as it grows
        // In vmin (the shorter screen dimension) rather than a fixed px
        // count, so the bouquet stays proportional on a narrow phone screen
        // instead of a few images looming huge relative to the viewport.
        size: 10 + Math.random() * 14,
        delay: Math.random() * 0.4,
        duration: 3 + Math.random() * 1.6, // 3-4.6s + up to 0.4s delay = 3-5s total
      };
    });
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <img
          key={p.id}
          src={p.src}
          alt=""
          decoding="async"
          className="absolute animate-bloom object-contain"
          style={{
            left: '50%',
            top: '50%',
            width: `${p.size}vmin`,
            height: `${p.size}vmin`,
            '--dx': `${p.dx}vw`,
            '--dy': `${p.dy}vh`,
            '--rot': `${p.rotate}deg`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
}
