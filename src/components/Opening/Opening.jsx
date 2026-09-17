import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Heart, Star, RotateCcw } from 'lucide-react';
import { birthdayConfig } from '../../data/config.js';
import GlowBackground from '../UI/GlowBackground.jsx';
import PhotoSticker from '../UI/PhotoSticker.jsx';
import FlowerBurst from '../UI/FlowerBurst.jsx';
import MonthCalendarModal from '../UI/MonthCalendarModal.jsx';
import BirthdayCountdown from './BirthdayCountdown.jsx';
import PhotoMontage from './PhotoMontage.jsx';
import Celebration from './Celebration.jsx';
import RestaurantReveal from './RestaurantReveal.jsx';
import { introPhotos } from '../../data/introPhotos.js';
import { stickerPack } from '../../data/stickerPack.js';

// Total run time from envelope-click to Hero (flower burst → photo montage →
// celebration), timed to end exactly as the dedicated ~44s intro theme
// (playlist track 0, public/audio/intro-theme.mp3) finishes. Keep
// INTRO_MUSIC_MS in sync if that file's length ever changes. Only ever runs
// in 'full' content mode, where the 24→25 age reveal always plays too (see
// getContentMode in utils/birthdayGate.js — 'full' only happens once the
// birthday itself has arrived).
const INTRO_MUSIC_MS = 44000;
const FLOWER_BURST_MS = 5000; // matches FlowerBurst's own animation length
const CELEBRATION_MS = 9500;

// The pages the flip-calendar races through before settling on the real date.
const FLIP_DATES = [
  { day: '02', month: 'JAN' },
  { day: '14', month: 'FEB' },
  { day: '08', month: 'MAR' },
  { day: '22', month: 'APR' },
  { day: '30', month: 'JUN' },
  { day: '15', month: 'JUL' },
  { day: '05', month: 'AUG' },
  { day: birthdayConfig.day, month: birthdayConfig.month.slice(0, 3) },
];
// Each flip takes a little longer than the last, so the calendar feels like
// it's decelerating into place rather than just stopping abruptly.
const FLIP_DELAYS = [110, 110, 120, 140, 180, 240, 320, 460];

function FlipCalendar({ onDone }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= FLIP_DATES.length - 1) {
      const t = setTimeout(onDone, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), FLIP_DELAYS[index]);
    return () => clearTimeout(t);
  }, [index, onDone]);

  const current = FLIP_DATES[index];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-6"
    >
      <div
        className="w-48 overflow-hidden rounded-3xl border-[3px] border-ink bg-cream shadow-sticker"
        style={{ perspective: 600 }}
      >
        <div className="bg-wine py-2 text-center font-body text-sm font-bold tracking-widest text-cream">
          2026
        </div>
        <div className="relative h-28" style={{ transformStyle: 'preserve-3d' }}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={index}
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{ duration: 0.16, ease: 'easeInOut' }}
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ transformOrigin: 'center' }}
            >
              <span className="font-display text-5xl font-extrabold leading-none text-wine">
                {current.day}
              </span>
              <span className="mt-1 font-body text-xs font-bold tracking-widest text-ink/50">
                {current.month}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// Flap and body share the exact same 288×208 viewBox/pixel mapping (instead
// of the flap having its own smaller coordinate system), so their edges are
// pixel-perfect aligned no matter what — there's no separate box to drift
// out of sync with the other.
const ENVELOPE_VIEWBOX = '0 0 288 208';
const HINGE_Y = 36; // where the flap is "attached" to the body — its top edge

function LetterCard({ opening }) {
  return (
    <motion.div
      animate={{ y: opening ? -108 : 0, rotate: opening ? -2.5 : 0 }}
      transition={{ duration: 0.6, delay: opening ? 0.85 : 0, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ top: 112, height: 80 }}
      className="absolute inset-x-9 z-[5] flex flex-col items-center gap-1.5 rounded-xl border-[3px] border-ink bg-cream pt-3 shadow-sticker-sm"
    >
      <span className="h-1 w-3/4 rounded-full bg-wine/15" />
      <Heart size={15} className="fill-pink-deep text-ink" strokeWidth={2} />
      <span className="h-1 w-1/2 rounded-full bg-wine/15" />
      <span className="h-1 w-2/3 rounded-full bg-wine/15" />
    </motion.div>
  );
}

function WaxSeal({ opening }) {
  return (
    <motion.div
      animate={
        opening
          ? { scale: [1, 1.3, 0], rotate: -35, opacity: [1, 1, 0] }
          : { scale: 1, rotate: 0, opacity: 1 }
      }
      transition={{ duration: 0.3, ease: 'easeIn' }}
      style={{ top: 82 }}
      className="absolute left-1/2 z-20 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-ink bg-wine text-cream shadow-sticker-sm"
    >
      <Heart size={18} className="fill-current" />
    </motion.div>
  );
}

