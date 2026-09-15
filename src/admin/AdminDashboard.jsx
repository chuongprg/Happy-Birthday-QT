import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { LogOut, Trash2, X, Download, MapPin, RotateCcw } from 'lucide-react';
import { auth, db } from '../lib/firebase.js';
import { savePickupLocation } from '../utils/pickupLocation.js';

function formatDate(timestamp) {
  if (!timestamp?.toDate) return '';
  return timestamp.toDate().toLocaleString('vi-VN');
}

export default function AdminDashboard() {
  const [photos, setPhotos] = useState(null); // null = loading
  const [selected, setSelected] = useState(null);
  const [pickupAnswer, setPickupAnswer] = useState(undefined); // undefined = loading
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'photos'), orderBy('capturedAt', 'desc'));
    return onSnapshot(q, (snap) => {
      setPhotos(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, []);

  useEffect(() => {
    return onSnapshot(doc(db, 'meta', 'pickupLocation'), (snap) => {
      setPickupAnswer(snap.exists() ? (snap.data().answer ?? '') : '');
    });
  }, []);

  const handleResetPickup = async () => {
    if (!window.confirm('Xoá điểm đón hiện tại? Không thể hoàn tác.')) return;
    setResetting(true);
    try {
      await savePickupLocation('');
    } catch (err) {
      console.warn('Reset pickup location failed:', err);
      window.alert('Xoá chưa được, thử lại nhé.');
    } finally {
      setResetting(false);
    }
  };

  const handleDelete = async (photo) => {
    if (!window.confirm('Xoá tấm ảnh này? Không thể hoàn tác.')) return;
    await deleteDoc(doc(db, 'photos', photo.id));
    setSelected((s) => (s?.id === photo.id ? null : s));
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <header className="mx-auto mb-8 flex max-w-5xl items-center justify-between">
        <div>
          <span className="rounded-full border-[3px] border-ink bg-pink px-4 py-1.5 font-body text-xs font-bold tracking-wide text-wine shadow-sticker-sm">
            ADMIN
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink">Ảnh kỷ niệm 💌</h1>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => signOut(auth)}
          className="flex items-center gap-2 rounded-full border-[3px] border-ink bg-cream px-5 py-2.5 font-body text-xs font-bold tracking-wide text-ink shadow-sticker-sm"
        >
          <LogOut size={16} />
          ĐĂNG XUẤT
        </motion.button>
      </header>

      <div className="mx-auto mb-8 flex max-w-5xl flex-wrap items-center justify-between gap-3 rounded-2xl border-[3px] border-ink bg-cream px-5 py-4 shadow-sticker-sm">
        <div className="flex items-center gap-2 font-body text-sm text-ink/70">
          <MapPin size={16} className="shrink-0 text-wine" />
          {pickupAnswer === undefined ? (
            <span className="text-ink/40">Đang tải điểm đón…</span>
          ) : pickupAnswer ? (
            <span>
              Điểm đón: <span className="font-bold text-ink">{pickupAnswer}</span>
            </span>
          ) : (
            <span className="text-ink/40">Chưa có điểm đón nào được gửi.</span>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleResetPickup}
          disabled={!pickupAnswer || resetting}
          className="flex items-center gap-2 rounded-full border-[3px] border-ink bg-cream px-4 py-2 font-body text-xs font-bold tracking-wide text-wine shadow-sticker-sm disabled:opacity-40"
        >
          <RotateCcw size={14} />
          {resetting ? 'ĐANG XOÁ...' : 'RESET ĐIỂM ĐÓN'}
        </motion.button>
      </div>

      <main className="mx-auto max-w-5xl">
        {photos === null && <p className="font-body text-ink/50">Đang tải…</p>}
        {photos?.length === 0 && (
          <p className="font-body text-ink/50">Chưa có ảnh nào được gửi lên.</p>
        )}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {photos?.map((photo) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative overflow-hidden rounded-2xl border-[3px] border-ink bg-cream shadow-sticker-sm"
            >
              <button
                type="button"
                onClick={() => setSelected(photo)}
                className="block aspect-square w-full"
              >
                <img
                  src={photo.imageData}
                  alt={photo.giftTitle || 'Ảnh'}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
              <div className="flex items-center justify-between gap-2 border-t-[3px] border-ink bg-cream px-2.5 py-2">
                <span className="truncate font-body text-[11px] font-bold text-ink/70">
                  {photo.giftTitle}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(photo)}
                  aria-label="Xoá ảnh"
                  className="shrink-0 text-wine/70 hover:text-wine"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-6"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-full max-w-lg flex-col overflow-hidden rounded-2xl border-[3px] border-ink bg-cream shadow-sticker"
            >
              <img src={selected.imageData} alt={selected.giftTitle} className="max-h-[70vh] w-full object-contain" />
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="font-body text-xs font-medium text-ink/60">
                  <p className="font-bold text-ink">{selected.giftTitle}</p>
                  <p>{formatDate(selected.capturedAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={selected.imageData}
                    download={`${selected.giftTitle || 'anh'}.jpg`}
                    aria-label="Tải ảnh"
                    className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-ink bg-mint text-ink"
                  >
                    <Download size={16} />
                  </a>
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
