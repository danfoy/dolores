const { Client, GatewayIntentBits, Partials } = require('discord.js');
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
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMessages,
		]
	});

	await registerCommands(client);
	await registerEvents(client);

	// Attempt login
	try {
		await client.login(bot.token);
	} catch (error) {
		console.error('Discord login failed:', error);

		// Throw rather than `process.exit(1)` is deliberate
		// Exiting causes nodemon (development) and systemd (production) to
		// reload, which risks spamming the API with login attemps.
		throw new Error('Discord login failed');
	};

})();
