// The background playlist. Drop your own mp3 files into public/audio/ and
// list them here — title/artist are just display text.
//
// Track 0 plays automatically the instant the invitation is opened (see
// App.jsx's handleEnvelopeOpen) and underscores the photo montage — it's
// meant to be a dedicated ~40s intro theme. When it ends, the player just
// falls through to the next track like normal, so put your regular
// background playlist after it.
//
// Songs added from a YouTube link (see MusicPlayer.jsx) live separately in
// Firestore (utils/youtubeTracks.js) and get merged in alongside these at
// runtime by useMusicPlayer.js — this file only ever needs the local mp3s.
export const playlist = [
  { title: 'Intro', artist: 'Intro', src: '/audio/intro-theme.mp3' },
  { title: 'Track 01', artist: 'Playlist', src: '/audio/track-01.mp3' },
  { title: 'Track 02', artist: 'Playlist', src: '/audio/track-02.mp3' },
  { title: 'Track 03', artist: 'Playlist', src: '/audio/track-03.mp3' },
  { title: 'Track 04', artist: 'Playlist', src: '/audio/track-04.mp3' },
  { title: 'Track 05', artist: 'Playlist', src: '/audio/track-05.mp3' },
  { title: 'Track 06', artist: 'Playlist', src: '/audio/track-06.mp3' },
  { title: 'Track 07', artist: 'Playlist', src: '/audio/track-07.mp3' },
  { title: 'Track 08', artist: 'Playlist', src: '/audio/track-08.mp3' },
  { title: 'Track 09', artist: 'Playlist', src: '/audio/track-09.mp3' },
  { title: 'Track 10', artist: 'Playlist', src: '/audio/track-10.mp3' },
  { title: 'Track 11', artist: 'Playlist', src: '/audio/track-11.mp3' },
  { title: 'Track 12', artist: 'Playlist', src: '/audio/track-12.mp3' },
  { title: 'Track 13', artist: 'Playlist', src: '/audio/track-13.mp3' },
  { title: 'Track 14', artist: 'Playlist', src: '/audio/track-14.mp3' },
  { title: 'Track 15', artist: 'Playlist', src: '/audio/track-15.mp3' },
  { title: 'Track 16', artist: 'Playlist', src: '/audio/track-16.mp3' },
  { title: 'Track 17', artist: 'Playlist', src: '/audio/track-17.mp3' },
  { title: 'Track 18', artist: 'Playlist', src: '/audio/track-18.mp3' },
  { title: 'Track 19', artist: 'Playlist', src: '/audio/track-19.mp3' },
  { title: 'Track 20', artist: 'Playlist', src: '/audio/track-20.mp3' },
  { title: 'Track 21', artist: 'Playlist', src: '/audio/track-21.mp3' },
];
