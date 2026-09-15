// The background playlist. Drop your own mp3 files into public/audio/ and
// list them here — title/artist are just display text.
//
// Track 0 plays automatically the instant the invitation is opened (see
// App.jsx's handleEnvelopeOpen) and underscores the photo montage — it's
// meant to be a dedicated ~40s intro theme. When it ends, the player just
// falls through to the next track like normal, so put your regular
// background playlist after it.
export const playlist = [
  { title: 'Intro', artist: 'Intro', src: '/audio/intro-theme.mp3' },
  { title: 'Track 01: Anh ơi ở lại - ChiPu', artist: 'Playlist', src: '/audio/track-01.mp3' },
  { title: "Track 02: It's You", artist: 'Playlist', src: '/audio/track-02.mp3' },
  { title: 'Track 03: SOYOU X JUNGGIGO(소유 X 정기고) _ SOME(썸)', artist: 'Playlist', src: '/audio/track-03.mp3' },
];
