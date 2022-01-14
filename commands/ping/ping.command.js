const { SlashCommandBuilder } = require('@discordjs/builders');
const { randomFrom } = require('../../util');
const quotes = require('./quotes');


module.exports = {
	meta: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Request a response'),
	async execute(interaction) {
		await interaction.reply(randomFrom(quotes));
	},
};
