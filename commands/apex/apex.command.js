const { SlashCommandBuilder } = require('@discordjs/builders');
const SquadEmbed = require('./SquadEmbed');

module.exports = {
	meta: new SlashCommandBuilder()
        .setName('apex')
        .setDescription('Generate a squad of randomized Apex Legends')
        .addIntegerOption(option => option
            .setName('size')
            .setDescription('Number of legends to generate')
            .setRequired(true)
            .addChoice('Solo', 1)
            .addChoice('Duo', 2)
            .addChoice('Squad', 3)
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
