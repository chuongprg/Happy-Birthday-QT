import { AnimatePresence, motion } from 'framer-motion';
import { GIFT_STEPS } from '../../hooks/useQuestState.js';
import { PhotoCaptureStep, PhotoPreviewStep } from './PhotoCapture.jsx';
import CodeInput from './CodeInput.jsx';
import UnlockAnimation from './UnlockAnimation.jsx';
import GlowBackground from '../UI/GlowBackground.jsx';
import QuestProgress from './QuestProgress.jsx';
import CloseButton from '../UI/CloseButton.jsx';
import BackButton from '../UI/BackButton.jsx';

const fade = {
  initial: { opacity: 0, y: 16, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -16, scale: 0.97 },
  transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
};

export default function GiftFlow({
  gift,
  step,
  photo,
  giftCount,
  currentGiftIndex,
  completedGifts,
  actions,
}) {
  const renderStep = () => {
    switch (step) {
      case GIFT_STEPS.INTRO:
        return (
          <motion.div key="intro" {...fade} className="flex flex-col items-center gap-7 text-center">
            <span className="rounded-full border-[3px] border-ink bg-pink px-4 py-1.5 font-body text-xs font-bold tracking-wide text-wine shadow-sticker-sm">
              {gift.title}
              {gift.subtitle ? ` — ${gift.subtitle}` : ''}
            </span>
            <span className="text-6xl">{gift.emoji}</span>
            <p className="whitespace-preline max-w-sm font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">
              {gift.flavorText}
            </p>
            <motion.button
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.94, y: 4 }}
              onClick={actions.beginMission}
              className="min-h-[56px] rounded-full border-[3px] border-ink bg-wine px-10 font-display text-base font-bold text-cream shadow-sticker"
            >
              MỞ {gift.title.toUpperCase()}
            </motion.button>
          </motion.div>
        );

      case GIFT_STEPS.PHOTO:
        return (
          <motion.div key="photo" {...fade}>
            <PhotoCaptureStep onCaptured={actions.capturePhoto} />
          </motion.div>
        );

      case GIFT_STEPS.PREVIEW:
        return (
          <motion.div key="preview" {...fade}>
            <PhotoPreviewStep
              photo={photo?.url}
              onRetake={actions.retakePhoto}
              onConfirm={actions.confirmPhoto}
            />
          </motion.div>
        );

      case GIFT_STEPS.CODE:
        return (
          <motion.div key="code" {...fade}>
            <CodeInput onSubmit={actions.submitCode} codeLength={gift.code.length} />
          </motion.div>
        );

      case GIFT_STEPS.UNLOCKED:
        return (
          <motion.div key="unlocked" {...fade}>
            <UnlockAnimation gift={gift} onContinue={actions.advanceGift} />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-cream px-6 py-24"
    >
      <GlowBackground variant="pastel" />
      <QuestProgress
        current={currentGiftIndex}
        total={giftCount}
        completedGifts={completedGifts}
      />

      {step !== GIFT_STEPS.UNLOCKED && (
        <CloseButton
          onClick={actions.closeOverlay}
          label="Quay lại bộ sưu tập"
          className="fixed right-5 top-5 z-40"
        />
      )}

      {(step === GIFT_STEPS.PHOTO || step === GIFT_STEPS.PREVIEW || step === GIFT_STEPS.CODE) && (
        <BackButton
          onClick={actions.goBackStep}
          label="Quay lại bước trước"
          className="fixed left-5 top-5 z-40"
        />
      )}

      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </div>
    </motion.div>
  );
}
