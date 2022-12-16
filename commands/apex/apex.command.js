const { SlashCommandBuilder } = require('@discordjs/builders');
const SquadEmbed = require('../../embeds/ApexSquadEmbed');

module.exports = {
	meta: new SlashCommandBuilder()
        .setName('apex')
        .setDescription('Generate a squad of randomized Apex Legends')
        .addIntegerOption(option => option
            .setName('size')
            .setDescription('Number of legends to generate')
            .setRequired(true)
            .addChoices(
				{ name: 'Solo', value: 1 },
				{ name: 'Duo', value: 2 },
				{ name: 'Squad', value: 3 },
			)
        )
        .addUserOption(option => option
            .setName('teammate1')
            .setDescription('Tag a teammate')
        )
        .addUserOption(option => option
            .setName('teammate2')
            .setDescription('Tag another teammate')
        )
    ,
	async execute(interaction) {
        await interaction.reply(new SquadEmbed(interaction));
    }
};
