import { AnimatePresence, motion } from 'framer-motion';
import { Disc3, Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import CloseButton from './CloseButton.jsx';

// A small floating music widget — collapses to a single spinning-disc button
// so it never eats into the layout, expands into a compact playlist card.
export default function MusicPlayer({ player }) {
  const { tracks, currentIndex, isPlaying, expanded, toggle, next, prev, selectTrack, toggleExpanded } =
    player;
  const current = tracks[currentIndex];

  return (
    <div className="fixed bottom-4 left-4 z-40 flex flex-col items-start gap-3 sm:bottom-6 sm:left-6">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-64 rounded-2xl border-[3px] border-ink bg-cream p-4 shadow-sticker"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-body text-[11px] font-bold tracking-wide text-ink/50">
                ĐANG PHÁT NHẠC
              </span>
              <CloseButton onClick={toggleExpanded} label="Thu nhỏ máy phát nhạc" tone="ghost" size="sm" />
            </div>

            <div className="mb-3 flex flex-col">
              <span className="truncate font-display text-lg font-bold text-ink">
                {current?.title}
              </span>
              <span className="truncate font-body text-xs font-semibold text-ink/40">
                {current?.artist}
              </span>
            </div>

            <div className="mb-3 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label="Bài trước"
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-mint"
              >
                <SkipBack size={16} />
              </button>
              <button
                type="button"
                onClick={toggle}
                aria-label={isPlaying ? 'Tạm dừng' : 'Phát nhạc'}
                className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-ink bg-wine text-cream shadow-sticker-sm"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Bài tiếp theo"
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-mint"
              >
                <SkipForward size={16} />
              </button>
            </div>

            <div className="flex max-h-32 flex-col gap-1 overflow-y-auto">
              {tracks.map((track, i) => (
                <button
                  key={track.src}
                  type="button"
                  onClick={() => selectTrack(i)}
                  className={`truncate rounded-lg px-2.5 py-1.5 text-left font-body text-xs font-semibold ${
                    i === currentIndex ? 'bg-pink text-wine' : 'text-ink/50 hover:bg-ink/5'
                  }`}
                >
                  {track.title}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={toggleExpanded}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Máy phát nhạc"
        className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-ink bg-cream shadow-sticker-sm"
      >
        <motion.span
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
        >
          <Disc3 size={22} className="text-wine" />
        </motion.span>
      </motion.button>
    </div>
  );
}
