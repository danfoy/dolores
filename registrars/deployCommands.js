import { REST } from 'discord.js';
import servers from '../data/servers.js';
import { token, id as botID } from '../data/client.js';
import { deployGuildCommands } from './registerCommands.js';

import apex from '../commands/apex.js';
import ping from '../commands/ping.js';
import misquote from '../commands/misquote.js';

const rest = new REST({ version: '10' }).setToken(token);
const serverID = servers.find(server => server.alias === 'home').id;
const commands = [
    apex,
    ping,
    misquote,
];

deployGuildCommands(rest, botID, serverID, commands);
