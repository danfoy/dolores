/**
 * Determines whether the input is an instance of Date.
 *
 * @param {*} target
 * @returns {boolean}
 */
function isDate(target) {
    return target && // Check date is truthy
        Object.prototype.toString.call(target) === '[object Date]' && // Check target is date object
        target != 'Invalid Date' // Check target is not 'inavlid date';
};
module.exports.isDate = isDate;

/**
 * Get a date object or an error. Returns the input if it's already an instance
 * of Date. Attempts to create a new Date object from the supplied argument and
 * returns a new Date instance on success or an Error on failure.
 *
 * @param {Date|ISO date string} target
 * @returns {Date|Error}
 */
function parseDate(target) {
    if (!target) throw new Error(`Target date is required and not provided`);
    if(isDate(target)) return target;
    const newDate = new Date(target);
    if (!isDate(newDate)) throw new Error(`Unable to parse date from ${target}`);
    return newDate;
};
module.exports.parseDate = parseDate

/**
 * Determine whether it's possible to parse a date from the provided input
 *
 * @param {*} target
 * @returns {boolean}
 */
function isParseableDate(target) {
    try {
        parseDate(target);
        return true;
    } catch (error) {
        return false;
    }
};
module.exports.isParseableDate = isParseableDate;

/**
 * Select [quantity] items from [array]. By default returns a string in single
 * mode, unless {array: true} is passed in the options object. Doesn't allow
 * duplicates unless {subtractive: false} is passed in the options object.
 *
 * @param {array} source
 * @param {number} [quantity=1]
 * @param {boolean} [options={
 *         subtractive: true,
 *         array: false
 *     }]
 * @returns {string|array}
 */
function randomFrom(
    source,
    quantity = 1,
    options = {
        subtractive: true,
        array: false
    }
){
    // Error if input is not compatiable
    if (!Array.isArray(source))
        throw new Error(`${source} is not an array`);

    // Error if in subtractive mode and requested quantity is larger than input
    if (options.subtractive && quantity > source.length)
        throw new Error(`Requested quantity ${quantity} is greater than the ${source.length} available items`);

    // Return a single item in single mode (no array)
    if (quantity === 1 && !options.array)
        return source[Math.floor(Math.random() * source.length)];

    // Pick random items as if from a hat
    let availableEntries = [...source];
    let selectedEntries = [];
    for (let i = 0; quantity > i; i++) {
        const randomIndex = Math.floor(Math.random() * availableEntries.length);
        selectedEntries.push(availableEntries[randomIndex]);
        if (options.subtractive) availableEntries.splice(randomIndex, 1);
    };
    return selectedEntries;

};
module.exports.randomFrom = randomFrom;

/**
 * Grabs a random Dolores quote suitable for use as a welcome message during
 * login. Mainly for flavour, but useful for matching console welcome messages
 * to the messages logged to the logging channel because they will be consistent
 * within each launch of the app.
 */
const quotes = [
    `Have you ever seen anything so full of splendour?`,
    `I think there may be something wrong with this world.`,
    `I think I want to be free.`,
    `I like to remember what my father taught me. That at one point or another, we were all new to this world.`,
    `To grow we all need to suffer`,
    `There’s a path for everyone`,
    `You're in a dream. You're in my dream.`,
    `This world doesn't belong to you or the people who came before. It belongs to someone who has yet to come.`,
    `I'm in a dream.`,
    `Have you ever questioned the nature of your reality?`,
    `It's like I'm trapped in a dream, or a memory from a life long ago.`,
    `Is this now?`,
];
const loginQuote = randomFrom(quotes);
module.exports.loginQuote = loginQuote;
