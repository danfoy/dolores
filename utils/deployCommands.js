import * as dotenv from 'dotenv';
dotenv.config();

import { REST, Routes } from 'discord.js';

import config from '../config.js';

const guilds = config.db.guilds;
const commands = config.commands;
const token = process.env.DISCORD_TOKEN;
const botID = process.env.DISCORD_ID;

const rest = new REST({ version: '10' }).setToken(token);
const serverIds = guilds.map(server => server.id);

serverIds.forEach(serverId =>
  deployGuildCommands(rest, botID, serverId, commands)
);

async function deployGuildCommands(rest, botID, serverID, commands) {
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
