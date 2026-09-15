import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

// Pairs with CloseButton — steps back one screen within a flow, rather than
// exiting it entirely.
export default function BackButton({ onClick, label = 'Quay lại', className = '' }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      whileHover={{ x: -3, scale: 1.08 }}
      whileTap={{ scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-ink bg-cream text-ink shadow-sticker-sm ${className}`}
    >
      <ChevronLeft size={20} strokeWidth={3} />
    </motion.button>
  );
}
