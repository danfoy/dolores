import parseDate from './parseDate.js';

/**
 * Determine whether it's possible to parse a date from the provided input
 *
 * @param {*} target
 * @returns {boolean}
 */
export default function isParseableDate(target) {
    try {
        parseDate(target);
        return true;
    } catch (error) {
        return false;
    }
};
