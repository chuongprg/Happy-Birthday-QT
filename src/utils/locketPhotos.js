import { collection, addDoc, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../lib/firebase.js';
import { getVisitorId } from './sessionId.js';

// Storage uploads have no built-in timeout — on a flaky phone connection
// they can hang indefinitely with no feedback, leaving the "Đang lưu..."
// button stuck forever. Race against a generous timeout instead.
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('timed out')), ms)),
  ]);
}

// A shared photo library, separate from the gift-quest `photos` collection —
// both people can browse and delete these from the main site, no admin
// login needed (see firestore.rules / storage.rules).
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
  const blob = await (await fetch(dataUrl)).blob();
  const path = `locket/${visitorId}/${Date.now()}.jpg`;
  const storageRef = ref(storage, path);
  await withTimeout(
    uploadBytes(storageRef, blob, {
      contentType: 'image/jpeg',
      cacheControl: 'public,max-age=31536000,immutable',
    }),
    20000
  );
  const downloadURL = await withTimeout(getDownloadURL(storageRef), 10000);
  await withTimeout(
    addDoc(collection(db, 'locketPhotos'), {
      visitorId,
      storagePath: path,
      downloadURL,
      capturedAt: serverTimestamp(),
    }),
    10000
  );
}

export async function deleteLocketPhoto(photo) {
  try {
    await withTimeout(deleteObject(ref(storage, photo.storagePath)), 10000);
  } catch {
    // object may already be gone — still remove the metadata doc below
  }
  await withTimeout(deleteDoc(doc(db, 'locketPhotos', photo.id)), 10000);
}
