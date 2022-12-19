const { Client, GatewayIntentBits } = require('discord.js');
const clientData = require('./data/client');
const registerCommands = require('./registrars/registerCommands');
const registerEvents = require('./registrars/registerEvents');
const registerTriggers = require('./registrars/registerTriggers');
const loginQuote = require('./utils/loginQuote');

(async function main() {
	// Send a random ping quote to announce startup
	console.log(`\n${loginQuote}\n`);

	// Create the discordjs client instance
	const client = new Client({
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.MessageContent,
		]
	});

	await registerCommands(client);
	registerEvents(client);
	registerTriggers(client);

	// Attempt login
	try {
		await client.login(clientData.token);
        console.log(`\nLogged into Discord as ${client.user.tag} (${client.user.id})`);
	} catch (error) {
		// Throw rather than `process.exit(1)` is deliberate.
		// Exiting causes nodemon (development) and systemd (production) to
		// reload, which risks spamming the API with login attempts.
		console.error('Discord login failed:', error);
		throw new Error('Discord login failed');
	};

})();
