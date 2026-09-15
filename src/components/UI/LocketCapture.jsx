import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, RotateCcw, Check, SwitchCamera } from 'lucide-react';
import { uploadLocketPhoto } from '../../utils/locketPhotos.js';

// Live camera capture, Locket-style: front camera by default, snap a frame
// to a canvas (no file-picker roundtrip like the gift-quest's PhotoCapture),
// retake-or-save before it uploads.
export default function LocketCapture({ onSaved }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [facingMode, setFacingMode] = useState('user');
  const [captured, setCaptured] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    streamRef.current?.getTracks().forEach((t) => t.stop());

    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode }, audio: false })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => setError('camera-denied'));

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [facingMode]);

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const maxSide = 900;
    const scale = Math.min(1, maxSide / Math.max(video.videoWidth, video.videoHeight));
    const w = Math.round(video.videoWidth * scale);
    const h = Math.round(video.videoHeight * scale);
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    // The front camera preview is mirrored on screen (like every selfie
    // camera), but the raw video frame isn't — mirror it back so the saved
    // photo matches what was actually seen while capturing.
    if (facingMode === 'user') {
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, w, h);
    setCaptured(canvas.toDataURL('image/jpeg', 0.85));
  };

  const handleSave = async () => {
    if (!captured || saving) return;
    setSaving(true);
    setError(null);
    try {
      await uploadLocketPhoto(captured);
      setCaptured(null);
      onSaved?.();
    } catch (err) {
      console.warn('Save locket photo failed:', err);
      setError('save-failed');
    } finally {
      setSaving(false);
    }
  };

  if (error === 'camera-denied') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="text-4xl">🔒</span>
        <p className="font-body text-sm font-semibold text-ink/60">
          Chưa mở được camera — hãy cho phép trình duyệt truy cập camera trong phần cài đặt rồi thử
          lại nhé.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-4">
      <div className="relative aspect-[3/4] w-full max-w-xs overflow-hidden rounded-3xl border-[3px] border-ink bg-ink shadow-sticker">
        {captured ? (
          <img src={captured} alt="" className="h-full w-full object-cover" />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`h-full w-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
          />
        )}
      </div>

      {error === 'save-failed' && (
        <p className="font-body text-xs font-bold text-wine">Lưu chưa được, thử lại nhé.</p>
      )}

      {captured ? (
        <div className="flex items-center gap-4">
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => setCaptured(null)}
            disabled={saving}
            className="flex items-center gap-2 rounded-full border-[3px] border-ink bg-cream px-5 py-3 font-display text-sm font-bold text-ink shadow-sticker-sm disabled:opacity-50"
          >
            <RotateCcw size={16} /> Chụp lại
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-full border-[3px] border-ink bg-wine px-6 py-3 font-display text-sm font-bold text-cream shadow-sticker disabled:opacity-60"
          >
            <Check size={16} /> {saving ? 'Đang lưu...' : 'Lưu ảnh'}
          </motion.button>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setFacingMode((m) => (m === 'user' ? 'environment' : 'user'))}
            aria-label="Đổi camera"
            className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-ink bg-cream text-ink shadow-sticker-sm"
          >
            <SwitchCamera size={18} />
          </button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={handleCapture}
            aria-label="Chụp ảnh"
            className="flex h-16 w-16 items-center justify-center rounded-full border-[4px] border-ink bg-wine text-cream shadow-sticker"
          >
            <Camera size={26} />
          </motion.button>
          <div className="h-11 w-11" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
