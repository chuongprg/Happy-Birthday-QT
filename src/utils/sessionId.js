const STORAGE_KEY = 'birthday-quest-visitor-id-v1';

// One id per visitor (not per tab/session), so all photos from the same
// person land under the same folder in Storage/Firestore for the admin view.
export function getVisitorId() {
  try {
    let id = window.localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    return 'unknown';
  }
}
