import { motion } from 'framer-motion';
import { X } from 'lucide-react';

// A cute, consistent "exit this thing" button — used on modals and
// full-screen overlays throughout the site. Wiggles playfully on hover.
const TONES = {
  cream: 'bg-cream text-ink border-ink',
  wine: 'bg-wine text-cream border-ink',
  ghost: 'bg-transparent text-ink/40 border-ink/20',
};

const SIZES = {
  md: { box: 'h-10 w-10 border-[3px]', icon: 18 },
  sm: { box: 'h-7 w-7 border-2', icon: 13 },
};

export default function CloseButton({
  onClick,
  label = 'Đóng',
  tone = 'cream',
  size = 'md',
  className = '',
}) {
  const s = SIZES[size];
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      whileHover={{ rotate: 90, scale: 1.08 }}
      whileTap={{ scale: 0.85, rotate: 90 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`flex items-center justify-center rounded-full shadow-sticker-sm ${s.box} ${TONES[tone]} ${className}`}
    >
      <X size={s.icon} strokeWidth={3} />
    </motion.button>
  );
}
