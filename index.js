const { Client, GatewayIntentBits } = require('discord.js');
const { bot } = require('./config.json');
const { registerCommands } = require('./commands');
const { registerEvents } = require('./events');
const { loginQuote } = require('./util');

(async function main() {
	// Send a random ping quote to announce startup
	console.log(`\n${loginQuote}\n`);

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
        console.log(`\nLogged into Discord as ${client.user.tag} (${client.user.id})`);
	} catch (error) {
		// Throw rather than `process.exit(1)` is deliberate.
		// Exiting causes nodemon (development) and systemd (production) to
		// reload, which risks spamming the API with login attempts.
		console.error('Discord login failed:', error);
		throw new Error('Discord login failed');
	};

})();
