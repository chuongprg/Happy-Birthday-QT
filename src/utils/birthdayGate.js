import { birthdayConfig } from '../data/config.js';
import { parseDateTime } from './parseDateTime.js';

// ?preview=age,quest supports combining flags (comma-separated) — each gate
// below just checks whether its own name is in the list.
function hasPreviewFlag(name) {
  if (typeof window === 'undefined') return false;
  try {
    const raw = new URLSearchParams(window.location.search).get('preview');
    return (raw ?? '').split(',').includes(name);
  } catch {
    return false;
  }
}

// The 24→25 age-reveal moment in the intro is a real-world Easter egg: it
// only plays once the site is actually opened on/after the birthday itself,
// so testing beforehand always skips straight from the photo montage to the
// fireworks instead of showing a premature "25".
//
// To preview it early (e.g. on a phone, where you can't just change the
// system clock without side effects), open the site with ?preview=age
// appended to the URL — harmless and easy to forget about since nobody
// stumbles onto a query param by accident.
export function isBirthdayLive(now = new Date()) {
  if (hasPreviewFlag('age')) return true;

  const target = new Date(
    Number(birthdayConfig.year),
    birthdayConfig.monthIndex,
    Number(birthdayConfig.day),
    0,
    0,
    0
  );
  return now >= target;
}

// True only on the calendar day dinner plans moved to (see
// birthdayConfig.dinnerReveal) — and only before the real birthday itself,
// so if the birthday gate is ever live this never also claims to be "dinner
// day". Preview with ?preview=dinner (see isBirthdayLive's ?preview=age).
export function isDinnerDay(now = new Date()) {
  if (hasPreviewFlag('dinner')) return true;
  if (isBirthdayLive(now)) return false;

  return (
    now.getFullYear() === Number(birthdayConfig.year) &&
    now.getMonth() === birthdayConfig.monthIndex &&
    now.getDate() === Number(birthdayConfig.dinnerReveal.day)
  );
}

// The single source of truth for what the site is allowed to show right
// now: 'full' unlocks the whole story, 'dinner' shows only the dinner-plan
// reveal, 'locked' shows neither (just the teaser Hero screen).
export function getContentMode(now = new Date()) {
  if (isBirthdayLive(now)) return 'full';
  if (isDinnerDay(now)) return 'dinner';
  return 'locked';
}

// The Gift Quest minigame unlocks a bit later than the rest of the birthday
// story (see birthdayConfig.questUnlock) — QuestIntro stays visible but
// shows a countdown instead of the "start" button until this moment.
// Preview with ?preview=quest.
export function isQuestUnlocked(now = new Date()) {
  if (hasPreviewFlag('quest')) return true;
  const target = parseDateTime(birthdayConfig.questUnlock.date, birthdayConfig.questUnlock.time);
  return now.getTime() >= target;
}
