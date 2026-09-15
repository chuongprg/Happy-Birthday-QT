import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { playlist } from '../data/playlist.js';
import {
  subscribeYoutubeTracks,
  addYoutubeTrack as addYoutubeTrackDoc,
  removeYoutubeTrack as removeYoutubeTrackDoc,
} from '../utils/youtubeTracks.js';

// Loads the YouTube IFrame Player API once (it calls a single global
// callback when ready, so a second call anywhere just piggybacks on the
// first script tag instead of injecting it twice).
let ytApiPromise = null;
function loadYoutubeIframeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve) => {
    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prevCallback?.();
      resolve(window.YT);
    };
    if (!document.getElementById('youtube-iframe-api')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
  });
  return ytApiPromise;
}

const REPEAT_MODES = ['off', 'all', 'one'];

export function useMusicPlayer() {
  const audioRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const ytReadyRef = useRef(false);
  const ytContainerRef = useRef(null);

  const [youtubeTracks, setYoutubeTracks] = useState([]);
  const [currentKey, setCurrentKey] = useState('local:/audio/intro-theme.mp3');
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off' | 'all' | 'one'
  const [shuffle, setShuffle] = useState(false);
  const [addStatus, setAddStatus] = useState('idle'); // 'idle' | 'adding' | 'error'
  const skipGuard = useRef(0);

  // Local mp3s first, then whatever's been added from YouTube — each track
  // gets a stable `key` so playback survives the list changing shape (e.g.
  // someone else deletes a YouTube track while it's mid-playlist here).
  const tracks = useMemo(
    () => [
      ...playlist.map((t) => ({ ...t, type: 'local', key: `local:${t.src}` })),
      ...youtubeTracks.map((t) => ({ ...t, type: 'youtube', artist: 'YouTube', key: `youtube:${t.id}` })),
    ],
    [youtubeTracks]
  );

  const currentIndex = Math.max(
    0,
    tracks.findIndex((t) => t.key === currentKey)
  );
  const current = tracks[currentIndex];

  useEffect(() => subscribeYoutubeTracks(setYoutubeTracks), []);

  // --- local <audio> element -------------------------------------------------
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audioRef.current = audio;

    audio.addEventListener('ended', () => handleTrackEndedRef.current());
    audio.addEventListener('error', () => handleTrackErrorRef.current());
    return () => {
      audio.pause();
    };
  }, []);

  // --- hidden YouTube iframe player -------------------------------------------
  useEffect(() => {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '2px';
    container.style.height = '2px';
    document.body.appendChild(container);
    ytContainerRef.current = container;

    let cancelled = false;
    loadYoutubeIframeApi().then((YT) => {
      if (cancelled) return;
      ytPlayerRef.current = new YT.Player(container, {
        width: '2',
        height: '2',
        events: {
          onReady: () => {
            ytReadyRef.current = true;
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.ENDED) handleTrackEndedRef.current();
          },
          onError: () => handleTrackErrorRef.current(),
        },
      });
    });

    return () => {
      cancelled = true;
      ytPlayerRef.current?.destroy?.();
      container.remove();
    };
  }, []);

  // Switches the underlying player (audio element vs. YouTube iframe) to
  // whichever the current track needs, pausing the other one.
  useEffect(() => {
    const audio = audioRef.current;
    const yt = ytPlayerRef.current;
    if (!audio || !current) return;

    if (current.type === 'local') {
      yt?.pauseVideo?.();
      audio.src = current.src;
      if (isPlaying) audio.play().catch(() => {});
    } else if (ytReadyRef.current && yt) {
      audio.pause();
      yt.loadVideoById(current.videoId);
      if (!isPlaying) {
        // loadVideoById always starts playing — stop immediately if the
        // player was paused when the track changed (e.g. picked from the list).
        setTimeout(() => yt.pauseVideo?.(), 300);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentKey]);

  const goRelative = useCallback(
    (direction) => {
      const total = tracks.length;
      if (total === 0) return;
      let nextIdx;
      if (shuffle && total > 1) {
        do {
          nextIdx = Math.floor(Math.random() * total);
        } while (nextIdx === currentIndex);
      } else {
        nextIdx = (currentIndex + direction + total) % total;
      }
      skipGuard.current = 0;
      setCurrentKey(tracks[nextIdx].key);
      setIsPlaying(true);
    },
    [tracks, currentIndex, shuffle]
  );

  const replayCurrent = useCallback(() => {
    const audio = audioRef.current;
    const yt = ytPlayerRef.current;
    if (current?.type === 'local' && audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } else if (current?.type === 'youtube' && yt) {
      yt.seekTo(0, true);
      yt.playVideo();
    }
    setIsPlaying(true);
  }, [current]);

  const handleTrackEnded = useCallback(() => {
    if (repeatMode === 'one') {
      replayCurrent();
      return;
    }
    const atEnd = !shuffle && currentIndex === tracks.length - 1;
    if (repeatMode === 'off' && atEnd) {
      setIsPlaying(false);
      return;
    }
    goRelative(1);
  }, [repeatMode, shuffle, currentIndex, tracks.length, goRelative, replayCurrent]);

  const handleTrackError = useCallback(() => {
    // Missing/broken track — try the next one, but bail after a full lap so
    // a playlist with no working entries doesn't spin forever.
    skipGuard.current += 1;
    if (skipGuard.current < Math.max(tracks.length, 1)) {
      goRelative(1);
    } else {
      setIsPlaying(false);
    }
  }, [goRelative, tracks.length]);

  // Both the <audio> element and the YT player are created once, outside
  // React's render cycle, so their event handlers close over stale
  // versions of these callbacks unless routed through a ref.
  const handleTrackEndedRef = useRef(handleTrackEnded);
  handleTrackEndedRef.current = handleTrackEnded;
  const handleTrackErrorRef = useRef(handleTrackError);
  handleTrackErrorRef.current = handleTrackError;

  const play = useCallback(() => {
    skipGuard.current = 0;
    if (current?.type === 'youtube') {
      ytPlayerRef.current?.playVideo?.();
    } else {
      audioRef.current?.play().catch(() => {});
    }
    setIsPlaying(true);
  }, [current]);

  const pause = useCallback(() => {
    if (current?.type === 'youtube') {
      ytPlayerRef.current?.pauseVideo?.();
    } else {
      audioRef.current?.pause();
    }
    setIsPlaying(false);
  }, [current]);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, pause, play]);

  // Jumps to a track and plays it from time 0 — unlike selectTrack, this
  // also rewinds when it's already the current track, so replaying the
  // intro theme (track 0) restarts it instead of doing nothing.
  const playFromStart = useCallback(
    (i = 0) => {
      const target = tracks[i];
      if (!target) return;
      skipGuard.current = 0;
      if (target.key === currentKey) {
        replayCurrent();
      } else {
        setCurrentKey(target.key);
        setIsPlaying(true);
      }
    },
    [tracks, currentKey, replayCurrent]
  );

  const next = useCallback(() => goRelative(1), [goRelative]);
  const prev = useCallback(() => goRelative(-1), [goRelative]);

  const selectTrack = useCallback(
    (i) => {
      const target = tracks[i];
      if (!target) return;
      skipGuard.current = 0;
      setCurrentKey(target.key);
      setIsPlaying(true);
    },
    [tracks]
  );

  const toggleExpanded = useCallback(() => setExpanded((e) => !e), []);

  const toggleRepeat = useCallback(() => {
    setRepeatMode((m) => REPEAT_MODES[(REPEAT_MODES.indexOf(m) + 1) % REPEAT_MODES.length]);
  }, []);

  const toggleShuffle = useCallback(() => setShuffle((s) => !s), []);

  const addYoutubeTrack = useCallback(async (url) => {
    setAddStatus('adding');
    try {
      await addYoutubeTrackDoc(url);
      setAddStatus('idle');
      return true;
    } catch (err) {
      console.warn('Add YouTube track failed:', err);
      setAddStatus('error');
      return false;
    }
  }, []);

  const removeYoutubeTrack = useCallback(
    async (id) => {
      try {
        await removeYoutubeTrackDoc(id);
      } catch (err) {
        console.warn('Remove YouTube track failed:', err);
      }
    },
    []
  );

  return {
    tracks,
    currentIndex,
    isPlaying,
    expanded,
    repeatMode,
    shuffle,
    addStatus,
    play,
    pause,
    toggle,
    playFromStart,
    next,
    prev,
    selectTrack,
    toggleExpanded,
    toggleRepeat,
    toggleShuffle,
    addYoutubeTrack,
    removeYoutubeTrack,
  };
}
