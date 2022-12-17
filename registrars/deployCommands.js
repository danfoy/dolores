const glob = require('glob');
const { REST, Routes } = require('discord.js');
const servers = require('../data/servers');
const clientData = require('../data/client');

const homeServer = servers
	.find(server => server.alias === 'home').id;

// Create an array of commands from command files
const commands = glob.sync('./commands/**/*.command.js')
	.map(file => require(file).meta.toJSON());

// Deploy the commands
const rest = new REST({ version: '10' }).setToken(clientData.token);
rest.put(Routes.applicationGuildCommands(clientData.id, homeServer), { body: commands })
	.then(() => console.log('Registered slash commands on staging server.'))
	.catch(error => console.error(error));
