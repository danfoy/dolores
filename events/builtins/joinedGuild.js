import Event from '../Event.js';

const meta = {
  name: 'guildJoined',
  eventName: 'guildCreate'
};

function response (guild) {
  console.log(`Joined server ${guild.name} (${guild.id})${guild.description ? ': ' + guild.description : ''}`);
};

export default new Event(meta, response);
