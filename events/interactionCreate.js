const { EmbedBuilder } = require('discord.js');
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

        // Only handle commands
        if (!interaction.isCommand()) return;
        handleCommand(interaction);

	},
};
