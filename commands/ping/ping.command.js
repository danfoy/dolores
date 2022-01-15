const { randomFrom } = require('../../util');
const quotes = require('./quotes');


module.exports = {
	meta: {
		name: 'ping',
		description: 'Request a response'
	},
	async execute(interaction) {
		await interaction.reply(randomFrom(quotes));
	},
};
