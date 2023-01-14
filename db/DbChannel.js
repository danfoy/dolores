/**
 * Represents a Discord channel
 */
export default class DbChannel {
  /**
   * Creates an instance of DbChannel with helper methods
   * @param {DbGuild} dbGuild the guild to which this channel belongs
   * @param {object} channelData data for this channel
   */
  constructor(dbGuild, channelData) {
    // id is required for fetching channel
    if (!channelData.id) throw new Error('Missing Channel ID');

    // access to client is required for fetching channel
    if (!dbGuild.client) throw new Error('Missing Client');

    // alias is required for logging
    if (!channelData.alias) throw new Error('Missing Channel alias');

    /**
     * Reference to the client
     */
    this.client = dbGuild.client;

    /**
     * Channel ID from Discord
     */
    this.id = channelData.id;

    /**
     * Short name used for logging
     */
    this.alias = channelData.alias;

    /** The name of the channel
     *
     * This is initially copied from the alias for logging purposes, but is
     * later replaced by the actual channel name pulled from Discord
     */
    this.name = this.alias;

    /**
     * Array of tags for this channel, or null
     */
    this.tags = channelData?.tags || null;
  };

  /**
   * Fetches a discord.js Channel (or one of its subclasses, e.g. TextChannel)
   * @returns {Channel} discord.js Channel or subclass
   */
  async fetch() {
    return await this.client.channels.fetch(this.id);
  };

  /**
   * Update this instance with data pulled from Discord
   */
  async update() {
    const upgradeData = await this.fetch();
    Object.assign(this, upgradeData);
  };
};
