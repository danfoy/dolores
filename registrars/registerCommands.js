import { Routes } from 'discord.js';

/**
 * Attach `Command`s to the `Client` object as a `Map`.
 *
 * @param {Client} client discord.js Client instance
 * @param {Array<Command>} commands array of command objects
 */
export default function registerCommands(client, commands) {

    if (typeof client != 'object')
        throw new Error('No Client supplied');

    if (!Array.isArray(commands) || commands.length < 1)
        throw new Error('No Commands supplied');

    client.commands = new Map();
    commands.forEach(command => client.commands.set(command.data.name, command));

    if (client.commands.size === 0) {
        throw new Error('Unable to load command files onto client');
    };

    const commandsDescriptor = client.commands.size === 1
        ? 'command'
        : 'commands'
    ;

    console.log(
        `Registered ${client.commands.size} ${commandsDescriptor}:` +
        `\t${commands.map(cmd => cmd = `[${cmd.data.name}]`).join(', ')}`
    );
};

/**
 * Deploy command files to a specific guild (server)
 *
 * Unlike global deployments, deployments to specific guilds is isntant and
 * doesn't require propogation time. It is therefore useful for deploying
 * commands to test servers.
 *
 * The deployment API has a daily rate limit. Commands only need to be
 * redeployed when their meta has changed - the execute function is local only.
 * The REST instance is passed in to allow rate limiting when using the function
 * within loops.
 *
 * @param {REST} rest discord.js REST instance
 * @param {number} botID Discord user ID
 * @param {number} serverID target guild ID
 * @param {array<Command>} commands command objects
 */
export async function deployGuildCommands(rest, botID, serverID, commands) {
    const commandData = commands.map(command => command = command.data);

    try {
        // Send command to server via REST
        await rest.put(
            Routes.applicationGuildCommands(botID, serverID),
            { body: commandData }
        );

        const commandsDescriptor = commands.length === 1
            ? 'command'
            : 'commands'
        ;

        // Log success
        console.log(
            `Deployed ${commands.length} ${commandsDescriptor} ` +
            `to ${serverID}:` +
            `\t${commands.map(cmd => cmd = `[${cmd.data.name}]`).join(', ')}`
        );
    } catch (error) {
        // Log failure but prevent crash
        console.error('Unable to register commands via REST API:', error);
    };
};
