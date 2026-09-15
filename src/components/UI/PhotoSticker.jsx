import { motion } from 'framer-motion';

// A cropped photo-sticker (see scripts/crop-sticker-sheet.cjs) pinned to a
// corner of a card/button — pops in, then wiggles gently on hover, like a
// sticker someone actually stuck there.
export default function PhotoSticker({
  sticker,
  className = '',
  size = 84,
  rotate = -8,
  delay = 0,
}) {
  return (
    <motion.img
      src={sticker.src}
      alt={sticker.caption}
      initial={{ opacity: 0, scale: 0.4, rotate: rotate * 2 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, amount: 0.6 }}
      whileHover={{ rotate: 0, scale: 1.08 }}
      transition={{ duration: 0.55, delay, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ width: size, height: 'auto' }}
      className={`pointer-events-auto absolute z-20 select-none drop-shadow-[0_6px_12px_rgba(26,26,26,0.22)] ${className}`}
    />
  );
}
