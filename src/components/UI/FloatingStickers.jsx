import { STICKERS } from './stickers.jsx';

// A layer of birthday-themed stroke stickers drifting gently across the
// whole viewport — mounted once at the app root so it's always present no
// matter which screen or scroll position the user is on. Purely decorative:
// pointer-events disabled, aria-hidden, and it respects
// prefers-reduced-motion via the global CSS rule that freezes all animation.
const LAYOUT = [
  { top: '8%', left: '9%', size: 30, dur: 6.5, delay: 0, r: -10, r2: 8, dx: 16, driftDur: 11 },
  { top: '16%', left: '84%', size: 26, dur: 7.2, delay: 0.8, r: 8, r2: -6, dx: -14, driftDur: 13 },
  { top: '32%', left: '4%', size: 22, dur: 5.8, delay: 1.4, r: -6, r2: 10, dx: 12, driftDur: 9 },
  { top: '42%', left: '92%', size: 28, dur: 6.8, delay: 0.4, r: 10, r2: -8, dx: -18, driftDur: 12 },
  { top: '58%', left: '12%', size: 24, dur: 7.6, delay: 1.1, r: -8, r2: 6, dx: 14, driftDur: 10 },
  { top: '68%', left: '88%', size: 30, dur: 6.1, delay: 0.6, r: 6, r2: -10, dx: -12, driftDur: 14 },
  { top: '82%', left: '6%', size: 26, dur: 6.9, delay: 1.8, r: -10, r2: 8, dx: 16, driftDur: 11 },
  { top: '88%', left: '80%', size: 22, dur: 5.5, delay: 0.2, r: 8, r2: -6, dx: -10, driftDur: 9 },
  { top: '4%', left: '46%', size: 20, dur: 7.4, delay: 1.6, r: -6, r2: 6, dx: 10, driftDur: 15 },
];

export default function FloatingStickers({ className = '' }) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {LAYOUT.map((item, i) => {
        const Sticker = STICKERS[i % STICKERS.length];
        return (
          <div
            key={i}
            className="absolute animate-drift opacity-70"
            style={{
              top: item.top,
              left: item.left,
              animationDuration: `${item.driftDur}s`,
              animationDelay: `${item.delay}s`,
            }}
          >
            <span
              className="block animate-floaty"
              style={{
                width: item.size,
                height: item.size,
                animationDuration: `${item.dur}s`,
                animationDelay: `${item.delay}s`,
                '--r': `${item.r}deg`,
                '--r2': `${item.r2}deg`,
                '--dx': `${item.dx}px`,
              }}
            >
              <Sticker className="h-full w-full drop-shadow-[0_2px_2px_rgba(26,26,26,0.08)]" />
            </span>
          </div>
        );
      })}
    </div>
  );
}
