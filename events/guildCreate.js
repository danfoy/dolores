import Event from '../classes/Event.js';

/**
 * Emits when the discordjs client joins a server (guild)
 */
export default new Event(
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
