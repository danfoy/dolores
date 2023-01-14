import { argv as cliArgs } from 'node:process';
import Dolores from './Dolores.js';

export default Dolores;

export {
  GatewayIntentBits,
  REST,
  Routes
} from 'discord.js';

export { default as Event } from './events/Event.js';
export { default as Command } from './commands/Command.js';
export { default as Trigger } from './triggers/Trigger.js';


// Local staging mode
if (cliArgs[2] === 'stage') {
  try {
    const localConfig = await import('./config.js');
    const dolores = new Dolores(localConfig.default);
    await dolores.init();
  } catch (error) {
    console.error('Unable to load local config file');
    throw error;
  };
};
