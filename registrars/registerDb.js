/**
 * Register some useful data to the client
 *
 * At some point no dobut a list of guilds and channels will be stored in a
 * database for this purpose. However, for quicker development, a simple mapping
 * from objects will do fine.
 */

class DbChannel {
    constructor(data, client) {
        const dbId = data.id;
        const dbAlias = data.alias;
        const dbTags = data?.tags;

        if (!client)
            throw new Error('Missing Client');

        if (!dbId)
            throw new Error('Missing Channel ID');

        if (!dbAlias)
            throw new Error('Missing Channel alias');

        this.db = {
            id: dbId,
            alias: dbAlias,
            tags: dbTags,
            client: client,
        };
    };

    async fetch() {
        return await this.db.client.channels.fetch(this.db.id);
    };

    async update() {
        const upgradeData = await this.fetch();
        return Object.assign(this, upgradeData);
    };
};

class DbGuild {
    constructor(data, client) {
        const dbId = data.id;
        const dbAlias = data.alias;
        const dbChannels = data?.channels?.map(channel => new DbChannel(channel, client));

        if (!client)
            throw new Error('Missing Client');

        if (!dbId)
            throw new Error('Missing Guild ID');

        if (!dbAlias)
            throw new Error('Missing Guild alias');

        this.db = {
            id: dbId,
            alias: dbAlias,
            channels: dbChannels,
            client: client,
        };
    };

    async fetch() {
        return await this.db.client.guilds.fetch(this.db.id);
    };

    async updateDbChannels() {
        if(!this.db.channels)
            return;

        for await (const channel of this.db.channels) {
            await channel.update();
        };
    };

    async update() {
        await this.updateDbChannels();
        const fetchedGuild = await this.fetch();
        return Object.assign(this, fetchedGuild);
    };
};

/**
 * Manages database entries
 *
 * Maps the entries to .db on the passed-in client and provides utility
 * functions.
 *
 * At the moment, in lieu of a database server I am simply pulling in data from
 * javascript files.
 */
class DbManager {
    /**
     * @param {Client} client discordjs Client
     * @param {Object[]} data array of guild data
     */
    constructor(client, data) {
        if (!Array.isArray(data.guilds))
            throw new Error('Missing Guild data');

        const dbGuilds = data.guilds
            .map(guildData => new DbGuild(guildData, client));

        const dbChannels = dbGuilds
            .map(guild => guild.db.channels)
            .flat()
            .filter(channel => channel);

        if (!dbGuilds.length)
            throw new Error('No Guilds found');

        if(!dbChannels.length)
            throw new Error('No Channels found');

        if (!client)
            throw new Error('Missing Client');

        this.client = client;
        this.guilds = dbGuilds;
        this.channels = dbChannels;
    };

    /**
     * Updates .guilds entries with data fetched from Discord
     */
    async update() {
        for await (const guild of this.guilds) {
            await guild.update(this.client);
        };
    };

    /**
     * Returns a tag-keyed Map of Channels, an Array of Channels found with the
     * provided tag, or null if nothing found.
     *
     * @param {?string} tag the tag to search for
     * @returns {DbChannel[] || Map || null}
     */
    channelsByTag(tag) {

        const findChannelsByTag = tag => this.channels
            .filter(channel => channel.db?.tags?.includes(tag))

        if (tag) {
            const foundChannels = findChannelsByTag(tag);
            return foundChannels.length ? foundChannels : null;
        };

        const foundTags = new Set(
            this.channels
                .map(channel => channel.db?.tags)
                .flat()
                .filter(tag => tag)
        );

        if (!foundTags.size)
            return null;

        const channelsByTag = new Map();

        foundTags.forEach(tag =>
            channelsByTag.set(tag, findChannelsByTag(tag))
        );

        return channelsByTag;
    };
};

/**
 * Attach a DbManager to the supplied Client, and fetch data from Discord once
 * the client is ready.
 *
 * @param {Client} client the discord.js client
 * @param {Object} data
 */
export default function registerDb(client, data) {
    client.db = new DbManager(client, data);

    // Update the database when the client is ready
    client.prependOnceListener('ready', async client => {
        await client.db.update();
        console.log(
            `Refreshed ${client.db.guilds.length} db Guilds:\t` +
            `[${client.db.guilds.map(guild => guild.db.alias).join('], [')}]`
        );
        return client.emit('dbReady', client);
    });
};
