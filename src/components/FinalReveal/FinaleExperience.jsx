import { AnimatePresence } from 'framer-motion';
import Celebrate from './Celebrate.jsx';
import FinalVideo from './FinalVideo.jsx';
import FinalMessage from './FinalMessage.jsx';
import MemoryWall from './MemoryWall.jsx';

export default function FinaleExperience({ finaleStep, setFinaleStep, giftPhotos }) {
  return (
    <div className="relative bg-cream">
      <AnimatePresence mode="wait">
        {finaleStep === 'celebrate' && (
          <Celebrate key="celebrate" onReveal={() => setFinaleStep('video')} />
        )}
        {finaleStep === 'video' && (
          <FinalVideo key="video" onEnded={() => setFinaleStep('message')} />
        )}
      </AnimatePresence>

      {finaleStep === 'message' && <FinalMessage onContinue={() => setFinaleStep('wall')} />}

      {finaleStep === 'wall' && <MemoryWall giftPhotos={giftPhotos} />}
    </div>
  );
}
