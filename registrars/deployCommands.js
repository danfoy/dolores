import { sync } from 'glob';
import { REST, Routes } from 'discord.js';
import { find } from '../data/server.js';
import { token, id } from '../data/client.js';

const homeServer = find(server => server.alias === 'home').id;

// Create an array of commands from command files
const commands = sync('./commands/**/*.command.js')
	.map(file => require(file).meta.toJSON());

// Deploy the commands
const rest = new REST({ version: '10' }).setToken(token);
rest.put(Routes.applicationGuildCommands(id, homeServer), { body: commands })
	.then(() => console.log('Registered slash commands on staging server.'))
	.catch(error => console.error(error));
