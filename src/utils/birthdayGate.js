import { birthdayConfig } from '../data/config.js';

function previewOverride() {
  if (typeof window === 'undefined') return null;
  try {
    return new URLSearchParams(window.location.search).get('preview');
  } catch {
    return null;
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
  if (previewOverride() === 'age') return true;

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
  if (previewOverride() === 'dinner') return true;
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
