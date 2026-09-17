import { useEffect, useState } from 'react';
import { birthdayConfig } from '../../data/config.js';

// birthdayConfig.day/monthIndex/year describe the birthday at local midnight.
function parseTarget() {
  return new Date(
    Number(birthdayConfig.year),
    birthdayConfig.monthIndex,
    Number(birthdayConfig.day),
    0,
    0,
    0
  ).getTime();
}
const TARGET_MS = parseTarget();

const UNITS = [
  ['Ngày', 86400000],
  ['Giờ', 3600000],
  ['Phút', 60000],
  ['Giây', 1000],
];

export default function BirthdayCountdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = TARGET_MS - now;
  // Once the birthday itself arrives the intro cinematic takes over anyway
  // (see getContentMode in utils/birthdayGate.js), so there's nothing to
  // count down to on Hero any more.
  if (remaining <= 0) return null;

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-body text-[11px] font-bold tracking-wide text-wine/60">
        ĐẾM NGƯỢC ĐẾN SINH NHẬT
      </span>
      <div className="flex items-center gap-2">
        {UNITS.map(([label, unitMs], i) => {
          const value =
            i === 0
              ? Math.floor(remaining / unitMs)
              : Math.floor((remaining % UNITS[i - 1][1]) / unitMs);
          return (
            <div
              key={label}
              className="flex flex-col items-center rounded-2xl border-[3px] border-ink bg-cream px-3 py-2 shadow-sticker-sm"
            >
              <span className="font-display text-xl font-extrabold text-wine sm:text-2xl">
                {String(value).padStart(2, '0')}
              </span>
              <span className="font-body text-[9px] font-bold text-ink/50">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
