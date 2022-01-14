const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { bot } = require('./config.json');

// Create the discordjs client instance
const discord = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Attach commands to client
discord.commands = new Collection();
const commandFiles = fs.readdirSync('./commands')
	.filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	discord.commands.set(command.data.name, command);
};

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		discord.once(event.name, (...args) => event.execute(...args));
	} else {
		discord.on(event.name, (...args) => event.execute(...args));
	}
};

// Attempt login
discord.login(bot.token);
