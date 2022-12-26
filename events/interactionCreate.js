import Event from '../classes/Event.js';
import handleCommand from '../handlers/commandHandler.js';

export default new Event(
    {
        name: 'interactionCreate'
    },
    function(interaction) {
        if (!interaction.isCommand()) return;
        return handleCommand(interaction);
    }
);
