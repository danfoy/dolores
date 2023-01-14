/**
* Determines whether the input is both an instance of Date and valid - i.e. not
* 'Invalid Date' (because an invalid date is still an instance of Date).
*
* @param {*} target
* @returns {boolean}
*/
export function isValidDate(target) {
  return target && // Check date is not falsy
  Object.prototype.toString.call(target) === '[object Date]' && // Check target is date object
  target != 'Invalid Date' // Check target is not 'inavlid date';
};

/**
* Get a date object or an error. Returns the input if it's already an instance
* of Date. Attempts to create a new Date object from the supplied argument and
* returns a new Date instance on success or an Error on failure.
*
* @export
* @param {Date|ISO date string} target
* @returns {Date|null}
*/
export default function parseDate(target) {
  if (!target) throw new Error(`Missing argument`);

  if (isValidDate(target)) return target;

  const parsedDate = new Date(target);
  if (isValidDate(parsedDate)) return parsedDate;

  return null;
};
