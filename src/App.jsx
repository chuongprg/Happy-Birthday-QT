import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Opening from './components/Opening/Opening.jsx';
import DinnerTransport from './components/Opening/DinnerTransport.jsx';
import DinnerAmbience from './components/Opening/DinnerAmbience.jsx';
import BirthdayMessage from './components/BirthdayMessage/BirthdayMessage.jsx';
import MemoryGallery from './components/MemoryGallery/MemoryGallery.jsx';
import EventTimeline from './components/EventTimeline/EventTimeline.jsx';
import QuestIntro from './components/Quest/QuestIntro.jsx';
import QuestExperience from './components/Quest/QuestExperience.jsx';
import FinaleExperience from './components/FinalReveal/FinaleExperience.jsx';
import SideNav from './components/UI/SideNav.jsx';
import FloatingStickers from './components/UI/FloatingStickers.jsx';
import MusicPlayer from './components/UI/MusicPlayer.jsx';
import LoadingScreen from './components/UI/LoadingScreen.jsx';
import { useQuestState } from './hooks/useQuestState.js';
import { useMusicPlayer } from './hooks/useMusicPlayer.js';
import { getContentMode } from './utils/birthdayGate.js';

const ENVELOPE_KEY = 'birthday-envelope-opened-v1';

export default function App() {
  const [booting, setBooting] = useState(true);
  const { state, actions, giftCount } = useQuestState();
  const player = useMusicPlayer();
  // 'full' unlocks the whole story; 'dinner' (the one-off dinner-plan-moved
  // day) and 'locked' (any other day before the birthday) both keep the
  // story sections below hidden — see utils/birthdayGate.js.
  const contentMode = getContentMode();
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(() => {
    try {
      return window.sessionStorage.getItem(ENVELOPE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 1000);
    return () => clearTimeout(t);
  }, []);

  // The rest of the story stays locked (no scrolling past the invitation)
  // until it's actually been opened — you enter the story, you don't skip it.
  // `overflow: hidden` alone doesn't stop touch-scrolling on mobile Safari/
  // Chrome, so we pin the body with `position: fixed` too — the same trick
  // most modal scroll-locks use. The lock only ever engages at scrollY 0
  // (right after load), so there's no scroll position to restore on unlock.
  useEffect(() => {
    const shouldLock = state.appMode === 'story' && !hasOpenedEnvelope;
    if (shouldLock) {
      document.body.style.position = 'fixed';
      document.body.style.inset = '0';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overscrollBehavior = 'none';
    } else {
      document.body.style.position = '';
      document.body.style.inset = '';
      document.body.style.overflow = '';
      document.documentElement.style.overscrollBehavior = '';
    }
    return () => {
      document.body.style.position = '';
      document.body.style.inset = '';
      document.body.style.overflow = '';
      document.documentElement.style.overscrollBehavior = '';
    };
  }, [state.appMode, hasOpenedEnvelope]);

  const handleEnvelopeOpen = () => {
    setHasOpenedEnvelope(true);
    try {
      window.sessionStorage.setItem(ENVELOPE_KEY, 'true');
    } catch {
      // sessionStorage unavailable — the gate just re-locks on reload, harmless
    }
  };

  // The dedicated intro theme (playlist track 0) starts right as the photo
  // montage begins — not at the envelope click — so its ~44s runs exactly
  // alongside the montage/age-reveal/celebration sequence. Also used to
  // restart the theme when the intro is replayed from the Hero screen.
  const handleMontageStart = () => {
    player.playFromStart(0);
  };

  // 'dinner'/'locked' modes skip the whole timed cinematic, so they just
  // start the regular background playlist instead of the dedicated theme.
  const handlePlainMusicStart = () => {
    player.play();
  };

  const hideStickers = state.appMode === 'finale' && state.finaleStep === 'video';

  return (
    <>
      {!hideStickers && <FloatingStickers />}
      {hasOpenedEnvelope && contentMode === 'dinner' && <DinnerAmbience />}

      <AnimatePresence>{booting && <LoadingScreen key="loading" />}</AnimatePresence>

      {!booting && (
        <>
          {state.appMode === 'story' && (
            <SideNav unlocked={hasOpenedEnvelope && contentMode === 'full'} />
          )}

          {state.appMode === 'story' && (
            <main>
              <Opening
                onEnvelopeOpen={handleEnvelopeOpen}
                onMontageStart={handleMontageStart}
                onPlainMusicStart={handlePlainMusicStart}
                contentMode={contentMode}
              />
              {hasOpenedEnvelope && contentMode === 'full' && (
                <>
                  <BirthdayMessage />
                  <MemoryGallery />
                  <EventTimeline appMode={state.appMode} questCompleted={state.questCompleted} />
                  <QuestIntro onStart={actions.startQuest} />
                </>
              )}
              {hasOpenedEnvelope && contentMode === 'dinner' && <DinnerTransport />}
            </main>
          )}

          {state.appMode === 'quest' && (
            <QuestExperience
              questState={state}
              actions={actions}
              giftCount={giftCount}
              onContinueToFinale={actions.startFinale}
            />
          )}

          {state.appMode === 'finale' && (
            <FinaleExperience
              finaleStep={state.finaleStep}
              setFinaleStep={actions.setFinaleStep}
              giftPhotos={state.giftPhotos}
            />
          )}

          <MusicPlayer player={player} />
        </>
      )}
    </>
  );
}
