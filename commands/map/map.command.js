const apex = require('apexobj');
const { MessageEmbed } = require('discord.js');

module.exports = {
	meta: {
        name: 'map',
        description: 'Get the current map schedule for Apex Legends'
    },
	async execute(interaction) {
		const battleRoyale = apex.currentSeason.unranked.battleRoyale;
		console.log(battleRoyale.currentMap);

		const current = battleRoyale.currentMap;
		const next = battleRoyale.nextMap;

		const response = new MessageEmbed({
			title: `Current Map: ${current.map}`,
			description: `*${current.timeRemaining / 60} minutes remaining*`,
			footer: {
				text: `Next: ${next.map} for ${next.duration / 60} minutes`
			}
		});

		await interaction.reply({embeds: [response]});
	}
};
