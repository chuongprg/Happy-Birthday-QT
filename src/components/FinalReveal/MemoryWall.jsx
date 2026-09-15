import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { gifts } from '../../data/gifts.js';
import SectionHeading from '../UI/SectionHeading.jsx';
import GlowBackground from '../UI/GlowBackground.jsx';
import { stickerPack } from '../../data/stickerPack.js';
import { birthdayConfig } from '../../data/config.js';

const TAPE_COLORS = ['bg-pink', 'bg-mint', 'bg-green'];

export default function MemoryWall({ giftPhotos }) {
  return (
    <section className="relative w-full overflow-hidden bg-cream py-24">
      <GlowBackground variant="pastel" />

      <div className="relative z-10 mb-12 px-6 sm:px-12">
        <SectionHeading
          eyebrow="🎀 KẾT THÚC HÀNH TRÌNH"
          title={'Những kỷ niệm\nTrân tạo ra hôm nay.'}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-3xl grid-cols-2 gap-5 px-6 sm:grid-cols-3 sm:px-12">
        {gifts.map((gift, i) => {
          const photo = giftPhotos[i];
          const rotate = i % 3 === 0 ? -3 : i % 3 === 1 ? 2 : -1.5;
          const tape = TAPE_COLORS[i % TAPE_COLORS.length];

          return (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: (i % 3) * 0.08 }}
              whileHover={{ rotate: 0, scale: 1.04 }}
              className="relative rounded-2xl border-[3px] border-ink bg-cream p-2.5 pb-5 shadow-sticker-sm"
            >
              <span
                className={`absolute -top-3 left-1/2 h-6 w-14 -translate-x-1/2 -rotate-3 rounded-sm border-2 border-ink/20 ${tape}`}
              />
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg border-2 border-ink/10 bg-ink/5">
                {photo?.url ? (
                  <img src={photo.url} alt={gift.title} className="h-full w-full object-cover" />
                ) : (
                  <Camera className="text-ink/20" size={26} />
                )}
              </div>
              <span className="mt-2.5 block text-center font-body text-[10px] font-bold tracking-wide text-wine/70">
                {gift.emoji} {gift.title}
              </span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 mt-14 flex justify-center"
      >
        <img
          src={stickerPack.bye.src}
          alt={stickerPack.bye.caption}
          className="w-32 select-none drop-shadow-[0_8px_14px_rgba(26,26,26,0.22)] sm:w-40"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 mt-10 flex flex-col items-center gap-6 px-6"
      >
        <p className="whitespace-preline max-w-xs text-center font-display text-lg italic text-ink/50">
          {birthdayConfig.story.closingLine}
        </p>
        <motion.span
          initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="rounded-full border-[3px] border-ink bg-wine px-8 py-2.5 font-display text-2xl font-extrabold tracking-[0.15em] text-cream shadow-sticker-sm"
        >
          {birthdayConfig.story.theEnd}
        </motion.span>
      </motion.div>
    </section>
  );
}
