import { AnimatePresence } from 'framer-motion';
import { gifts } from '../../data/gifts.js';
import GiftMap from './GiftMap.jsx';
import GiftFlow from './GiftFlow.jsx';
import MissionComplete from './MissionComplete.jsx';

export default function QuestExperience({ questState, actions, giftCount, onContinueToFinale }) {
  const { currentGiftIndex, giftStep, overlayOpen, completedGifts, giftPhotos, questCompleted } =
    questState;
  const currentGift = gifts[currentGiftIndex];

  return (
    <div className="relative">
      <GiftMap
        currentGiftIndex={currentGiftIndex}
        completedGifts={completedGifts}
        onOpenGift={actions.openGiftOverlay}
        onExit={actions.exitToStory}
      />

      <AnimatePresence>
        {overlayOpen && !questCompleted && (
          <GiftFlow
            gift={currentGift}
            step={giftStep}
            photo={giftPhotos[currentGiftIndex]}
            giftCount={giftCount}
            currentGiftIndex={currentGiftIndex}
            completedGifts={completedGifts}
            actions={actions}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {questCompleted && (
          <MissionComplete giftCount={giftCount} onContinue={onContinueToFinale} />
        )}
      </AnimatePresence>
    </div>
  );
}
