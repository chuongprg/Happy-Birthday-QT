import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, RotateCcw, Check } from 'lucide-react';
import { resizeImageFile } from '../../utils/resizeImage.js';

export function PhotoCaptureStep({ onCaptured }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const dataUrl = await resizeImageFile(file);
      onCaptured(dataUrl);
    } finally {
      setBusy(false);
      e.target.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center gap-7 text-center">
      <span className="rounded-full border-[3px] border-ink bg-mint px-4 py-1.5 font-body text-xs font-bold tracking-wide text-ink shadow-sticker-sm">
        BƯỚC 01
      </span>
      <h3 className="font-display text-3xl font-bold text-ink">CHỤP LẠI KHOẢNH KHẮC 📸</h3>
      <p className="max-w-xs font-body text-sm font-medium leading-relaxed text-ink/60">
        Mở món quà ra rồi chụp một tấm hình lưu lại nhé!
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFile}
        className="hidden"
      />

      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94, y: 4 }}
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        className="flex min-h-[56px] items-center gap-3 rounded-full border-[3px] border-ink bg-wine px-8 font-display text-base font-bold text-cream shadow-sticker disabled:opacity-60"
      >
        <Camera size={18} />
        {busy ? 'ĐANG XỬ LÝ…' : 'CHỤP HOẶC TẢI ẢNH LÊN'}
      </motion.button>
    </div>
  );
}

export function PhotoPreviewStep({ photo, onRetake, onConfirm }) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <span className="rounded-full border-[3px] border-ink bg-green px-4 py-1.5 font-body text-xs font-bold tracking-wide text-ink shadow-sticker-sm">
        KỶ NIỆM CỦA EM
      </span>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
        animate={{ opacity: 1, scale: 1, rotate: -2 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-60 rounded-2xl border-[3px] border-ink bg-cream p-2.5 pb-6 shadow-sticker"
      >
        <img
          src={photo}
          alt="Ảnh món quà"
          className="aspect-square w-full rounded-lg border-2 border-ink/10 object-cover"
        />
      </motion.div>

      <div className="flex items-center gap-4">
        <motion.button
          type="button"
          whileTap={{ scale: 0.94, y: 3 }}
          onClick={onRetake}
          className="flex min-h-[48px] items-center gap-2 rounded-full border-[3px] border-ink bg-cream px-6 font-body text-xs font-bold tracking-wide text-ink shadow-sticker-sm"
        >
          <RotateCcw size={16} />
          CHỤP LẠI
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.94, y: 3 }}
          onClick={onConfirm}
          className="flex min-h-[48px] items-center gap-2 rounded-full border-[3px] border-ink bg-mint px-6 font-body text-xs font-bold tracking-wide text-ink shadow-sticker-sm"
        >
          <Check size={16} />
          GIỮ TẤM NÀY
        </motion.button>
      </div>
    </div>
  );
}
