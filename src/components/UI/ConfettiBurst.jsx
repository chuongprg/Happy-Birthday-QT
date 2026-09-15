import { useMemo } from 'react';
import { motion } from 'framer-motion';

const COLORS = ['#F8C8DC', '#8DDDD0', '#C8E6C9', '#7A2346', '#FFD966'];
const SHAPES = ['●', '★', '✦', '♥'];

// A one-shot confetti burst — mount it fresh (change `key`) each time you
// want it to fire again.
export default function ConfettiBurst({ count = 26 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 320,
        rotate: Math.random() * 360,
        delay: Math.random() * 0.25,
        color: COLORS[i % COLORS.length],
        shape: SHAPES[i % SHAPES.length],
        size: 14 + Math.random() * 14,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: p.x, y: -20, opacity: 1, rotate: 0 }}
          animate={{ y: 520, opacity: 0, rotate: p.rotate }}
          transition={{ duration: 1.8 + Math.random(), delay: p.delay, ease: 'easeIn' }}
          style={{ color: p.color, fontSize: p.size, left: '50%', top: 0 }}
          className="absolute"
        >
          {p.shape}
        </motion.span>
      ))}
    </div>
  );
}
