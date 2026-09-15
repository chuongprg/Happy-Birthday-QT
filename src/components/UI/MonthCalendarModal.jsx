import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CakeSticker } from './stickers.jsx';
import CloseButton from './CloseButton.jsx';

const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

function buildMonthGrid(year, monthIndex) {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstWeekday = new Date(year, monthIndex, 1).getDay(); // 0 = Sun
  const leadingBlanks = (firstWeekday + 6) % 7; // shift so week starts Monday

  const cells = Array(leadingBlanks).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export default function MonthCalendarModal({ open, onClose, day, month, monthIndex, year }) {
  const cells = useMemo(() => buildMonthGrid(Number(year), monthIndex), [year, monthIndex]);
  const highlightDay = Number(day);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 px-6 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-3xl border-[3px] border-ink bg-cream p-5 shadow-sticker sm:p-6"
          >
            <CloseButton
              onClick={onClose}
              label="Đóng lịch"
              tone="wine"
              className="absolute -right-3 -top-3"
            />

            <div className="mb-4 rounded-2xl border-[3px] border-ink bg-mint py-2 text-center font-display text-lg font-bold text-ink shadow-sticker-sm">
              {month} · {year}
            </div>

            <div className="mb-2 grid grid-cols-7 gap-1">
              {WEEKDAYS.map((w) => (
                <span
                  key={w}
                  className="text-center font-body text-[11px] font-bold tracking-wide text-ink/40"
                >
                  {w}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {cells.map((d, i) => {
                if (d === null) return <span key={i} />;
                const isBirthday = d === highlightDay;

                return (
                  <motion.div
                    key={i}
                    initial={isBirthday ? { scale: 0, rotate: -15 } : false}
                    animate={isBirthday ? { scale: 1, rotate: -6 } : false}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                    className={`relative flex aspect-square items-center justify-center rounded-full font-body text-sm font-bold ${
                      isBirthday
                        ? 'z-10 border-[3px] border-ink bg-wine text-cream shadow-sticker-sm'
                        : 'text-ink/70'
                    }`}
                  >
                    {isBirthday && (
                      <motion.span
                        className="absolute inset-0 rounded-full border-2 border-wine"
                        animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                    {isBirthday && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <CakeSticker className="h-4 w-4" />
                      </span>
                    )}
                    {d}
                  </motion.div>
                );
              })}
            </div>

            <p className="mt-5 text-center font-body text-xs font-bold tracking-wide text-wine">
              Hôm nay là ngày đặc biệt của chị đó! Happy Birthday
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
