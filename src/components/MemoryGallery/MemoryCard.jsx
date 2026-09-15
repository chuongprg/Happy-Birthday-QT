import { motion } from 'framer-motion';

const TAPE_COLORS = ['bg-pink', 'bg-mint', 'bg-green'];

export default function MemoryCard({ memory, index }) {
  const rotate = index % 2 === 0 ? -4 : 3;
  const tape = TAPE_COLORS[index % TAPE_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ rotate: 0, scale: 1.04, y: -4 }}
      className="group relative w-[220px] flex-shrink-0 select-none rounded-2xl border-[3px] border-ink bg-cream p-3 pb-6 shadow-sticker sm:w-[260px]"
    >
      <span
        className={`absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-3 rounded-sm border-2 border-ink/20 ${tape} opacity-90`}
      />

      <div className="aspect-[4/5] w-full overflow-hidden rounded-lg border-2 border-ink/10 bg-ink/5">
        <img
          src={memory.image}
          alt={memory.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      <div className="mt-3 flex flex-col gap-1 px-1">
        <span className="font-body text-[10px] font-bold tracking-wide text-wine/70">
          {memory.date}
        </span>
        <span className="font-display text-lg font-bold text-ink">{memory.title}</span>
        <p className="font-body text-xs font-medium leading-relaxed text-ink/50">
          {memory.description}
        </p>
      </div>
    </motion.div>
  );
}
