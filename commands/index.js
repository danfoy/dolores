const { promisify } = require('util');
const glob = promisify(require('glob'));
const { Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { bot, servers } = require('../config.json');

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
    const commandData = commands.map(command => command = command.meta.toJSON());
    const commandsCollection = new Collection();
    commands.forEach(command => commandsCollection.set(command.meta.name, command));

    // Attach commands to client object
    client.commands = commandsCollection;
    if (client.commands.size === 0) throw new Error('Unable to load command files onto client');
    console.log(
        `Loaded ${client.commands.size} ${client.commands.size === 1 ? 'command' : 'commands'} onto discordjs client:` +
        ` ${client.commands.map(cmd => cmd = cmd.meta.name).join(', ')}`
    );

    // Deploy the commands to the Discord API via REST
    const rest = new REST({ version: '9' }).setToken(bot.token);
    await rest.put(Routes.applicationGuildCommands(bot.id, servers[1].id), { body: commandData })
    console.log(
        `Registered ${commandData.length} ${commandData.length === 1 ? 'slash command' : 'slash commands'} ` +
        `with the Discord REST API`
    );
};
