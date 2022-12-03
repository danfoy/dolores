const apex = require('apexobj');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	meta: {
        name: 'map',
        description: 'Get the current map schedule for Apex Legends'
    },
	async execute(interaction) {

		// if (!apex.currentSeason) return await interaction.reply({content: 'Sorry, no data for the current season', ephemeral: true});
		if (!apex.currentSeason) throw new Error('No season data');

		const battleRoyale = apex.currentSeason.unranked.battleRoyale;
		console.log(battleRoyale.currentMap);

		const current = battleRoyale.currentMap;
		const next = battleRoyale.nextMap;

		const response = new EmbedBuilder({
			title: `Current Map: ${current.map}`,
			description: `*${current.timeRemaining / 60} minutes remaining*`,
			footer: {
				text: `Next: ${next.map} for ${next.duration / 60} minutes`
			}
		});

		await interaction.reply({embeds: [response]});
	}
};
