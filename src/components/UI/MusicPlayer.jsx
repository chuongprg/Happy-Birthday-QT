import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Disc3,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Trash2,
  Plus,
} from 'lucide-react';
import CloseButton from './CloseButton.jsx';

// A small floating music widget — collapses to a single spinning-disc button
// so it never eats into the layout, expands into a compact playlist card.
export default function MusicPlayer({ player }) {
  const {
    tracks,
    currentIndex,
    isPlaying,
    expanded,
    repeatMode,
    shuffle,
    addStatus,
    toggle,
    next,
    prev,
    selectTrack,
    toggleExpanded,
    toggleRepeat,
    toggleShuffle,
    addYoutubeTrack,
    removeYoutubeTrack,
  } = player;
  const current = tracks[currentIndex];
  const [ytUrl, setYtUrl] = useState('');

  const handleAddYoutube = async (e) => {
    e.preventDefault();
    if (!ytUrl.trim() || addStatus === 'adding') return;
    const ok = await addYoutubeTrack(ytUrl);
    if (ok) setYtUrl('');
  };

  const RepeatIcon = repeatMode === 'one' ? Repeat1 : Repeat;

  return (
    <div className="fixed bottom-4 left-4 z-40 flex flex-col items-start gap-3 sm:bottom-6 sm:left-6">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-72 rounded-2xl border-[3px] border-ink bg-cream p-4 shadow-sticker"
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

            <div className="mb-3 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={toggleShuffle}
                aria-label="Phát ngẫu nhiên"
                aria-pressed={shuffle}
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink ${
                  shuffle ? 'bg-wine text-cream' : 'bg-cream text-ink/50'
                }`}
              >
                <Shuffle size={14} />
              </button>
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
              <button
                type="button"
                onClick={toggleRepeat}
                aria-label="Lặp lại"
                aria-pressed={repeatMode !== 'off'}
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink ${
                  repeatMode !== 'off' ? 'bg-wine text-cream' : 'bg-cream text-ink/50'
                }`}
              >
                <RepeatIcon size={14} />
              </button>
            </div>

            <div className="mb-3 flex max-h-32 flex-col gap-1 overflow-y-auto">
              {tracks.map((track, i) => (
                <div
                  key={track.key}
                  className={`group flex items-center rounded-lg px-2.5 py-1.5 ${
                    i === currentIndex ? 'bg-pink text-wine' : 'text-ink/50 hover:bg-ink/5'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => selectTrack(i)}
                    className="min-w-0 flex-1 truncate text-left font-body text-xs font-semibold"
                  >
                    {track.title}
                  </button>
                  {track.type === 'youtube' && (
                    <button
                      type="button"
                      onClick={() => removeYoutubeTrack(track.id)}
                      aria-label="Xoá bài hát này"
                      className="ml-1.5 shrink-0 text-ink/30 hover:text-wine"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleAddYoutube} className="flex flex-col gap-1.5 border-t-2 border-ink/10 pt-3">
              <span className="font-body text-[10px] font-bold tracking-wide text-ink/40">
                THÊM BÀI TỪ YOUTUBE
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={ytUrl}
                  onChange={(e) => setYtUrl(e.target.value)}
                  placeholder="Dán link YouTube vào đây..."
                  className="min-w-0 flex-1 rounded-lg border-2 border-ink bg-white px-2.5 py-1.5 font-body text-xs font-semibold text-ink outline-none focus:bg-pink/10"
                />
                <button
                  type="submit"
                  disabled={!ytUrl.trim() || addStatus === 'adding'}
                  aria-label="Thêm bài hát"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-mint disabled:opacity-40"
                >
                  <Plus size={15} />
                </button>
              </div>
              {addStatus === 'error' && (
                <span className="font-body text-[10px] font-bold text-wine">
                  Link chưa đúng hoặc lỗi mạng, thử lại nhé.
                </span>
              )}
            </form>
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
