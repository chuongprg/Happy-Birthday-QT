import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import { birthdayConfig } from '../../data/config.js';

export default function FinalVideo({ onEnded }) {
  const [showIntro, setShowIntro] = useState(true);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const revealVideo = () => setShowIntro(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setPlaying(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink"
    >
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            onAnimationComplete={() => setTimeout(revealVideo, 1800)}
            className="flex flex-col items-center gap-3 px-6 text-center"
          >
            <span className="text-4xl">🎬</span>
            <span className="font-display text-2xl font-bold text-cream sm:text-3xl">
              Một điều nho nhỏ
            </span>
            <span className="font-display text-2xl font-bold text-pink sm:text-3xl">
              dành tặng chị Quế Trân
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative flex h-full w-full items-center justify-center"
          >
            <video
              ref={videoRef}
              src={birthdayConfig.finalVideo}
              playsInline
              controls
              onEnded={onEnded}
              onPlay={() => setPlaying(true)}
              className="max-h-full max-w-full"
            />
            {!playing && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handlePlay}
                aria-label="Phát video"
                className="absolute flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-cream bg-wine text-cream shadow-sticker"
              >
                <Play size={24} fill="currentColor" />
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
