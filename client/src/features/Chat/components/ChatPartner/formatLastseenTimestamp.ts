const DEFAULT_LOCALE = 'en-US';
const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Calculates the difference in full days between two timestamps, ignoring time components.
 * Returns a positive number if targetMs is in the past relative to currentMs (e.g., if
 * target is yesterday, returns 1).
 */
const getDayDifference = (targetMs: number, currentMs: number): number => {
  const targetDate = new Date(targetMs);
  const currentDate = new Date(currentMs);

  // Normalize to midnight (local time) to ensure accurate day counting across boundaries.
  targetDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  const diffTime = currentDate.getTime() - targetDate.getTime();

  // Use Math.round to handle potential minor floating point inaccuracies or DST shifts accurately.
  return Math.round(diffTime / MS_PER_DAY);
};

/**
 * Formats a timestamp relative to the current time, suitable for chat list views.
 * Displays time, 'Yesterday', weekday name, Month/Day, or Month/Year based on recency.
 *
 * @param targetTime The timestamp of the event (e.g., message creation time) in milliseconds.
 * @param currentTime The current timestamp in milliseconds.
 * @returns A formatted relative date/time string.
 */
const formatLastseenTimestamp = (
  targetTime: number,
  currentTime: number,
): string => {
  const targetDateTime = new Date(targetTime);

  // Determine the locale preference (using browser locale or fallback)
  const locale = navigator?.language || DEFAULT_LOCALE;

  // Calculate the difference in days
  const dayDiff = getDayDifference(targetTime, currentTime);

  if (dayDiff === 0) {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(targetDateTime); // Example: 9:33 PM
  }

  if (dayDiff === 1) return 'Yesterday';

  if (dayDiff < 7) {
    return new Intl.DateTimeFormat(locale, {
      weekday: 'short',
    }).format(targetDateTime); // Example: Wed
  }

  if (targetDateTime.getFullYear() === new Date(currentTime).getFullYear()) {
    return new Intl.DateTimeFormat(locale, {
      month: 'short',
      day: 'numeric',
    }).format(targetDateTime); // Example: May 13
  }

  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
  }).format(targetDateTime); // Example: May 2022
};

export default formatLastseenTimestamp;
