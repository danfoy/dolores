const { randomFrom } = require('../util');

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

// Exporting the pre-generated quote (rather than the function which created it)
// causes nodejs to return the same quote for the duration of the instance.
// This is desireable because it allows matching the console log with the
// message logged on discord.
module.exports = loginQuote;
