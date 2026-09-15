import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PhotoSticker from '../UI/PhotoSticker.jsx';
import { stickerPack } from '../../data/stickerPack.js';

export default function CodeInput({ onSubmit, codeLength = 6 }) {
  const [chars, setChars] = useState(() => Array(codeLength).fill(''));
  const [status, setStatus] = useState('idle'); // idle | checking | error
  const inputsRef = useRef([]);

  const focusIndex = (i) => {
    inputsRef.current[i]?.focus();
  };

  const handleChange = (i, value) => {
    const char = value.slice(-1).toUpperCase();
    if (status === 'error') setStatus('idle');
    setChars((prev) => {
      const next = [...prev];
      next[i] = char;
      return next;
    });
    if (char && i < codeLength - 1) focusIndex(i + 1);
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !chars[i] && i > 0) {
      focusIndex(i - 1);
    }
    if (e.key === 'Enter') attemptSubmit();
  };

  const attemptSubmit = async () => {
    const code = chars.join('');
    if (code.length < codeLength || status === 'checking') return;
    setStatus('checking');
    const result = await onSubmit(code);
    if (result === 'incorrect') {
      setStatus('error');
    } else {
      setStatus('idle');
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-7 text-center">
      <PhotoSticker
        sticker={stickerPack.thinking}
        className="-top-4 right-0 sm:-right-10"
        size={78}
        rotate={9}
      />
      <span className="rounded-full border-[3px] border-ink bg-pink px-4 py-1.5 font-body text-xs font-bold tracking-wide text-wine shadow-sticker-sm">
        BƯỚC 02
      </span>
      <h3 className="font-display text-3xl font-bold text-ink">TÌM MÃ BÍ MẬT 🔍</h3>
      <p className="max-w-xs font-body text-sm font-medium leading-relaxed text-ink/60">
        Trong món quà có giấu một mã nhỏ.
        <br />
        Tìm nó và nhập vào đây nhé!
      </p>

      <motion.div
        animate={status === 'error' ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="flex max-w-sm flex-wrap justify-center gap-2 sm:gap-3"
      >
        {chars.map((char, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            value={char}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            inputMode="text"
            maxLength={1}
            aria-label={`Ký tự mã ${i + 1}`}
            className={`h-12 w-9 rounded-xl border-[3px] bg-cream text-center font-display text-xl font-bold text-ink outline-none transition-colors sm:h-14 sm:w-11 ${
              status === 'error' ? 'border-wine text-wine' : 'border-ink focus:bg-pink/30'
            }`}
          />
        ))}
      </motion.div>

      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-body text-xs font-bold tracking-wide text-wine"
        >
          CHƯA ĐÚNG RỒI... TÌM LẠI XEM NÀO! 🧐
        </motion.p>
      )}

      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94, y: 4 }}
        disabled={status === 'checking'}
        onClick={attemptSubmit}
        className="min-h-[56px] rounded-full border-[3px] border-ink bg-wine px-10 font-display text-base font-bold text-cream shadow-sticker disabled:opacity-60"
      >
        MỞ KHOÁ
      </motion.button>
    </div>
  );
}
