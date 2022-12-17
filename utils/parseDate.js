const isDate = require('./isDate');

/**
 * Get a date object or an error. Returns the input if it's already an instance
 * of Date. Attempts to create a new Date object from the supplied argument and
 * returns a new Date instance on success or an Error on failure.
 *
 * @param {Date|ISO date string} target
 * @returns {Date|Error}
 */
module.exports = function parseDate(target) {
    if (!target) throw new Error(`Target date is required and not provided`);
    if(isDate(target)) return target;
    const newDate = new Date(target);
    if (!isDate(newDate)) throw new Error(`Unable to parse date from ${target}`);
    return newDate;
};
