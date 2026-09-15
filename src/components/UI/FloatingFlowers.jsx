import { flowerPack } from '../../data/flowerPack.js';

// A handful of real flower photos drifting/bobbing gently in the
// background — same drift+floaty keyframes FloatingStickers uses, just
// scoped to whatever positioned ancestor renders this (e.g. the loading
// screen) rather than the whole app.
const LAYOUT = [
  { top: '12%', left: '10%', size: 46, dur: 7.2, delay: 0, r: -8, r2: 10, dx: 14, driftDur: 12 },
  { top: '20%', left: '80%', size: 36, dur: 8.1, delay: 0.6, r: 10, r2: -8, dx: -16, driftDur: 14 },
  { top: '70%', left: '9%', size: 42, dur: 6.6, delay: 1.2, r: -10, r2: 8, dx: 12, driftDur: 11 },
  { top: '76%', left: '84%', size: 50, dur: 7.8, delay: 0.3, r: 8, r2: -10, dx: -14, driftDur: 13 },
  { top: '40%', left: '4%', size: 32, dur: 6.9, delay: 0.9, r: -6, r2: 8, dx: 10, driftDur: 10 },
  { top: '48%', left: '92%', size: 38, dur: 7.4, delay: 1.5, r: 8, r2: -6, dx: -12, driftDur: 12 },
];

export default function FloatingFlowers({ className = '' }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {LAYOUT.map((item, i) => (
        <div
          key={i}
          className="absolute animate-drift opacity-60"
          style={{
            top: item.top,
            left: item.left,
            animationDuration: `${item.driftDur}s`,
            animationDelay: `${item.delay}s`,
          }}
        >
          <img
            src={flowerPack[i % flowerPack.length]}
            alt=""
            className="block animate-floaty object-contain drop-shadow-[0_2px_4px_rgba(122,35,70,0.15)]"
            style={{
              width: item.size,
              height: item.size,
              animationDuration: `${item.dur}s`,
              animationDelay: `${item.delay}s`,
              '--r': `${item.r}deg`,
              '--r2': `${item.r2}deg`,
              '--dx': `${item.dx}px`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