function EnvelopeStamp() {
  return (
    <div className="absolute right-6 top-9 z-[1] flex h-10 w-9 -rotate-6 items-center justify-center rounded-[3px] border-2 border-dashed border-ink/40 bg-green/60">
      <Star size={16} className="fill-ink/30 text-ink/40" />
    </div>
  );
}

function Envelope({ onOpened }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    onOpened();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col items-center gap-9"
    >
      <PhotoSticker
        sticker={stickerPack.wow}
        className="-right-4 -top-24 sm:-right-16"
        size={88}
        rotate={12}
      />

      {/* soft glow that blooms behind the letter as it's pulled out */}
      <motion.div
        animate={{ opacity: opening ? 0.9 : 0, scale: opening ? 1 : 0.6 }}
        transition={{ duration: 0.8, delay: 0.75 }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink/50 blur-[50px]"
      />

      <div className="relative h-52 w-72" style={{ perspective: 1000 }}>
        {/* envelope body with realistic fold-seam lines */}
        <svg
          viewBox={ENVELOPE_VIEWBOX}
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <rect
            x="8"
            y={HINGE_Y}
            width="272"
            height="160"
            rx="16"
            fill="#F8C8DC"
            stroke="#1A1A1A"
            strokeWidth="4"
          />
          <path
            d="M10 40 L144 132 L278 40"
            fill="none"
            stroke="#1A1A1A"
            strokeOpacity="0.18"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M10 196 L108 128 M278 196 L180 128"
            fill="none"
            stroke="#1A1A1A"
            strokeOpacity="0.18"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        <EnvelopeStamp />

        <LetterCard opening={opening} />

        {/* flap — flips open first, hinged exactly at the body's top edge,
            fully settled before the letter starts sliding out */}
        <motion.div
          animate={{ rotateX: opening ? -172 : 0 }}
          transition={{ type: 'spring', stiffness: 130, damping: 16 }}
          className="absolute inset-0 z-10"
          style={{ transformStyle: 'preserve-3d', transformOrigin: `144px ${HINGE_Y}px` }}
        >
          <svg viewBox={ENVELOPE_VIEWBOX} className="h-full w-full overflow-visible">
            <path
              d={`M8 ${HINGE_Y} L280 ${HINGE_Y} L144 128 Z`}
              fill="#F2A0C4"
              stroke="#1A1A1A"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <WaxSeal opening={opening} />
      </div>

      <motion.button
        type="button"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05, rotate: -1 }}
        whileTap={{ scale: 0.94, y: 4 }}
        disabled={opening}
        onClick={handleOpen}
        className="min-h-[56px] rounded-full border-[3px] border-ink bg-wine px-9 font-display text-base font-bold text-cream shadow-sticker disabled:pointer-events-none"
      >
        {birthdayConfig.openingInviteCta} 💌
      </motion.button>

      <motion.p
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="font-body text-xs font-bold text-ink/40"
      >
        🎧 Vui lòng đeo tai nghe để có trải nghiệm tốt nhất !
      </motion.p>
    </motion.div>
  );
}

