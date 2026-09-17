// Parses a 'DD.MM.YYYY' date + 'HH:MM' or 'HH:MM:SS' time (both used across
// birthdayConfig — dinnerReveal, questUnlock, etc.) into a local timestamp (ms).
export function parseDateTime(dateStr, timeStr) {
  const [day, month, year] = dateStr.split('.').map(Number);
  const [hour, minute, second = 0] = timeStr.split(':').map(Number);
  return new Date(year, month - 1, day, hour, minute, second).getTime();
}
