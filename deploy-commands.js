const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { bot, servers } = require('./config.json');


// Create an array of commands from command files
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Deploy the commands
const rest = new REST({ version: '9' }).setToken(bot.token);
rest.put(Routes.applicationGuildCommands(bot.id, servers[1].id), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(error => console.error(error));
