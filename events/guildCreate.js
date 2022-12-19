const Event = require('../classes/Event');

/**
 * Emits when the discordjs client joins a server (guild)
 */
module.exports = new Event(
    {
        name: 'guildCreate',
    },
    /**
     * Respond to the event
     *
     * @param {Guild} guild the joined guild
     */
    function(guild) {

        // TODO: Try and send a message to #general, #bots, etc.

        // Log the event
        console.log(
            `Joined server ${guild.name} (${guild.id})` +
            `${guild.description ? ': ' + guild.description : ''}`
        );
    }
);
