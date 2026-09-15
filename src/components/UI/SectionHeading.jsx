import { motion } from 'framer-motion';

export default function SectionHeading({
  chapter,
  eyebrow,
  title,
  subtitle,
  align = 'left',
  tone = 'pink',
}) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  const eyebrowTone = tone === 'wine' ? 'bg-wine text-cream' : 'bg-pink text-wine';

  return (
    <div className={`flex flex-col gap-4 ${alignClass}`}>
      {chapter && (
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-ink/35"
        >
          Chương {chapter.number} · {chapter.title}
        </motion.span>
      )}
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
          className={`w-fit rounded-full px-4 py-1.5 font-body text-xs font-bold tracking-wide ${eyebrowTone}`}
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
        className="whitespace-preline font-display text-4xl font-bold leading-[1.1] text-ink sm:text-5xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="max-w-md font-body text-base font-medium leading-relaxed text-ink/60"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
