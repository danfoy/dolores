const Event = require('../classes/Event');
const handleCommand = require('../handlers/commandHandler');

module.exports = new Event(
    {
        name: 'interactionCreate'
    },
    function(interaction) {
        if (!interaction.isCommand()) return;
        return handleCommand(interaction);
    }
);
