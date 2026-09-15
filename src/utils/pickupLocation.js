import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase.js';

// A single shared document (not per-visitor) — there's only ever one answer
// to "where should the ride pick you up", and both people should see
// whatever was last saved, from any device, via the live site.
const PICKUP_DOC = ['meta', 'pickupLocation'];

// Returns the saved answer ('' if nothing saved yet), or null if the read
// itself failed or simply took too long (e.g. offline, or a flaky mobile
// connection) — kept distinct from '' so the UI can tell "no answer yet"
// apart from "couldn't check", and never leaves the form stuck on a loading
// state indefinitely.
export async function fetchPickupLocation() {
  try {
    const snap = await Promise.race([
      getDoc(doc(db, ...PICKUP_DOC)),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timed out')), 6000)),
    ]);
    return snap.exists() ? (snap.data().answer ?? '') : '';
  } catch (err) {
    console.warn('Fetch pickup location skipped:', err);
    return null;
  }
}

export async function savePickupLocation(answer) {
  await Promise.race([
    setDoc(doc(db, ...PICKUP_DOC), { answer, updatedAt: serverTimestamp() }),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timed out')), 8000)),
  ]);
}
