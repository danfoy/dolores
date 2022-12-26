import Event from '../classes/Event.js';
import handleTriggers from '../handlers/triggerHandler.js';
import { id } from '../data/client.js';

export default new Event(
    {
        name: 'messageCreate',
    },
    function(message) {

        // Ignore client user's own messages. Mitigates getting stuck in loops.
        if (message.author.id === id) return;

        // It is possible to send a message without content - e.g. an embed
        // or standalone attachment. Ignore these.
        if (!message.content) return;

        handleTriggers(message);
    },
);
