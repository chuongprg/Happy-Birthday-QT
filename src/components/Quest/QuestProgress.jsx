export default function QuestProgress({ current, total, completedGifts }) {
  return (
    <div className="fixed left-1/2 top-5 z-40 flex -translate-x-1/2 flex-col items-center gap-2 rounded-full border-[3px] border-ink bg-cream px-5 py-2 shadow-sticker-sm">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const done = completedGifts[i];
          const isCurrent = i === current;
          return (
            <span key={i} className="text-base leading-none">
              {done ? '🎀' : isCurrent ? '🎁' : '⚪'}
            </span>
          );
        })}
      </div>
      <span className="font-body text-[10px] font-bold tracking-wide text-ink/50">
        QUÀ {current + 1} / {total}
      </span>
    </div>
  );
}
