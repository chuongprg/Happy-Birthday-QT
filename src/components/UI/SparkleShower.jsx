import { useMemo } from 'react';

const COLORS = ['#FFD966', '#F8C8DC', '#8DDDD0', '#F2A0C4', '#FFFFFF'];
const COUNT = 36;

// A field of rapid electric-white twinkles ("pháo điện") layered under the
// slower Fireworks bursts — pure CSS so this many concurrent instances don't
// cost a JS frame each (same reasoning as FlowerBurst).
export default function SparkleShower({ count = COUNT }) {
  const sparks = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 5,
        color: COLORS[i % COLORS.length],
        delay: Math.random() * 2,
        duration: 0.6 + Math.random() * 0.8,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {sparks.map((s) => (
        <span
          key={s.id}
          className="absolute animate-twinkle rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: `0 0 ${s.size * 1.5}px ${s.size / 2}px ${s.color}`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
