const glob = require('glob');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { bot, servers } = require('./config.json');


// Create an array of commands from command files
const commands = glob.sync('./commands/**/*.command.js')
	.map(file => require(file).meta.toJSON());

// Deploy the commands
const rest = new REST({ version: '9' }).setToken(bot.token);
rest.put(Routes.applicationGuildCommands(bot.id, servers[1].id), { body: commands })
	.then(() => console.log('Registered slash commands on staging server.'))
	.catch(error => console.error(error));
