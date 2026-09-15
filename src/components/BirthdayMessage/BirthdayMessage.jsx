import { motion } from 'framer-motion';
import { birthdayConfig } from '../../data/config.js';
import GlowBackground from '../UI/GlowBackground.jsx';
import Motif18 from '../UI/Motif18.jsx';

export default function BirthdayMessage() {
  return (
    <section
      id="section-message"
      className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-cream px-6 py-28"
    >
      <GlowBackground variant="pastel" />
      <Motif18 className="absolute -left-10 top-6 text-[28vh]" />

      <div className="relative z-10 flex max-w-2xl flex-col items-center gap-4 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-ink/35"
        >
          Chương {birthdayConfig.story.chapters[0].number} ·{' '}
          {birthdayConfig.story.chapters[0].title}
        </motion.span>

        <motion.span
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
          className="mb-8 rounded-full border-[3px] border-ink bg-mint px-5 py-2 font-body text-xs font-bold tracking-wide text-ink shadow-sticker-sm"
        >
          {birthdayConfig.messageTitle}
        </motion.span>

        <div className="flex flex-col gap-7">
          {birthdayConfig.messageLines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: i * 0.25 }}
              className="whitespace-preline font-display text-3xl font-bold leading-snug text-ink sm:text-4xl"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
