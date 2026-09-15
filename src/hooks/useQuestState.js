import { useCallback, useEffect, useRef, useState } from 'react';
import { gifts, giftsConfig } from '../data/gifts.js';
import { uploadCapturedPhoto } from '../utils/uploadPhoto.js';

const STORAGE_KEY = 'birthday-quest-state-v2';
const GIFT_COUNT = gifts.length;

export const GIFT_STEPS = {
  INTRO: 'intro',
  PHOTO: 'photo',
  PREVIEW: 'preview',
  CODE: 'code',
  UNLOCKED: 'unlocked',
};

function defaultState() {
  return {
    appMode: 'story', // 'story' | 'quest' | 'finale'
    currentGiftIndex: 0,
    giftStep: GIFT_STEPS.INTRO,
    overlayOpen: false,
    completedGifts: Array(GIFT_COUNT).fill(false),
    giftPhotos: Array(GIFT_COUNT).fill(null),
    questCompleted: false,
    finaleStep: 'celebrate', // 'celebrate' | 'video' | 'message' | 'wall'
  };
}

function loadState() {
  if (typeof window === 'undefined') return defaultState();
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const base = defaultState();
    return { ...base, ...parsed };
  } catch {
    return defaultState();
  }
}

// Every screen-level state change below lands on the browser's history
// stack, so the browser's own Back/Forward buttons (and swipe gestures)
// step through the app's screens instead of leaving the page or doing
// nothing. Pushing happens in an effect (after the state actually commits)
// rather than inside the setState updater, so it can't double-fire under
// React StrictMode's dev-mode double-invoke.
export function useQuestState() {
  const [state, setState] = useState(loadState);
  const skipNextPushRef = useRef(true); // true = the *next* commit shouldn't push (mount, or a popstate restore)
  const stateRef = useRef(state);
  stateRef.current = state; // always the latest state, readable outside setState updaters (which StrictMode double-invokes)

  // Reload-survival copy — unrelated to browser history.
  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // sessionStorage unavailable (private mode / quota) — progress just won't persist
    }
  }, [state]);

  // Sync the *current* history entry with whatever state we booted with
  // (e.g. restored after a reload), without adding a new entry.
  useEffect(() => {
    try {
      window.history.replaceState(state, '');
    } catch {
      // history API unavailable — app still works, just without back/forward
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Push a new entry for every *other* committed state change.
  useEffect(() => {
    if (skipNextPushRef.current) {
      skipNextPushRef.current = false;
      return;
    }
    try {
      window.history.pushState(state, '');
    } catch {
      // ignore — history API unavailable
    }
  }, [state]);

  useEffect(() => {
    const onPopState = (e) => {
      if (!e.state) return;
      skipNextPushRef.current = true; // restoring shouldn't itself push a new entry
      setState(e.state);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const startQuest = useCallback(() => {
    setState((s) => ({ ...s, appMode: 'quest' }));
  }, []);

  // An explicit, always-visible way back to the main site from anywhere in
  // the Gift Quest — progress is untouched, so resuming later picks up
  // right where they left off.
  const exitToStory = useCallback(() => {
    setState((s) => ({ ...s, appMode: 'story', overlayOpen: false }));
  }, []);

  const openGiftOverlay = useCallback((index) => {
    setState((s) => {
      if (giftsConfig.requireInOrder && index !== s.currentGiftIndex) return s;
      if (!giftsConfig.requireInOrder && s.completedGifts[index]) return s;
      return { ...s, currentGiftIndex: index, giftStep: GIFT_STEPS.INTRO, overlayOpen: true };
    });
  }, []);

  const beginMission = useCallback(() => {
    setState((s) => ({ ...s, giftStep: GIFT_STEPS.PHOTO }));
  }, []);

  const closeOverlay = useCallback(() => {
    setState((s) => ({ ...s, overlayOpen: false }));
  }, []);

  const capturePhoto = useCallback((dataUrl) => {
    const giftIndex = stateRef.current.currentGiftIndex;
    uploadCapturedPhoto(dataUrl, { giftIndex, giftTitle: gifts[giftIndex].title });
    setState((s) => {
      const photos = [...s.giftPhotos];
      photos[s.currentGiftIndex] = { url: dataUrl, capturedAt: new Date().toISOString() };
      return { ...s, giftPhotos: photos, giftStep: GIFT_STEPS.PREVIEW };
    });
  }, []);

  const retakePhoto = useCallback(() => {
    setState((s) => ({ ...s, giftStep: GIFT_STEPS.PHOTO }));
  }, []);

  const confirmPhoto = useCallback(() => {
    setState((s) => ({ ...s, giftStep: GIFT_STEPS.CODE }));
  }, []);

  // Steps back one screen within the current gift's flow (not a full exit —
  // see `closeOverlay` / `exitToStory` for that). No-op from INTRO or UNLOCKED.
  const goBackStep = useCallback(() => {
    setState((s) => {
      const prevStep = {
        [GIFT_STEPS.PHOTO]: GIFT_STEPS.INTRO,
        [GIFT_STEPS.PREVIEW]: GIFT_STEPS.PHOTO,
        [GIFT_STEPS.CODE]: GIFT_STEPS.PREVIEW,
      }[s.giftStep];
      return prevStep ? { ...s, giftStep: prevStep } : s;
    });
  }, []);

  const submitCode = useCallback((code) => {
    let result = 'idle';
    setState((s) => {
      const gift = gifts[s.currentGiftIndex];
      const isCorrect = code.trim().toUpperCase() === gift.code.toUpperCase();
      if (!isCorrect) {
        result = 'incorrect';
        return s;
      }
      result = 'correct';
      const completed = [...s.completedGifts];
      completed[s.currentGiftIndex] = true;
      return { ...s, completedGifts: completed, giftStep: GIFT_STEPS.UNLOCKED };
    });
    return result;
  }, []);

  // Advances past the current gift. Non-final gifts return to the gift map;
  // the final gift instead flips `questCompleted` for the celebration screen.
  const advanceGift = useCallback(() => {
    setState((s) => {
      const allDone = s.completedGifts.every(Boolean);
      if (allDone) {
        return { ...s, questCompleted: true, overlayOpen: false };
      }
      const nextIndex = s.completedGifts.findIndex((done) => !done);
      return {
        ...s,
        currentGiftIndex: nextIndex === -1 ? s.currentGiftIndex : nextIndex,
        giftStep: GIFT_STEPS.INTRO,
        overlayOpen: false,
      };
    });
  }, []);

  const startFinale = useCallback(() => {
    setState((s) => ({ ...s, appMode: 'finale', finaleStep: 'celebrate' }));
  }, []);

  const setFinaleStep = useCallback((step) => {
    setState((s) => ({ ...s, finaleStep: step }));
  }, []);

  return {
    state,
    giftCount: GIFT_COUNT,
    actions: {
      startQuest,
      exitToStory,
      openGiftOverlay,
      beginMission,
      closeOverlay,
      capturePhoto,
      retakePhoto,
      confirmPhoto,
      goBackStep,
      submitCode,
      advanceGift,
      startFinale,
      setFinaleStep,
    },
  };
}
