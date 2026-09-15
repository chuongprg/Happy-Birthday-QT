import { motion } from 'framer-motion';
import GlowBackground from '../UI/GlowBackground.jsx';
import PickupLocationBox from './PickupLocationBox.jsx';

// Scrolled-to from RestaurantReveal on dinner day — see App.jsx (only
// mounted in 'dinner' content mode) and utils/birthdayGate.js.
export default function DinnerTransport() {
  return (
    <section
      id="section-dinner-transport"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center gap-5 overflow-hidden bg-cream px-6 py-20 text-center"
    >
      <GlowBackground variant="pastel" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 flex max-w-sm flex-col items-center gap-4"
      >
        <span className="rounded-full border-[3px] border-ink bg-mint px-5 py-2 font-body text-xs font-bold tracking-wide text-ink shadow-sticker-sm">
          🚗 THÔNG TIN DI CHUYỂN
        </span>

        <p className="font-body text-sm font-medium leading-relaxed text-ink/70">
          Vì thời tiết Sài Gòn dạo này hay mưa phùn bất chợt và quán hơi xa. Để buổi đi ăn được
          diễn ra suôn sẻ nhất, Chí Trường sẽ book xe để cả 2 cùng đến quán nhé ạ !
        </p>

        <p className="font-body text-sm font-medium leading-relaxed text-ink/70">
          Nếu không phiền thì chị Quế Trân có thể cung cấp điểm đón thích hợp nhất mà Chí Trường
          có thể đến được không ạ?
        </p>

        <PickupLocationBox />
      </motion.div>
    </section>
  );
}