function Hero({ onScrollNext, onOpenCalendar, onReplay, showContinue = true }) {
  const pop = (delay) => ({
    initial: { opacity: 0, scale: 0.5, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.34, 1.56, 0.64, 1] },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-3 px-6 text-center"
    >
      <motion.span
        {...pop(0.05)}
        className="rounded-full border-[3px] border-ink bg-pink px-5 py-2 font-body text-xs font-bold tracking-wide text-wine shadow-sticker-sm"
      >
        {birthdayConfig.openingEyebrow}
      </motion.span>

      <motion.div {...pop(0.2)}>
        <motion.button
          type="button"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          whileHover={{ scale: 1.08, rotate: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={onOpenCalendar}
          aria-label="Xem lịch tháng"
          className="font-display text-[26vw] font-extrabold leading-none text-wine drop-shadow-[0_6px_0_rgba(122,35,70,0.15)] sm:text-[9rem]"
        >
          {birthdayConfig.day}
        </motion.button>
      </motion.div>

      <motion.div
        {...pop(0.35)}
        className="rounded-full border-[3px] border-ink bg-mint px-6 py-2 font-body text-sm font-bold tracking-wide text-ink shadow-sticker-sm"
      >
        {birthdayConfig.month} · {birthdayConfig.year}
      </motion.div>

      <motion.div {...pop(0.42)} className="mt-3">
        <BirthdayCountdown />
      </motion.div>

      <motion.p {...pop(0.5)} className="mt-4 max-w-xs font-display text-xl font-bold text-ink">
        {birthdayConfig.openingHeadline}
      </motion.p>

      <motion.p
        {...pop(0.7)}
        className="whitespace-preline mt-2 max-w-xs font-display text-base italic text-wine/60"
      >
        {birthdayConfig.story.prologue}
      </motion.p>

      {showContinue && (
        <motion.button
          {...pop(0.9)}
          whileHover={{ scale: 1.05, rotate: -1 }}
          whileTap={{ scale: 0.94, y: 4 }}
          onClick={onScrollNext}
          className="mt-10 flex min-h-[56px] items-center gap-2 rounded-full border-[3px] border-ink bg-wine px-8 font-display text-base font-bold text-cream shadow-sticker"
        >
          Xem tiếp nào
          <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
            <ChevronDown size={18} />
          </motion.span>
        </motion.button>
      )}

      {onReplay && (
        <motion.button
          {...pop(1.05)}
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          onClick={onReplay}
          className="mt-1 flex items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-xs font-bold text-ink/40"
        >
          <RotateCcw size={12} />
          Xem lại đoạn giới thiệu
        </motion.button>
      )}
    </motion.div>
  );
}

export default function Opening({ onEnvelopeOpen, onMontageStart, onPlainMusicStart, contentMode }) {
  // 'calendar' | 'envelope' | 'montage' | 'celebration' | 'dinner' | 'hero'
  const [stage, setStage] = useState('calendar');
  const [showFlowerBurst, setShowFlowerBurst] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const openedRef = useRef(false);
  const isFull = contentMode === 'full';

  // The photo montage always eats whatever's left of the 44s intro theme
  // after the flower burst and the celebration (fireworks + age reveal)
  // segment, so the whole cinematic still lands on Hero exactly as the song
  // ends.
  const photoMontageMs = INTRO_MUSIC_MS - FLOWER_BURST_MS - CELEBRATION_MS;
  const slideMs = Math.round(photoMontageMs / introPhotos.length);

  // Replaying from Hero has no flower burst to wait out, so it can start the
  // montage (and the music) immediately. Only offered in 'full' mode — see
  // the Hero render below.
  const replayFullCinematic = () => {
    onMontageStart?.();
    setStage('montage');
  };

  const handleEnvelopeOpened = () => {
    if (!openedRef.current) {
      openedRef.current = true;
      onEnvelopeOpen?.();
      // Must fire synchronously, right here in the click handler — starting
      // audio from inside a setTimeout loses the "user gesture" the mobile
      // autoplay-with-sound policy requires, so a dedicated track would
      // silently fail to play on the phone.
      if (isFull) onMontageStart?.();
      else onPlainMusicStart?.();
      setShowFlowerBurst(true);
      setTimeout(() => setShowFlowerBurst(false), FLOWER_BURST_MS);
    }
    setTimeout(() => {
      if (isFull) setStage('montage');
      else if (contentMode === 'dinner') setStage('dinner');
      else setStage('hero');
    }, FLOWER_BURST_MS);
  };

  const scrollToNext = () => {
    document.getElementById('section-message')?.scrollIntoView({ behavior: 'smooth' });
  };

  // The dinner reveal card (photo + countdown + address + scroll button) is
  // taller than the others and doesn't fit one screen on smaller phones
  // (iPhone SE/8 and similar) — forcing it into a fixed h-[100svh] with
  // overflow-hidden was clipping the "xem thêm" button off entirely there.
  // Every other stage is a deliberately fixed one-screen moment, so only the
  // dinner stage switches to a natural-height, scrollable section.
  const isDinnerStage = stage === 'dinner';

  return (
    <section
      id="section-home"
      className={`relative flex w-full flex-col items-center justify-center bg-cream ${
        isDinnerStage ? 'min-h-[100svh] overflow-visible py-12' : 'h-[100svh] overflow-hidden'
      }`}
    >
      <GlowBackground variant="pastel" />
      {showFlowerBurst && <FlowerBurst />}

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {stage === 'calendar' && (
            <FlipCalendar key="calendar" onDone={() => setStage('envelope')} />
          )}
          {stage === 'envelope' && <Envelope key="envelope" onOpened={handleEnvelopeOpened} />}
          {stage === 'montage' && (
            <PhotoMontage key="montage" slideMs={slideMs} onDone={() => setStage('celebration')} />
          )}
          {stage === 'celebration' && (
            <Celebration
              key="celebration"
              durationMs={CELEBRATION_MS}
              showAgeReveal
              onDone={() => setStage('hero')}
            />
          )}
          {stage === 'dinner' && <RestaurantReveal key="dinner" />}
          {stage === 'hero' && (
            <Hero
              key="hero"
              onScrollNext={scrollToNext}
              onOpenCalendar={() => setShowCalendarModal(true)}
              onReplay={isFull ? replayFullCinematic : undefined}
              showContinue={isFull}
            />
          )}
        </AnimatePresence>
      </div>

      <MonthCalendarModal
        open={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
        day={birthdayConfig.day}
        month={birthdayConfig.month}
        monthIndex={birthdayConfig.monthIndex}
        year={birthdayConfig.year}
      />
    </section>
  );
}
