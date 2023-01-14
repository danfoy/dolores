import * as dotenv from 'dotenv';
dotenv.config();

import { Client } from 'discord.js';

import CommandManager from './commands/CommandManager.js';
import EventManager from './events/EventManager.js';
import TriggerManager from './triggers/TriggerManager.js';
import DbManager from './db/DbManager.js';
import LogManager from './log/LogManager.js';

import loginQuote from './utils/loginQuote.js';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';


export { GatewayIntentBits } from 'discord.js';

export default class Dolores extends Client {
  constructor (config) {
    super(config);

    this.db = new DbManager(this, config.db);
    this.commands = new CommandManager(this, config.commands);
    this.events = new EventManager(this, config.events);
    this.triggers = new TriggerManager(this, config.triggers);
    this.log = new LogManager(this);

    this.herald = loginQuote;
    this.instanceStartTime = new Date().toISOString();
    this.dir = dirname(fileURLToPath(import.meta.url)) + '/';
  };

  async init() {

    this.log.init();
    this.commands.init();
    this.db.init();
    this.events.init();
    this.triggers.init();

    try {
      await this.login(process.env.DISCORD_TOKEN);
      console.log(`Logged in as ${this.user.tag} (${this.user.id})`);
    } catch (error) {
      // Throw rather than `process.exit(1)` is deliberate.
      // Exiting causes nodemon (development) and systemd (production) to
      // reload, which risks spamming the API with login attempts.
      console.error('Discord login failed:', error);
      throw new Error('Discord login failed');
    };
  };
};
