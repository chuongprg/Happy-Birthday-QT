import { motion } from 'framer-motion';
import { Users, Dices, UtensilsCrossed, Camera, Gift, Sparkles, Lock } from 'lucide-react';
import SectionHeading from '../UI/SectionHeading.jsx';
import PhotoSticker from '../UI/PhotoSticker.jsx';
import { timelineEvents } from '../../data/timeline.js';
import { stickerPack } from '../../data/stickerPack.js';
import { birthdayConfig } from '../../data/config.js';

const ICONS = { Users, Dices, UtensilsCrossed, Camera, Gift, Sparkles };
const NODE_COLORS = ['bg-pink', 'bg-mint', 'bg-green', 'bg-pink', 'bg-mint', 'bg-green'];

function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function computeStatus(event, index, events, appMode, questCompleted) {
  if (event.key === 'quest') {
    if (questCompleted) return 'COMPLETED';
    if (appMode === 'quest') return 'NOW';
  }
  if (event.key === 'finale') {
    if (appMode === 'finale') return 'NOW';
    if (!questCompleted) return 'LOCKED';
  }

  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const thisMin = timeToMinutes(event.time);
  const nextMin = events[index + 1] ? timeToMinutes(events[index + 1].time) : Infinity;

  if (nowMin >= thisMin && nowMin < nextMin) return 'NOW';
  if (nowMin >= nextMin) return 'COMPLETED';
  return 'UPCOMING';
}

const STATUS_LABEL = {
  NOW: '🔥 ĐANG DIỄN RA',
  COMPLETED: '✅ XONG RỒI',
  UPCOMING: 'SẮP TỚI',
  LOCKED: '🔒 CHƯA MỞ',
};

export default function EventTimeline({ appMode, questCompleted }) {
  return (
    <section id="section-today" className="relative w-full overflow-hidden bg-cream py-24">
      <div className="mb-14 px-6 sm:px-12">
        <SectionHeading
          chapter={birthdayConfig.story.chapters[2]}
          eyebrow="🗓️ HÔM NAY CÓ GÌ"
          title={'Đây là lịch trình\nđã chuẩn bị cho Quế Trân.'}
        />
      </div>

      <div className="relative mx-auto max-w-xl px-6 sm:px-12">
        <div className="absolute bottom-0 left-[47px] top-0 w-1 rounded-full bg-ink/10 sm:left-[47px]" />

        <div className="flex flex-col gap-8">
          {timelineEvents.map((event, i) => {
            const Icon = ICONS[event.icon] ?? Gift;
            const status = computeStatus(event, i, timelineEvents, appMode, questCompleted);
            const locked = status === 'LOCKED';
            const nodeColor = NODE_COLORS[i % NODE_COLORS.length];

            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: i * 0.05 }}
                className="relative flex items-start gap-5 sm:gap-6"
              >
                <div
                  className={`relative z-10 flex h-[64px] w-[64px] flex-shrink-0 items-center justify-center rounded-full border-[3px] border-ink shadow-sticker-sm ${
                    locked ? 'bg-ink/10' : status === 'NOW' ? 'bg-wine text-cream' : nodeColor
                  }`}
                >
                  {event.title === 'Ăn tối sinh nhật' && (
                    <PhotoSticker
                      sticker={stickerPack.hungry}
                      className="-right-5 -top-6"
                      size={52}
                      rotate={14}
                    />
                  )}
                  {locked ? <Lock size={20} className="text-ink/40" /> : <Icon size={22} className="text-ink" />}
                </div>

                <div className="flex flex-1 flex-col gap-1 pt-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-body text-xs font-bold text-wine/70">{event.time}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-body text-[9px] font-bold tracking-wide ${
                        status === 'NOW'
                          ? 'bg-wine text-cream'
                          : status === 'COMPLETED'
                          ? 'bg-green text-ink'
                          : 'bg-ink/5 text-ink/40'
                      }`}
                    >
                      {STATUS_LABEL[status]}
                    </span>
                  </div>
                  <span className="font-display text-xl font-bold text-ink">{event.title}</span>
                  <p className="max-w-xs font-body text-sm font-medium leading-relaxed text-ink/50">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
