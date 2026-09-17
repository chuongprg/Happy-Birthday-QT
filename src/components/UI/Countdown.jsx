import { useEffect, useState } from 'react';

const UNITS = [
  ['Giờ', 3600000],
  ['Phút', 60000],
  ['Giây', 1000],
];

// A generic HH:MM:SS countdown to a fixed timestamp — used for the dinner
// meetup time (DinnerCountdown.jsx) and the Gift Quest's unlock time
// (QuestIntro.jsx).
export default function Countdown({ targetMs, label = 'ĐẾM NGƯỢC', arrivedLabel = 'ĐẾN GIỜ RỒI 🎉' }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = targetMs - now;
  const arrived = remaining <= 0;

  const units =
    remaining >= 86400000
      ? [
          ['Ngày', 86400000],
          ['Giờ', 3600000],
          ['Phút', 60000],
          ['Giây', 1000],
        ]
      : [
          ['Giờ', 3600000],
          ['Phút', 60000],
          ['Giây', 1000],
        ];

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-body text-[11px] font-bold tracking-wide text-wine/60">
        {arrived ? arrivedLabel : label}
      </span>
      {!arrived && (
        <div className="flex items-center gap-2">
          {units.map(([unitLabel, unitMs], i) => {
            const value =
              i === 0 ? Math.floor(remaining / unitMs) : Math.floor((remaining % units[i - 1][1]) / unitMs);
            return (
              <div
                key={unitLabel}
                className="flex flex-col items-center rounded-2xl border-[3px] border-ink bg-cream px-3 py-2 shadow-sticker-sm"
              >
                <span className="font-display text-xl font-extrabold text-wine sm:text-2xl">
                  {String(value).padStart(2, '0')}
                </span>
                <span className="font-body text-[9px] font-bold text-ink/50">{unitLabel}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
