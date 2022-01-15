const ApexPlaylist = require('./ApexPlaylist');
const seasons = require('./apex.json').seasons;
const { maps, mapDurations, startDate } = seasons[seasons.length - 1];
const { MessageEmbed } = require('discord.js');

module.exports = {
	meta: {
        name: 'map',
        description: 'Get the current map schedule for Apex Legends'
    },
	async execute(interaction) {

		const battleRoyale = new ApexPlaylist(maps, mapDurations, startDate);

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
