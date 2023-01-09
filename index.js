import { Client, GatewayIntentBits } from 'discord.js';
import { token } from './data/client.js';
import guildsData from './data/servers.js';

import registerCommands from './registrars/registerCommands.js';
import registerEvents from './registrars/registerEvents.js';
import registerTriggers from './registrars/registerTriggers.js';
import registerDb from './registrars/registerDb.js';

import apex from './commands/apex.js';
import ping from './commands/ping.js';
import misquote from './commands/misquote.js';

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

	// Manually import commands.
	// At some point these will be pulled in from a config object.
	const commands = [
		apex,
		ping,
		misquote,
	];

	registerCommands(client, commands);
	registerEvents(client);
	registerTriggers(client);
	registerDb(client, {guilds: guildsData});

	// Attempt login
	try {
		await client.login(token);
        console.log(`\nLogged into Discord as ${client.user.tag} (${client.user.id})\n`);
	} catch (error) {
		// Throw rather than `process.exit(1)` is deliberate.
		// Exiting causes nodemon (development) and systemd (production) to
		// reload, which risks spamming the API with login attempts.
		console.error('Discord login failed:', error);
		throw new Error('Discord login failed');
	};

})();
