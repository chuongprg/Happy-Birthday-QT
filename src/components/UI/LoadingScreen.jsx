import { motion } from 'framer-motion';
import FloatingFlowers from './FloatingFlowers.jsx';

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-cream"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <FloatingFlowers />
      <motion.span
        animate={{ rotate: [-8, 8, -8] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="font-display text-4xl font-bold text-wine"
      >
        18.09 🎂
      </motion.span>
      <span className="font-body text-xs font-bold tracking-wide text-ink/40">
        ĐANG CHUẨN BỊ ĐIỀU BẤT NGỜ...
      </span>
    </motion.div>
  );
}
