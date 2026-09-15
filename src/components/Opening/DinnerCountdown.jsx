import { useEffect, useState } from 'react';
import { birthdayConfig } from '../../data/config.js';

// dinnerReveal.date is 'DD.MM.YYYY' and .time is 'HH:MM' — parsed once at
// module load since the config is static for the life of the page.
function parseTarget() {
  const { date, time } = birthdayConfig.dinnerReveal;
  const [day, month, year] = date.split('.').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  return new Date(year, month - 1, day, hour, minute, 0).getTime();
}
const TARGET_MS = parseTarget();

const UNITS = [
  ['Giờ', 3600000],
  ['Phút', 60000],
  ['Giây', 1000],
];

export default function DinnerCountdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = TARGET_MS - now;
  const arrived = remaining <= 0;

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-body text-[11px] font-bold tracking-wide text-wine/60">
        {arrived ? 'ĐẾN GIỜ HẸN RỒI 🎉' : 'ĐẾM NGƯỢC ĐẾN GIỜ HẸN'}
      </span>
      {!arrived && (
        <div className="flex items-center gap-2">
          {UNITS.map(([label, unitMs], i) => {
            const value =
              i === 0
                ? Math.floor(remaining / unitMs)
                : Math.floor((remaining % (UNITS[i - 1][1])) / unitMs);
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
      )}
    </div>
  );
}
