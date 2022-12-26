import Trigger from '../classes/Trigger.js';
import randomFrom from '../utils/randomFrom.js';
import quotes from '../data/quotes.js';
import { id } from '../data/client.js';

const meta = {
    name: 'bot-name',
    description: 'Reply to mentions of bot name with random quote',
};

const patterns = [
    /dolores/,
    /delores/,
    new RegExp(`<@${id}>`),
];

async function respond(message) {

    // Cloning the responses here for easier refactoring if I decide on
    // specific quotes for mentions.
    const responses = [
        ...quotes,
    ];

    await message.channel.send(randomFrom(responses))
};

export default new Trigger(meta, patterns, respond);
