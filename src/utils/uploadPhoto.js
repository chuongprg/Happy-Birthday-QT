import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase.js';
import { getVisitorId } from './sessionId.js';

// Best-effort background upload — the local preview/UX in the Gift Quest
// never waits on this and never breaks if it fails (offline, missing
// Firebase env vars, etc.).
//
// Stored directly as a Firestore field (already-compressed JPEG data URL,
// see utils/resizeImage.js), not Firebase Storage — Storage now requires
// the paid Blaze plan just to create a bucket, and a resized photo comfortably
// fits Firestore's 1 MiB per-document limit.
export async function uploadCapturedPhoto(dataUrl, { giftIndex, giftTitle }) {
  try {
    const sessionId = getVisitorId();
    await addDoc(collection(db, 'photos'), {
      giftIndex,
      giftTitle,
      sessionId,
      imageData: dataUrl,
      capturedAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn('Photo upload skipped:', err);
  }
}
