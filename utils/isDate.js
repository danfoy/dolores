/**
 * Determines whether the input is an instance of Date.
 *
 * @param {*} target
 * @returns {boolean}
 */
export default function isDate(target) {
    return target && // Check date is truthy
        Object.prototype.toString.call(target) === '[object Date]' && // Check target is date object
        target != 'Invalid Date' // Check target is not 'inavlid date';
};
