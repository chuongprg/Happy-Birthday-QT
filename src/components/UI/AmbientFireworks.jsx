import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Small, occasional firework-like pops — a much quieter cousin of the big
// canvas fireworks show (FireworksShow.jsx), sized for sitting as ambient
// decoration behind a light/cream card rather than a dark night-sky finale.
// Plain DOM + Framer Motion is fine here since only one burst of ~14 dots
// exists at a time, firing every 9-16s.
const COLORS = ['#F8C8DC', '#FFD966', '#8DDDD0', '#F2A0C4', '#7A2346'];
const rand = (a, b) => a + Math.random() * (b - a);

function FireworkPop({ x, y }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2 + rand(-0.15, 0.15);
        const dist = rand(28, 60);
        return {
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          color: COLORS[i % COLORS.length],
          size: rand(4, 7),
        };
      }),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {particles.map((p, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: 0, x: p.dx, y: p.dy, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, background: p.color, boxShadow: `0 0 6px 1px ${p.color}` }}
        />
      ))}
    </motion.div>
  );
}

export default function AmbientFireworks() {
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    let timeoutId;
    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        const id = Date.now() + Math.random();
        setBursts((b) => [...b, { id, x: rand(15, 85), y: rand(10, 45) }]);
        setTimeout(() => setBursts((b) => b.filter((burst) => burst.id !== id)), 1300);
        scheduleNext();
      }, rand(9000, 16000));
    };
    scheduleNext();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {bursts.map((b) => (
          <FireworkPop key={b.id} x={b.x} y={b.y} />
        ))}
      </AnimatePresence>
    </div>
  );
}
