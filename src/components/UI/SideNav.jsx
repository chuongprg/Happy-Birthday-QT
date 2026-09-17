import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { CakeSticker, FlowerSticker, BalloonSticker, GiftSticker } from './stickers.jsx';

const ITEMS = [
  { id: 'section-home', label: 'Trang chủ', Icon: CakeSticker },
  { id: 'section-memories', label: 'Kỷ niệm', Icon: FlowerSticker },
  { id: 'section-today', label: 'Lịch trình', Icon: BalloonSticker },
  { id: 'section-quest', label: 'Quà', Icon: GiftSticker },
];

// A vertical sticker-style dock docked to the right edge, letting the user
// jump straight to any part of the story instead of only scrolling. Every
// chapter past the opening stays locked until `unlocked` is true (i.e. the
// invitation has been opened) — the story has to be entered, not skipped.
export default function SideNav({ unlocked = true }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const targets = ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = ITEMS.findIndex((item) => item.id === entry.target.id);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { threshold: 0.4 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav className="fixed right-2 top-1/2 z-40 flex -translate-y-1/2 flex-col items-end gap-2 sm:right-4">
      {ITEMS.map((item, i) => {
        const isActive = i === active;
        const isLocked = i > 0 && !unlocked;

        return (
          <motion.button
            key={item.id}
            type="button"
            disabled={isLocked}
            onClick={() => !isLocked && goTo(item.id)}
            whileHover={isLocked ? {} : { scale: 1.06 }}
            whileTap={isLocked ? {} : { scale: 0.92 }}
            className="group flex items-center gap-2"
            aria-label={isLocked ? `${item.label} (chưa mở khoá)` : item.label}
          >
            <span
              className={`hidden whitespace-nowrap rounded-full border-[2.5px] border-ink px-3 py-1 font-body text-[11px] font-bold tracking-wide shadow-sticker-sm transition-all duration-200 sm:block ${
                isActive
                  ? 'translate-x-0 bg-pink text-wine opacity-100'
                  : 'pointer-events-none translate-x-2 bg-cream text-ink/50 opacity-0 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100'
              }`}
            >
              {item.label}
            </span>
            <span
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-[2.5px] border-ink shadow-sticker-sm transition-colors sm:h-11 sm:w-11 ${
                isLocked ? 'bg-ink/10 opacity-50' : isActive ? 'bg-pink' : 'bg-cream'
              }`}
            >
              {isLocked ? <Lock className="h-4 w-4" /> : <item.Icon className="h-6 w-6" />}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
}
