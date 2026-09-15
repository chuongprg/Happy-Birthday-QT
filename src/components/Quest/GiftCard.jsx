import { motion } from 'framer-motion';
import { Lock, Check } from 'lucide-react';

const BG_COLORS = ['bg-pink', 'bg-mint', 'bg-green'];

export default function GiftCard({ gift, index, state, onOpen }) {
  const isCompleted = state === 'completed';
  const isActive = state === 'active';
  const bg = isCompleted ? 'bg-green' : isActive ? BG_COLORS[index % BG_COLORS.length] : 'bg-ink/5';

  return (
    <motion.button
      type="button"
      disabled={!isActive}
      onClick={() => isActive && onOpen(index)}
      whileHover={isActive ? { y: -6, rotate: -2, scale: 1.03 } : {}}
      whileTap={isActive ? { scale: 0.94, y: 2 } : {}}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: index * 0.06 }}
      className={`relative flex min-h-[110px] flex-col items-center justify-center gap-2 rounded-2xl border-[3px] px-3 py-5 text-center ${bg} ${
        isActive || isCompleted ? 'border-ink shadow-sticker-sm' : 'border-ink/15'
      }`}
    >
      <span className="text-3xl leading-none">
        {isCompleted ? '🎀' : isActive ? gift.emoji : <Lock size={22} className="text-ink/30" />}
      </span>

      <span
        className={`font-body text-[11px] font-bold tracking-wide ${
          isActive || isCompleted ? 'text-ink' : 'text-ink/30'
        }`}
      >
        {gift.title}
      </span>

      {isCompleted && (
        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-ink bg-wine text-cream">
          <Check size={13} strokeWidth={3} />
        </span>
      )}
    </motion.button>
  );
}
