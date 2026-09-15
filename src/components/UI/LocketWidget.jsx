import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Camera, Images } from 'lucide-react';
import CloseButton from './CloseButton.jsx';
import LocketCapture from './LocketCapture.jsx';
import LocketGallery from './LocketGallery.jsx';

// A floating "capture a moment" widget, opposite corner from MusicPlayer —
// snap a quick photo anytime (Locket-style) and browse/delete them in a
// small shared gallery, all from the main site.
export default function LocketWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('capture'); // 'capture' | 'gallery'

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Chụp khoảnh khắc"
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-ink bg-cream shadow-sticker-sm sm:bottom-6 sm:right-6"
      >
        <Camera size={22} className="text-wine" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] flex flex-col bg-cream"
          >
            <div className="flex items-center justify-between border-b-[3px] border-ink px-4 py-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMode('capture')}
                  className={`flex items-center gap-1.5 rounded-full border-2 border-ink px-4 py-1.5 font-body text-xs font-bold ${
                    mode === 'capture' ? 'bg-wine text-cream' : 'bg-cream text-ink/60'
                  }`}
                >
                  <Camera size={13} /> Chụp
                </button>
                <button
                  type="button"
                  onClick={() => setMode('gallery')}
                  className={`flex items-center gap-1.5 rounded-full border-2 border-ink px-4 py-1.5 font-body text-xs font-bold ${
                    mode === 'gallery' ? 'bg-wine text-cream' : 'bg-cream text-ink/60'
                  }`}
                >
                  <Images size={13} /> Thư viện
                </button>
              </div>
              <CloseButton onClick={() => setOpen(false)} label="Đóng khung chụp ảnh" tone="ghost" />
            </div>

            {mode === 'capture' ? <LocketCapture onSaved={() => setMode('gallery')} /> : <LocketGallery />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
