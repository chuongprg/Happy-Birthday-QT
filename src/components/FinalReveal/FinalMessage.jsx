import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { birthdayConfig } from '../../data/config.js';
import GlowBackground from '../UI/GlowBackground.jsx';
import Motif18 from '../UI/Motif18.jsx';
import PhotoSticker from '../UI/PhotoSticker.jsx';
import { stickerPack } from '../../data/stickerPack.js';

export default function FinalMessage({ onContinue }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-7 overflow-hidden bg-cream px-6 py-16 text-center"
    >
      <GlowBackground variant="pastel" />
      <Motif18 className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-[42vh]" />
      <PhotoSticker
        sticker={stickerPack.love}
        className="right-4 top-10 sm:right-16"
        size={86}
        rotate={10}
        delay={1.2}
      />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="relative z-10 font-body text-[11px] font-bold uppercase tracking-[0.25em] text-ink/35"
      >
        {birthdayConfig.story.epilogueLabel}
      </motion.span>

      <motion.span
        initial={{ opacity: 0, y: 12, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: 'backOut' }}
        className="relative z-10 rounded-full border-[3px] border-ink bg-mint px-5 py-2 font-body text-sm font-bold tracking-wide text-ink shadow-sticker-sm"
      >
        {birthdayConfig.date}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 font-display text-5xl font-extrabold text-wine sm:text-6xl"
      >
        {birthdayConfig.finalMessageTitle}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="relative z-10 flex flex-col gap-1"
      >
        {birthdayConfig.finalMessageLines.map((line, i) => (
          <span key={i} className="font-display text-xl font-bold text-ink/80">
            {line}
          </span>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3, duration: 0.7 }}
        className="whitespace-preline relative z-10 max-w-xs font-body text-sm font-semibold leading-relaxed text-ink/60"
      >
        {birthdayConfig.finalMessageBody}
      </motion.p>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.7 }}
        className="relative z-10 font-display font-bold text-wine/70"
      >
        {birthdayConfig.finalSignature}
      </motion.span>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.7, duration: 0.7 }}
        onClick={onContinue}
        className="group relative z-10 mt-6 flex flex-col items-center gap-1.5 font-body text-[11px] font-bold tracking-wide text-ink/40"
      >
        <span>XEM LẠI NHỮNG KỶ NIỆM HÔM NAY</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ChevronDown size={16} />
        </motion.span>
      </motion.button>
    </motion.section>
  );
}
