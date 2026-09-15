import { useState } from 'react';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase.js';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | checking | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('checking');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col items-center gap-5 rounded-sticker border-[3px] border-ink bg-cream p-8 text-center shadow-sticker"
      >
        <span className="rounded-full border-[3px] border-ink bg-pink px-4 py-1.5 font-body text-xs font-bold tracking-wide text-wine shadow-sticker-sm">
          ADMIN
        </span>
        <h1 className="font-display text-2xl font-bold text-ink">Đăng nhập quản trị</h1>

        <input
          type="email"
          required
          autoComplete="username"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border-[3px] border-ink bg-white px-4 py-3 font-body text-sm font-medium text-ink outline-none focus:bg-pink/10"
        />
        <input
          type="password"
          required
          autoComplete="current-password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border-[3px] border-ink bg-white px-4 py-3 font-body text-sm font-medium text-ink outline-none focus:bg-pink/10"
        />

        {status === 'error' && (
          <p className="font-body text-xs font-bold tracking-wide text-wine">
            SAI EMAIL HOẶC MẬT KHẨU RỒI 🧐
          </p>
        )}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          disabled={status === 'checking'}
          className="min-h-[52px] w-full rounded-full border-[3px] border-ink bg-wine font-display text-base font-bold text-cream shadow-sticker disabled:opacity-60"
        >
          {status === 'checking' ? 'ĐANG ĐĂNG NHẬP…' : 'ĐĂNG NHẬP'}
        </motion.button>
      </motion.form>
    </div>
  );
}
