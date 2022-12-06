const { Client, GatewayIntentBits } = require('discord.js');
const { bot, servers } = require('./config.json');
const { registerCommands } = require('./commands');
const { registerEvents } = require('./events');
const loginQuote = require('./events/LoginQuote');
const loginEmbed = require('./events/LoginEmbed');

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
		const loggingChannel = await client.channels
			.fetch(servers.find(server => server.name == "home").logging);
		await loggingChannel.send({embeds: [loginEmbed(client)]});


	} catch (error) {
		console.error('Discord login failed:', error);

		// Throw rather than `process.exit(1)` is deliberate
		// Exiting causes nodemon (development) and systemd (production) to
		// reload, which risks spamming the API with login attemps.
		throw new Error('Discord login failed');
	};

})();
