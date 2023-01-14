import DbChannel from './DbChannel.js';
import DbChannelsArray from './DbChannelsArray.js';

export default class DbGuild {
  constructor(dbManager, guildData) {

    if (!dbManager.client) throw new Error('Supplied DbManager missing Client');
    this.client = dbManager.client;

    if (!guildData.id) throw new Error('Missing Guild ID');
    this.id = guildData.id;

    if (!guildData.alias) throw new Error('Missing Guild alias');
    this.alias = guildData.alias;

    // Name initially set to Alias for logging purposes;
    // will be overwritten with public guild name on update
    this.name = this.alias;

    const dbChannels = guildData?.channels
      ?.map(channel => new DbChannel(this, channel))
    ;

    this.dbChannels = dbChannels
      ? new DbChannelsArray(dbManager, ...dbChannels)
      : null
    ;


  };

  async fetch() {
    return await this.client.guilds.fetch(this.id);
  };

  async updateDbChannels() {
    if (!this.dbChannels) return;

    for await (const channel of this.dbChannels) {
      await channel.update();
    };
  };

  async update() {
    await this.updateDbChannels();
    const fetchedGuild = await this.fetch();
    return Object.assign(this, fetchedGuild);
  };
};
