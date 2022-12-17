const randomFrom = require('./randomFrom');

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
module.exports = loginQuote;
