import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ConfettiBurst from '../UI/ConfettiBurst.jsx';
import PhotoSticker from '../UI/PhotoSticker.jsx';
import { stickerPack } from '../../data/stickerPack.js';

export default function UnlockAnimation({ gift, onContinue }) {
  useEffect(() => {
    const t = setTimeout(onContinue, 2600);
    return () => clearTimeout(t);
  }, [onContinue]);

  return (
    <div className="relative flex flex-col items-center gap-7 text-center">
      <ConfettiBurst />
      <PhotoSticker
        sticker={stickerPack.laugh}
        className="-right-2 top-0 sm:-right-16"
        size={82}
        rotate={-12}
        delay={0.9}
      />

      <motion.div
        initial={{ scale: 0.3, opacity: 0, rotate: -20 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="flex h-24 w-24 items-center justify-center rounded-full border-[4px] border-ink bg-green text-5xl shadow-sticker"
      >
        🎀
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="font-body text-xs font-bold tracking-wide text-mint-deep"
      >
        MÃ CHÍNH XÁC RỒI! ✓
      </motion.p>

      <motion.h3
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="font-display text-3xl font-bold text-ink"
      >
        {gift.title}
        <br />
        <span className="text-wine">ĐÃ MỞ KHOÁ! 🎉</span>
      </motion.h3>

      {gift.unlockMessage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="whitespace-preline max-w-xs font-body text-sm font-semibold leading-relaxed text-ink/60"
        >
          {gift.unlockMessage}
        </motion.p>
      )}

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        onClick={onContinue}
        className="font-body text-[11px] font-bold tracking-wide text-ink/30"
      >
        CHẠM ĐỂ TIẾP TỤC
      </motion.button>
    </div>
  );
}
