import { motion } from 'framer-motion';
import GlowBackground from '../UI/GlowBackground.jsx';
import ConfettiBurst from '../UI/ConfettiBurst.jsx';

export default function Celebrate({ onReveal }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-8 overflow-hidden bg-cream px-6 text-center"
    >
      <GlowBackground variant="wine" />
      <ConfettiBurst count={40} />

      <motion.span
        initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        className="text-7xl"
      >
        🥳
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="font-display text-4xl font-bold text-ink sm:text-5xl"
      >
        Em đã tìm ra
        <br />
        <span className="text-wine">TẤT CẢ rồi đó! 🌟</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="font-display text-xl font-bold text-ink/60"
      >
        Sẵn sàng cho điều bất ngờ cuối cùng chưa?
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        whileHover={{ scale: 1.05, rotate: -1 }}
        whileTap={{ scale: 0.94, y: 4 }}
        onClick={onReveal}
        className="mt-2 min-h-[56px] rounded-full border-[3px] border-ink bg-wine px-12 font-display text-base font-bold text-cream shadow-sticker"
      >
        XEM LUÔN 🎬
      </motion.button>
    </motion.section>
  );
}
