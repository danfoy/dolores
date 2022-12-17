const handleCommand = require('../handlers/commandHandler');

/**
 * Notifies the command issuer of failure and logs the error to the console
 *
 * @param {*} interaction interaction containing the command
 * @param {Error} error error caused by command
 */

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (!interaction.isCommand()) return;
        return handleCommand(interaction);

    },
};
