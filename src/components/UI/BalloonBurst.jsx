import { useMemo } from 'react';
import { BalloonSticker } from './stickers.jsx';

// Hue-rotate offsets so the one hand-drawn balloon sticker still reads as a
// mixed bunch of colors instead of a wall of identical pink balloons.
const HUES = [0, 45, 130, 200, 280, 320];
const COUNT = 14;

// Balloons rising from below the viewport up past the top, gently swaying.
// Pure CSS (like FlowerBurst) so this many concurrent instances stay cheap.
export default function BalloonBurst({ count = COUNT }) {
  const balloons = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: 4 + Math.random() * 92,
        size: 34 + Math.random() * 30,
        hue: HUES[i % HUES.length],
        delay: Math.random() * 2.5,
        duration: 6 + Math.random() * 3,
        sway: 14 + Math.random() * 18,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {balloons.map((b) => (
        <span
          key={b.id}
          className="absolute bottom-0 animate-balloon-rise"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size * 1.25,
            filter: `hue-rotate(${b.hue}deg)`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            '--sway': `${b.sway}px`,
          }}
        >
          <BalloonSticker className="h-full w-full drop-shadow-[0_4px_6px_rgba(26,26,26,0.25)]" />
        </span>
      ))}
    </div>
  );
}
