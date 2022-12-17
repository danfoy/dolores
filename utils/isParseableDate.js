const parseDate = require('./parseDate');

/**
 * Determine whether it's possible to parse a date from the provided input
 *
 * @param {*} target
 * @returns {boolean}
 */
module.exports = function isParseableDate(target) {
    try {
        parseDate(target);
        return true;
    } catch (error) {
        return false;
    }
};
