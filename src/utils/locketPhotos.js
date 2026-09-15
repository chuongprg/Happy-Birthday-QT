import { collection, addDoc, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase.js';
import { getVisitorId } from './sessionId.js';

// A shared photo library, separate from the gift-quest `photos` collection —
// both people can browse and delete these from the main site, no admin
// login needed (see firestore.rules).
//
// Stored directly as a Firestore field (already-compressed JPEG data URL,
// see components/UI/LocketCapture.jsx), not Firebase Storage — Storage now
// requires the paid Blaze plan just to create a bucket, and a resized photo
// comfortably fits Firestore's 1 MiB per-document limit.
export function subscribeLocketPhotos(callback) {
  const q = query(collection(db, 'locketPhotos'), orderBy('capturedAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    () => callback([])
  );
}

export async function uploadLocketPhoto(dataUrl) {
  const visitorId = getVisitorId();
  await addDoc(collection(db, 'locketPhotos'), {
    visitorId,
    imageData: dataUrl,
    capturedAt: serverTimestamp(),
  });
}

export async function deleteLocketPhoto(photo) {
  await deleteDoc(doc(db, 'locketPhotos', photo.id));
}
