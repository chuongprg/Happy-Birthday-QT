import { motion } from 'framer-motion';
import GlowBackground from '../UI/GlowBackground.jsx';
import ConfettiBurst from '../UI/ConfettiBurst.jsx';

export default function MissionComplete({ giftCount, onContinue }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 overflow-hidden bg-cream px-6 text-center"
    >
      <GlowBackground variant="pastel" />
      <ConfettiBurst count={36} />

      <motion.span
        initial={{ opacity: 0, y: 14, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="rounded-full border-[3px] border-ink bg-green px-5 py-2 font-display text-lg font-bold text-ink shadow-sticker-sm"
      >
        {giftCount} / {giftCount} 🎀
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="flex flex-col gap-2"
      >
        <p className="font-body text-xs font-bold tracking-wide text-ink/50">
          TẤT CẢ QUÀ ĐÃ MỞ HẾT ✓
        </p>
        <h2 className="font-display text-4xl font-bold text-ink sm:text-5xl">
          HOÀN THÀNH
          <br />
          <span className="text-wine">GIFT QUEST! 🎊</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="flex flex-col items-center gap-4"
      >
        <p className="max-w-xs font-display text-xl font-bold text-ink/70">
          Nhưng vẫn còn một điều bất ngờ nữa đang chờ em... 👀
        </p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3, duration: 0.6 }}
          whileHover={{ scale: 1.05, rotate: -1 }}
          whileTap={{ scale: 0.94, y: 4 }}
          onClick={onContinue}
          className="mt-4 min-h-[56px] rounded-full border-[3px] border-ink bg-wine px-10 font-display text-base font-bold text-cream shadow-sticker"
        >
          XEM NGAY ✨
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
