// Rolling application deadline.
//
// A job's `deadline` in frontmatter is the first closing date. Once that date
// is more than `graceDays` in the past, it is pushed forward in whole steps of
// `stepMonths` until it is no longer stale. The result only changes once per
// step (never day by day), so candidates always see a fixed-looking date.
//
// All arithmetic is done in UTC on calendar days.

const MS_PER_DAY = 86400000;

const DEFAULTS = { graceDays: 20, stepMonths: 3 };

const toUtcDay = (date) => Math.floor(date.getTime() / MS_PER_DAY);

const addMonthsUTC = (date, months) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + months;
  const day = date.getUTCDate();
  const lastDayOfTarget = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return new Date(Date.UTC(year, month, Math.min(day, lastDayOfTarget)));
};

/**
 * @param {string|Date} deadline  initial closing date (ISO string or Date)
 * @param {{graceDays?: number, stepMonths?: number}} [options]
 * @param {Date} [today]
 * @returns {Date|null} the effective closing date, or null if none is set
 */
const rollDeadline = (deadline, options = {}, today = new Date()) => {
  if (!deadline) return null;
  const base = new Date(deadline);
  if (Number.isNaN(base.getTime())) return null;

  const graceDays = Number(options.graceDays ?? DEFAULTS.graceDays);
  const stepMonths = Number(options.stepMonths ?? DEFAULTS.stepMonths);
  if (!(stepMonths > 0)) return base;

  const todayDay = toUtcDay(today);
  // "modulo" step: jump forward in whole steps until the date is at most
  // graceDays in the past. Each step is computed from the base date so that
  // month-end clamping (31 -> 30) never accumulates.
  let steps = 0;
  let current = base;
  while (todayDay - toUtcDay(current) > graceDays) {
    steps += 1;
    current = addMonthsUTC(base, steps * stepMonths);
  }
  return current;
};

export default rollDeadline;
