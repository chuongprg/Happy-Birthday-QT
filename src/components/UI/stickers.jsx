// A small set of hand-drawn, stroke-outlined birthday stickers (cake, gift,
// flower, balloon, party hat, heart, star, sparkle, bow) used as floating
// decoration across the site. Flat color fills + a consistent thick black
// stroke so they read as a cohesive sticker sheet rather than mismatched
// clip-art or emoji.

const STROKE = '#1A1A1A';
const SW = 3.2;

export function CakeSticker({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path d="M22 8 L22 15" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
      <path
        d="M22 6c-1.8 0-1.8 3 0 3s1.8-3 0-3z"
        fill="#F2A0C4"
        stroke={STROKE}
        strokeWidth={2.4}
      />
      <path
        d="M9 21c2-3 5-3 7 0s5 3 7 0 5-3 7 0 5 3 7 0v9a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3z"
        fill="#8DDDD0"
        stroke={STROKE}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <rect x="8" y="29" width="32" height="11" rx="3" fill="#F8C8DC" stroke={STROKE} strokeWidth={SW} />
      <path d="M8 34.5h32" stroke={STROKE} strokeWidth={2} strokeDasharray="0.2 5" strokeLinecap="round" />
    </svg>
  );
}

export function GiftSticker({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="8" y="20" width="32" height="20" rx="3" fill="#8DDDD0" stroke={STROKE} strokeWidth={SW} />
      <rect x="8" y="20" width="32" height="8" rx="2" fill="#F8C8DC" stroke={STROKE} strokeWidth={SW} />
      <path d="M24 20v20" stroke={STROKE} strokeWidth={SW} />
      <path
        d="M24 20c-4-6-13-6-13 0 6 2 10-0 13 0zM24 20c4-6 13-6 13 0-6 2-10-0-13 0z"
        fill="#C8E6C9"
        stroke={STROKE}
        strokeWidth={2.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FlowerSticker({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path d="M24 30v10" stroke="#9FD3A2" strokeWidth={SW} strokeLinecap="round" />
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="24"
          cy="15"
          rx="6.4"
          ry="9"
          fill="#F8C8DC"
          stroke={STROKE}
          strokeWidth={2.4}
          transform={`rotate(${deg} 24 22)`}
        />
      ))}
      <circle cx="24" cy="22" r="5.5" fill="#FFD966" stroke={STROKE} strokeWidth={2.6} />
    </svg>
  );
}

export function BalloonSticker({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path d="M24 30c1.5 2 1.5 4-1 5.5" stroke={STROKE} strokeWidth={2} strokeLinecap="round" fill="none" />
      <path d="M23 35.5c-2 2-1 5 1 5" stroke={STROKE} strokeWidth={2} strokeLinecap="round" fill="none" />
      <path d="M22 29h4l-1.3 4h-1.4z" fill="#F2A0C4" stroke={STROKE} strokeWidth={2.4} strokeLinejoin="round" />
      <ellipse cx="24" cy="17" rx="12" ry="14" fill="#F8C8DC" stroke={STROKE} strokeWidth={SW} />
      <path d="M18 11c1.5-2.5 4-3 6-2" stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" fill="none" opacity="0.7" />
    </svg>
  );
}

export function PartyHatSticker({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path
        d="M24 8 L37 38 H11 Z"
        fill="#8DDDD0"
        stroke={STROKE}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="2" fill="#F8C8DC" stroke={STROKE} strokeWidth={1.6} />
      <circle cx="27" cy="26" r="2" fill="#F8C8DC" stroke={STROKE} strokeWidth={1.6} />
      <circle cx="22" cy="31" r="2" fill="#F2A0C4" stroke={STROKE} strokeWidth={1.6} />
      <circle cx="24" cy="7" r="3.4" fill="#F2A0C4" stroke={STROKE} strokeWidth={2.6} />
    </svg>
  );
}

export function HeartSticker({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path
        d="M24 38S8 28 8 17.5C8 11 13 8 18 8c3 0 5.4 1.6 6 4 0.6-2.4 3-4 6-4 5 0 10 3 10 9.5C40 28 24 38 24 38z"
        fill="#F2A0C4"
        stroke={STROKE}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarSticker({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path
        d="M24 6l4.9 11.4L41 18.6l-8.8 8 2.5 12.4L24 33l-10.7 6 2.5-12.4-8.8-8 12.1-1.2z"
        fill="#FFD966"
        stroke={STROKE}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SparkleSticker({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path
        d="M22 6c0 8-2 10-10 10 8 0 10 2 10 10 0-8 2-10 10-10-8 0-10-2-10-10z"
        fill="#8DDDD0"
        stroke={STROKE}
        strokeWidth={2.6}
        strokeLinejoin="round"
      />
      <circle cx="37" cy="34" r="3" fill="#F8C8DC" stroke={STROKE} strokeWidth={2} />
    </svg>
  );
}

export function BowSticker({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <circle cx="24" cy="24" r="3.6" fill="#5C1935" stroke={STROKE} strokeWidth={2.4} />
      <path
        d="M24 24 6 14c-2 4-2 12 0 16z"
        fill="#F2A0C4"
        stroke={STROKE}
        strokeWidth={2.8}
        strokeLinejoin="round"
      />
      <path
        d="M24 24 42 14c2 4 2 12 0 16z"
        fill="#F8C8DC"
        stroke={STROKE}
        strokeWidth={2.8}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const STICKERS = [
  CakeSticker,
  GiftSticker,
  FlowerSticker,
  BalloonSticker,
  PartyHatSticker,
  HeartSticker,
  StarSticker,
  SparkleSticker,
  BowSticker,
];
