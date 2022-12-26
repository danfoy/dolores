import { REST, Routes } from 'discord.js';
import servers from '../data/servers.js';
import { token, id } from '../data/client.js';

import apex from '../commands/apex.js';
import ping from '../commands/ping.js';

const rest = new REST({ version: '10' }).setToken(token);
const homeServer = servers.find(server => server.alias === 'home').id;

/**
 * Attaches command files to the passed-in discord.js Client instance, and
 * sends a PUT request to the Discord API to register slash commands.
 *
 * @param {discordjs.Client} client passed-in client
 */
export default async function(client) {

    const commands = [
        apex,
        ping,
    ];

    const commandData = commands.map(command => command = command.meta);

    client.commands = new Map();
    commands.forEach(command => client.commands.set(command.meta.name, command));

    if (client.commands.size === 0)
        throw new Error('Unable to load command files onto client');

    // Deploy the commands to the Discord API via REST
    try {

        await rest.put(Routes.applicationGuildCommands(id, homeServer), { body: commandData })
        console.log(
            `Registered ${client.commands.size} ${client.commands.size === 1 ? 'command' : 'commands'}:` +
            `\t${commands.map(cmd => cmd = `[${cmd.meta.name}]`).join(', ')}`
        );
    } catch (error) {
        console.error('Unable to register commands via REST API:', error);
    };

};
