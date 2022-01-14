const glob = require('glob');
const { Client, Collection, Intents } = require('discord.js');
const { bot } = require('./config.json');

// Create the discordjs client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Attach commands to client
client.commands = new Collection();
glob.sync('./commands/**/*.command.js')
	.forEach(file => {
		const command = require(file);
		return client.commands.set(command.meta.name, command);
	});
const commandsCount = client.commands.size;
console.log(`Found ${commandsCount} ${ commandsCount > 1 && commandsCount != 0 ? 'commands' : 'command'} definition`);

// Register event handlers
glob.sync('./events/**/*.event.js')
	.forEach(file => {
		const event = require(file);
		if (event.once) return client.once(event.name, (...args) => event.execute(...args));
		return client.on(event.name, (...args) => event.execute(...args));
	});

// Attempt login
client.login(bot.token);
