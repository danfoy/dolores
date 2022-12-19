const Event = require('../classes/Event');
const handleTriggers = require('../handlers/triggerHandler');
const clientData = require('../data/client');

module.exports = new Event(
    {
        name: 'messageCreate',
    },
    function(message) {

        // Ignore client user's own messages. Mitigates getting stuck in loops.
        if (message.author.id === clientData.id) return;

        // It is possible to send a message without content - e.g. an embed
        // or standalone attachment. Ignore these.
        if (!message.content) return;

        handleTriggers(message);
    },
);
