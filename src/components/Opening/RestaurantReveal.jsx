import { motion } from 'framer-motion';
import { Clock, MapPin, ExternalLink, ChevronDown } from 'lucide-react';
import { birthdayConfig } from '../../data/config.js';
import { dinnerPhotos } from '../../data/dinnerPhotos.js';
import DinnerCountdown from './DinnerCountdown.jsx';

// The dinner-plan-changed reveal — shown instead of the full cinematic on
// dinner day (see src/utils/birthdayGate.js). Everything else about the
// story stays locked until the real birthday.
export default function RestaurantReveal() {
  const { restaurantName, time, date, address, mapUrl } = birthdayConfig.dinnerReveal;

  const scrollToTransport = () =>
    document.getElementById('section-dinner-transport')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="mx-6 flex max-w-sm flex-col items-center overflow-hidden rounded-3xl border-[3px] border-ink bg-cream text-center shadow-sticker"
      >
        {dinnerPhotos.length > 0 && (
          <div className="flex w-full snap-x snap-mandatory gap-0 overflow-x-auto">
            {dinnerPhotos.map((src) => (
              <img
                key={src}
                src={src}
                alt={restaurantName}
                loading="lazy"
                className="h-44 w-full flex-shrink-0 snap-center object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ))}
          </div>
        )}

        <div className="flex flex-col items-center gap-4 px-7 py-8">
          <span className="rounded-full border-[3px] border-ink bg-pink px-5 py-2 font-body text-xs font-bold tracking-wide text-wine shadow-sticker-sm">
            LỊCH ĐỔI MỘT CHÚT 💌
          </span>

          <p className="font-display text-lg font-bold text-ink">Tối nay mình đi ăn nhé!</p>

          <div className="flex flex-col items-center gap-1.5">
            <span className="font-display text-2xl font-extrabold text-wine">{restaurantName}</span>
            <span className="flex items-center gap-1.5 font-body text-sm font-bold text-ink/70">
              <Clock size={15} />
              {time} · {date}
            </span>
            <span className="mt-1 flex items-start gap-1.5 px-4 font-body text-sm font-medium text-ink/60">
              <MapPin size={15} className="mt-0.5 flex-shrink-0" />
              {address}
            </span>
          </div>

          <DinnerCountdown />

          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex min-h-[52px] items-center gap-2 rounded-full border-[3px] border-ink bg-wine px-7 font-display text-base font-bold text-cream shadow-sticker"
          >
            Chỉ đường trên Google Maps
            <ExternalLink size={16} />
          </a>

          <p className="whitespace-preline mt-3 max-w-xs font-display text-sm italic text-wine/50">
            Còn nhiều điều bất ngờ khác nữa,{'\n'}hẹn gặp lại Quế Trân vào 18.09 nhé ạ 🎂
          </p>
        </div>
      </motion.div>

      <motion.button
        type="button"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        whileHover={{ scale: 1.05, rotate: -1 }}
        whileTap={{ scale: 0.94, y: 4 }}
        onClick={scrollToTransport}
        className="flex min-h-[52px] items-center gap-2 rounded-full border-[3px] border-ink bg-mint px-7 font-display text-base font-bold text-ink shadow-sticker"
      >
        Xem thêm thông tin di chuyển
        <ChevronDown size={18} />
      </motion.button>
    </div>
  );
}
