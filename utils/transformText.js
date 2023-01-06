/**
 * Talk like sarcastic squidward
 *
 * @param {string} text text to transform
 * @returns {string} sarcastic text
 */
export function squidwardize(text) {
    return text
        .split('')
        .map((letter, index) =>
            index % 2
                ? letter.toUpperCase()
                : letter.toLowerCase())
        .join('')
    ;
};

/**
 * Talk like a boomer
 *
 * @param {string} text text to transform
 * @returns {string} boomerized text
 */
export function boomerize(text) {
    return text.toUpperCase();
};

export default {
    squidward: squidwardize,
    boomer: boomerize,
};
