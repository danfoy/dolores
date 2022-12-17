const randomFrom = require('../utils/randomFrom');
const quotes = require('../data/quotes');


module.exports = {
	meta: {
		name: 'ping',
		description: 'Request a response'
	},
	async execute(interaction) {
		await interaction.reply(randomFrom(quotes));
	},
};
