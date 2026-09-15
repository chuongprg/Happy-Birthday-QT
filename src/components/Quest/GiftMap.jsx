import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import GiftCard from './GiftCard.jsx';
import GlowBackground from '../UI/GlowBackground.jsx';
import { gifts } from '../../data/gifts.js';

export default function GiftMap({ currentGiftIndex, completedGifts, onOpenGift, onExit }) {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-cream px-6 py-28">
      <GlowBackground variant="pastel" />

      <motion.button
        type="button"
        onClick={onExit}
        whileHover={{ scale: 1.05, x: -2 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Về trang chủ"
        className="fixed left-5 top-5 z-40 flex items-center gap-1.5 rounded-full border-[3px] border-ink bg-cream px-3.5 py-2 shadow-sticker-sm"
      >
        <Home size={16} strokeWidth={2.5} />
        <span className="font-body text-xs font-bold tracking-wide">Trang chủ</span>
      </motion.button>

      <div className="relative z-10 mb-10 flex flex-col items-center gap-3 text-center">
        <span className="rounded-full border-[3px] border-ink bg-pink px-4 py-1.5 font-body text-xs font-bold tracking-wide text-wine shadow-sticker-sm">
          🎁 BỘ SƯU TẬP QUÀ
        </span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-display text-3xl font-bold text-ink sm:text-4xl"
        >
          Mở hết nào! ✨
        </motion.h2>
      </div>

      <div className="relative z-10 grid w-full max-w-md grid-cols-3 gap-4 sm:max-w-lg">
        {gifts.map((gift, i) => {
          const state = completedGifts[i]
            ? 'completed'
            : i === currentGiftIndex
            ? 'active'
            : 'locked';
          return (
            <GiftCard key={gift.id} gift={gift} index={i} state={state} onOpen={onOpenGift} />
          );
        })}
      </div>
    </section>
  );
}
