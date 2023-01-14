import DbChannelsArray from './DbChannelsArray.js';
import DbGuildsArray from './DbGuildsArray.js';

/**
* Manages database entries
*
* Maps the entries to .db on the passed-in client and provides utility
* functions.
*
* At the moment, in lieu of a database server I am simply pulling in data from
* javascript files.
*/
export default class DbManager {
  /**
  * @param {Client} client discordjs Client
  * @param {Object[]} data array of guild data
  */
  constructor(client, data) {
    if (!client) throw new Error('Missing Client');
    if (!data.guilds?.length) return;

    /**
     * Reference to the client
     */
    this.client = client;

    /**
     * Array of DbGuilds with helper methods
     */
    this.guilds = new DbGuildsArray(this, ...data.guilds);

    // Flat list of all channels with null entries filtered out
    const channels = this.guilds
      .map(guild => guild.dbChannels)
      .flat()
      .filter(channel => channel)
    ;

    /**
     * Array of all DbChannels in DbGuilds, with helper methods
     */
    this.channels = channels.length
      ? new DbChannelsArray(this, ...channels)
      : null
    ;
  };

  /**
  * Updates Guild and Channels with data fetched from Discord
  */
  async update() {
    await this.guilds?.update();
    await this.channels?.update();
  };

  /**
   * Initializes the manager
   */
  init() {
    // Update the database when client emits `ready` event
    this.client.prependOnceListener('ready', async client => {
      await this.client.db.update();
      this.client.log.listAction(this.client.db.guilds, 'ready', 'DB Guild');
      this.client.log.listAction(this.client.db.channels, 'ready', 'DB Channel');
      this.client.emit('dbReady', client);
    });
  };
};
