import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Pencil, Check, X } from 'lucide-react';
import { fetchPickupLocation, savePickupLocation } from '../../utils/pickupLocation.js';

// A tiny shared "form" backed by Firestore (see utils/pickupLocation.js) —
// whoever answers first, both people see the same saved answer afterward
// from any device, just by opening the live site. Either person can also
// clear it back to blank (e.g. to redo it), not just overwrite it.
export default function PickupLocationBox() {
  // undefined = still loading, null = the read failed, '' = no answer yet,
  // otherwise the saved answer itself.
  const [savedAnswer, setSavedAnswer] = useState(undefined);
  const [draft, setDraft] = useState('');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchPickupLocation().then((answer) => {
      if (cancelled) return;
      setSavedAnswer(answer);
      if (answer) setDraft(answer);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed || saving) return;
    setSaving(true);
    setSaveError(false);
    try {
      await savePickupLocation(trimmed);
      setSavedAnswer(trimmed);
      setEditing(false);
    } catch (err) {
      console.warn('Save pickup location failed:', err);
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  };

  const handleClear = async () => {
    if (clearing || !window.confirm('Xoá điểm đón này để nhập lại từ đầu nhé?')) return;
    setClearing(true);
    try {
      await savePickupLocation('');
      setSavedAnswer('');
      setDraft('');
    } catch (err) {
      console.warn('Clear pickup location failed:', err);
      window.alert('Xoá chưa được, thử lại giúp em nhé 🙏');
    } finally {
      setClearing(false);
    }
  };

  if (savedAnswer === undefined) {
    return <p className="font-body text-xs font-medium text-ink/40">Đang tải...</p>;
  }

  const showForm = editing || !savedAnswer;

  if (!showForm) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-xs flex-col items-center gap-2 rounded-2xl border-[3px] border-ink bg-mint/40 px-5 py-4"
      >
        <span className="flex items-center gap-1.5 font-body text-[11px] font-bold tracking-wide text-ink/60">
          <Check size={13} /> ĐIỂM ĐÓN ĐÃ GỬI
        </span>
        <p className="font-display text-base font-bold text-ink">{savedAnswer}</p>
        <div className="mt-1 flex items-center gap-4">
          <button
            type="button"
            onClick={() => {
              setDraft(savedAnswer);
              setEditing(true);
            }}
            className="flex items-center gap-1 font-body text-xs font-bold text-wine/70"
          >
            <Pencil size={12} /> Sửa lại
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={clearing}
            className="flex items-center gap-1 font-body text-xs font-bold text-ink/40 disabled:opacity-50"
          >
            <X size={12} /> {clearing ? 'Đang xoá...' : 'Xoá'}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xs flex-col items-center gap-3">
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Điểm đón (VD: chung cư ABC, 12 Nguyễn Văn A...)"
        maxLength={200}
        className="w-full rounded-xl border-[3px] border-ink bg-cream px-4 py-3 text-center font-body text-sm font-bold text-ink outline-none transition-colors focus:bg-pink/20"
      />
      <motion.button
        type="submit"
        disabled={saving || !draft.trim()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94, y: 4 }}
        className="flex min-h-[48px] items-center gap-2 rounded-full border-[3px] border-ink bg-wine px-7 font-display text-sm font-bold text-cream shadow-sticker disabled:opacity-50"
      >
        {saving ? 'Đang gửi...' : 'Gửi điểm đón'}
        {!saving && <Send size={15} />}
      </motion.button>
      {saveError && (
        <p className="font-body text-xs font-bold text-wine">
          Gửi chưa được, chị thử lại giúp em nhé 🙏
        </p>
      )}
      {savedAnswer === null && !saveError && (
        <p className="font-body text-xs font-medium text-ink/40">
          (Không kiểm tra được câu trả lời cũ, nhưng vẫn gửi mới được bình thường)
        </p>
      )}
    </form>
  );
}
