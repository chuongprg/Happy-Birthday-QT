import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase.js';
import { getVisitorId } from './sessionId.js';

// Best-effort background upload — the local preview/UX in the Gift Quest
// never waits on this and never breaks if it fails (offline, ad-blocker,
// missing Firebase env vars, etc.).
export async function uploadCapturedPhoto(dataUrl, { giftIndex, giftTitle }) {
  try {
    const sessionId = getVisitorId();
    const blob = await (await fetch(dataUrl)).blob();
    const path = `photos/${sessionId}/${giftIndex}_${Date.now()}.jpg`;
    const storageRef = ref(storage, path);

    await uploadBytes(storageRef, blob, {
      contentType: 'image/jpeg',
      cacheControl: 'public,max-age=31536000,immutable',
    });
    const downloadURL = await getDownloadURL(storageRef);

    await addDoc(collection(db, 'photos'), {
      giftIndex,
      giftTitle,
      sessionId,
      storagePath: path,
      downloadURL,
      capturedAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn('Photo upload skipped:', err);
  }
}
