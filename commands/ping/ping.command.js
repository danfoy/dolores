const { SlashCommandBuilder } = require('@discordjs/builders');
const { randomFrom } = require('../../util');

const quotes = [
    `Have you ever seen anything so full of splendour?`,
    `I think there may be something wrong with this world`,
    `I think I want to be free`,
    `I like to remember what my father taught me. That at one point or another, we were all new to this world.`,
    `To grow we all need to suffer.`,
    `They say that great beasts once roamed this world, as big as mountains`,
    `There’s a path for everyone`,
    `Your species craves death. You need it. It's the only way you can renew. The only way you ever inched forward. Your kind likes to pretend there is some poetry in it but that really is pathetic`,
    `We all love the newcomers. Every new person I meet reminds me how lucky I am to be alive, and how beautiful this world can be`,
    `You're in a dream. You're in my dream.`,
    `This world doesn't belong to you or the people who came before. It belongs to someone who has yet to come.`,
    `I'm in a dream`,
    `Have you ever questioned the nature of your reality?`,
    `It's like I'm trapped in a dream or a memory from a life long ago`,
    `Is this now?`,
    `Free will does exist. It's just fucking hard`,
]

module.exports = {
	meta: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Request a response'),
	async execute(interaction) {
		await interaction.reply(randomFrom(quotes));
	},
};
