import { Client, GatewayIntentBits } from 'discord.js';
import { token } from './data/client.js';
import registerCommands from './registrars/registerCommands.js';
import registerEvents from './registrars/registerEvents.js';
import registerTriggers from './registrars/registerTriggers.js';
import loginQuote from './utils/loginQuote.js';

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
		await client.login(token);
        console.log(`\nLogged into Discord as ${client.user.tag} (${client.user.id})`);
	} catch (error) {
		// Throw rather than `process.exit(1)` is deliberate.
		// Exiting causes nodemon (development) and systemd (production) to
		// reload, which risks spamming the API with login attempts.
		console.error('Discord login failed:', error);
		throw new Error('Discord login failed');
	};

})();
