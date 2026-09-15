import { useCallback, useEffect, useRef, useState } from 'react';
import { playlist } from '../data/playlist.js';

export function useMusicPlayer() {
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const skipGuard = useRef(0);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audioRef.current = audio;

    const handleEnded = () => next();
    const handleError = () => {
      // Missing/broken track — try the next one, but bail after a full lap
      // so a playlist with no real files doesn't spin forever.
      skipGuard.current += 1;
      if (skipGuard.current < playlist.length) {
        next();
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playlist[currentIndex]) return;
    audio.src = playlist[currentIndex].src;
    if (isPlaying) {
      audio.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const play = useCallback(() => {
    skipGuard.current = 0;
    audioRef.current?.play().catch(() => {});
    setIsPlaying(true);
  }, []);

  // Jumps to a track and plays it from time 0 — unlike selectTrack, this
  // also rewinds when it's already the current track, so replaying the
  // intro theme (track 0) restarts it instead of doing nothing.
  const playFromStart = useCallback(
    (i = 0) => {
      skipGuard.current = 0;
      const audio = audioRef.current;
      if (audio && currentIndex === i) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
        setIsPlaying(true);
      } else {
        setCurrentIndex(i);
        setIsPlaying(true);
      }
    },
    [currentIndex]
  );

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, pause, play]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % playlist.length);
    setIsPlaying(true);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  }, []);

  const selectTrack = useCallback((i) => {
    skipGuard.current = 0;
    setCurrentIndex(i);
    setIsPlaying(true);
  }, []);

  const toggleExpanded = useCallback(() => setExpanded((e) => !e), []);

  return {
    tracks: playlist,
    currentIndex,
    isPlaying,
    expanded,
    play,
    pause,
    toggle,
    playFromStart,
    next,
    prev,
    selectTrack,
    toggleExpanded,
  };
}
