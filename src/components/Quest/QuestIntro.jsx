import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlowBackground from '../UI/GlowBackground.jsx';
import Motif18 from '../UI/Motif18.jsx';
import PhotoSticker from '../UI/PhotoSticker.jsx';
import Countdown from '../UI/Countdown.jsx';
import { gifts } from '../../data/gifts.js';
import { stickerPack } from '../../data/stickerPack.js';
import { birthdayConfig } from '../../data/config.js';
import { isQuestUnlocked } from '../../utils/birthdayGate.js';
import { parseDateTime } from '../../utils/parseDateTime.js';

const QUEST_UNLOCK_MS = parseDateTime(birthdayConfig.questUnlock.date, birthdayConfig.questUnlock.time);

export default function QuestIntro({ onStart }) {
  const chapter = birthdayConfig.story.chapters[3];
  const [unlocked, setUnlocked] = useState(isQuestUnlocked);

  useEffect(() => {
    if (unlocked) return;
    const id = setInterval(() => {
      if (isQuestUnlocked()) {
        setUnlocked(true);
        clearInterval(id);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [unlocked]);

  return (
    <section
      id="section-quest"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-cream px-6 py-28 text-center"
    >
      <GlowBackground variant="pastel" />
      <Motif18 className="absolute -right-6 bottom-0 text-[32vh]" />

      <div className="relative z-10 flex max-w-lg flex-col items-center gap-8">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-ink/35"
        >
          Chương {chapter.number} · {chapter.title}
        </motion.span>

        <motion.span
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
          className="-mt-4 rounded-full border-[3px] border-ink bg-pink px-5 py-2 font-body text-xs font-bold tracking-wide text-wine shadow-sticker-sm"
        >
          🎁 GIFT QUEST
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="font-display text-4xl font-bold text-ink sm:text-5xl"
        >
          {gifts.length} món quà đang chờ Quế Trân!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          className="font-body text-base font-semibold text-ink/60"
        >
          Nhưng có một luật nhỏ nè...
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.8 }}
          className="font-display text-2xl font-bold text-wine"
        >
          Phải mở lần lượt từng món một thôi đó! 😉
        </motion.p>

        <div className="relative">
          <PhotoSticker
            sticker={stickerPack.cheer}
            className="-right-24 -top-6 hidden sm:block"
            size={80}
            rotate={-10}
            delay={1.4}
          />
          {unlocked ? (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 1.2 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.94, y: 4 }}
              onClick={onStart}
              className="mt-4 min-h-[56px] rounded-full border-[3px] border-ink bg-wine px-10 font-display text-base font-bold text-cream shadow-sticker"
            >
              Bắt đầu mở quà 🎁
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 1.2 }}
              className="mt-4 flex flex-col items-center gap-3"
            >
              <Countdown targetMs={QUEST_UNLOCK_MS} label="MỞ QUÀ SAU" arrivedLabel="MỞ ĐƯỢC RỒI 🎉" />
              <p className="font-body text-xs font-semibold text-ink/40">Ráng chờ thêm chút xíu nha 🕐</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
