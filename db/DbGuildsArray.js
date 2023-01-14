import DbGuild from "./DbGuild.js";

/**
 * Array of `DbGuild`s with helper properties and methods
 */
export default class DbGuildsArray extends Array {
  /**
   *
   * @param {DbManager} dbManager the DbManager this belongs to
   * @param {guildsData} guildsData dbGuild data objects
   */
  constructor(dbManager, ...guildsData) {
    super(...guildsData.map(guild => new DbGuild(dbManager, guild)));

    /**
     * Reference to the Client
     */
    this.client = dbManager.client;
  };

  /**
   * Update DbGuilds with data fetched from Discord
   */
  async update() {
    for await (const guild of this) {
      await guild.update();
    };
  };
};
