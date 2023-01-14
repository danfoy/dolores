import { Routes } from 'discord.js';

export default class CommandManager extends Map {
  constructor(client, commands) {
    super();

    commands.forEach(command => this.set(command.name, command));

    this.client = client;
  };

  init() {
    if (!this.size) return;
    this.client.log.listAction(this.client.commands, 'loaded', 'command');
  };
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
