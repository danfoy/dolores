import DbChannel from "./DbChannel.js";

export default class DbChannelsArray extends Array {
  constructor(parent, ...dbChannels) {
    if (parent instanceof DbChannel) dbChannels.unshift(parent);
    super(...dbChannels);

    /**
     * Reference to the client
     */
    this.client = parent.client;
  };

  async update() {
    for await (const channel of this) {
      await channel.update();
    };
  };

  /**
  * Returns a tag-keyed Map of Channels, an Array of Channels found with the
  * provided tag, or null if nothing found.
  *
  * @param {?string} tag the tag to search for
  * @returns {DbChannel[] || Map || null}
  */
  byTag(tag) {

    /**
     * Return an array of found channels or null if none found, if tag provided
     */
    if (tag) {
      const foundChannels = this.filter(channel => channel?.tags?.includes(tag));
      return foundChannels.length ? foundChannels : null;
    };

    /**
     * Return null if no tags provided and no tags found
    */
    const foundTags = new Set(this
      .map(channel => channel.db?.tags)
      .flat()
      .filter(tag => tag)
    );

    if (!foundTags.size) return null;

    /**
     * Return a map of tag: channels[] if no tag supplied
     */
    const channelsByTag = new Map();

    foundTags.forEach(tag =>
      channelsByTag.set(tag, this.byTag(tag))
    );

    return channelsByTag;
  };
}
