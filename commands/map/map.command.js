const ApexPlaylist = require('./ApexPlaylist');
const apexData = require('./apex.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	meta: {
        name: 'map',
        description: 'Get the current map schedule for Apex Legends'
    },
	async execute(interaction) {
		const seasonData = apexData.seasons[apexData.seasons.length - 1];
		const battleRoyale = new ApexPlaylist(seasonData);

		const current = battleRoyale.currentMap;
		const next = battleRoyale.nextMap;

		const response = new MessageEmbed({
			title: `Current Map: ${current.map}`,
			description: `*${current.timeRemaining} minutes remaining*`,
			footer: {
				text: `Next: ${next.map} for ${next.duration} minutes`
			}
		});

		await interaction.reply({embeds: [response]});
	}
};
