import randomFrom from '../utils/randomFrom.js';
import quotes from '../data/quotes.js';

export const meta = {
	name: 'ping',
	description: 'Request a response'
};

export async function execute(interaction) {
	await interaction.reply(randomFrom(quotes));
};

export default {
	meta: meta,
	execute: execute,
};
