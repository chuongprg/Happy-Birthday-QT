import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X } from 'lucide-react';
import { subscribeLocketPhotos, deleteLocketPhoto } from '../../utils/locketPhotos.js';

export default function LocketGallery() {
  const [photos, setPhotos] = useState(null); // null = loading
  const [selected, setSelected] = useState(null);

  useEffect(() => subscribeLocketPhotos(setPhotos), []);

  const handleDelete = async (photo) => {
    if (!window.confirm('Xoá tấm ảnh này? Không thể hoàn tác.')) return;
    await deleteLocketPhoto(photo);
    setSelected((s) => (s?.id === photo.id ? null : s));
  };

  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
      {photos === null && <p className="font-body text-sm text-ink/40">Đang tải...</p>}
      {photos?.length === 0 && (
        <p className="font-body text-sm text-ink/40">Chưa có khoảnh khắc nào được lưu.</p>
      )}

      <div className="grid grid-cols-3 gap-2">
        {photos?.map((photo) => (
          <motion.button
            key={photo.id}
            type="button"
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setSelected(photo)}
            className="aspect-square overflow-hidden rounded-xl border-2 border-ink"
          >
            <img src={photo.downloadURL} alt="" loading="lazy" className="h-full w-full object-cover" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/80 p-6"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-full max-w-sm flex-col overflow-hidden rounded-2xl border-[3px] border-ink bg-cream shadow-sticker"
            >
              <img src={selected.downloadURL} alt="" className="max-h-[65vh] w-full object-contain" />
              <div className="flex items-center justify-end gap-2 p-3">
                <button
                  type="button"
                  onClick={() => handleDelete(selected)}
                  aria-label="Xoá ảnh"
                  className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-ink bg-cream text-wine"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Đóng"
                  className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-ink bg-cream text-ink"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
