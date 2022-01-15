const { Client, Intents } = require('discord.js');
const { bot } = require('./config.json');
const { randomFrom } = require('./util');
const { registerCommands } = require('./commands');
const { registerEvents } = require('./events');
const pingQuotes = require('./commands/ping/quotes');

(async function main() {
	// Send a random ping quote to announce startup
	console.log(randomFrom(pingQuotes));

	// Create the discordjs client instance
	const client = new Client({
		intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_MESSAGES
		]
	});

	await registerCommands(client);
	await registerEvents(client);

	// Attempt login
	await client.login(bot.token);
})();
