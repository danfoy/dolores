const { promisify } = require('util');
const glob = promisify(require('glob'));
const { Collection } = require('discord.js');
const { REST, Routes } = require('discord.js');
const { bot, servers } = require('../config.json');

const rest = new REST({ version: '10' }).setToken(bot.token);

/**
 * Attaches command files to the passed-in discord.js Client instance, and
 * sends a PUT request to the Discord API to register slash commands.
 *
 * @param {discordjs.Client} client passed-in client
 */
module.exports.registerCommands = async function(client) {

    // Get array of command file paths, return if none found
    const commandPaths = await glob(__dirname + '/**/*.command.js');
    if (!commandPaths) return console.error('Unable to find any command files');

    // Transform data to required formats
    const commands = commandPaths.map(command => command = require(command));
    const commandData = commands.map(command => command = command.meta);
    const commandsCollection = new Collection();
    commands.forEach(command => commandsCollection.set(command.meta.name, command));

    // Attach commands to client object
    client.commands = commandsCollection;
    if (client.commands.size === 0) throw new Error('Unable to load command files onto client');

    // Deploy the commands to the Discord API via REST
    try {
        await rest.put(Routes.applicationGuildCommands(bot.id, servers[1].id), { body: commandData })
        console.log(
            `Registered ${client.commands.size} ${client.commands.size === 1 ? 'command' : 'commands'}:` +
            `\t${client.commands.map(cmd => cmd = `[${cmd.meta.name}]`).join(', ')}`
        );
    } catch (error) {
        console.error('Unable to register commands via REST API:', error);
    };

};
