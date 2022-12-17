const Trigger = require('../classes/Trigger');
const randomFrom = require('../utils/randomFrom');
const quotes = require('../data/quotes');
const clientData = require('../data/client');

const meta = {
    name: 'bot-name',
    description: 'Reply to mentions of bot name with random quote',
};

const patterns = [
    /dolores/,
    /delores/,
    new RegExp(`<@${clientData.id}>`),
];

async function respond(message) {

    // Cloning the responses here for easier refactoring if I decide on
    // specific quotes for mentions.
    const responses = [
        ...quotes,
    ];

    await message.channel.send(randomFrom(responses))
};

module.exports = new Trigger(meta, patterns, respond);
