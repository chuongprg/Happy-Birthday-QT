import { collection, addDoc, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase.js';

// Matches youtube.com/watch?v=, youtu.be/, youtube.com/shorts/ and
// youtube.com/embed/ links, with or without extra query params after the id.
const YT_URL_RE = /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
const YT_BARE_ID_RE = /^[A-Za-z0-9_-]{11}$/;

export function parseYoutubeVideoId(input) {
  const trimmed = input.trim();
  const match = trimmed.match(YT_URL_RE);
  if (match) return match[1];
  // Someone pasted just the bare 11-character video id.
  return YT_BARE_ID_RE.test(trimmed) ? trimmed : null;
}

// YouTube's oEmbed endpoint is public and keyless — no API key needed for a
// title lookup. Best-effort: a null return just falls back to a generic
// title, it never blocks adding the track.
export async function fetchYoutubeTitle(videoId) {
  try {
    const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(
      `https://www.youtube.com/watch?v=${videoId}`
    )}&format=json`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return data.title || null;
  } catch {
    return null;
  }
}

// Live list, shared across every visitor — either person adding or removing
// a song shows up for both, the same pattern as the dinner pickup-location
// answer (see utils/pickupLocation.js).
export function subscribeYoutubeTracks(callback) {
  const q = query(collection(db, 'youtubeTracks'), orderBy('addedAt', 'asc'));
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    () => callback([])
  );
}

export async function addYoutubeTrack(url) {
  const videoId = parseYoutubeVideoId(url);
  if (!videoId) {
    throw new Error('invalid-url');
  }
  const title = (await fetchYoutubeTitle(videoId)) || `YouTube · ${videoId}`;
  await addDoc(collection(db, 'youtubeTracks'), { videoId, title, addedAt: serverTimestamp() });
}

export async function removeYoutubeTrack(id) {
  await deleteDoc(doc(db, 'youtubeTracks', id));
}
