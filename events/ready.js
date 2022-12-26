import Event from '../classes/Event.js';
import servers from '../data/servers.js';
import LoginEmbed from '../embeds/LoginEmbed.js';

export default new Event(
    {
        name: 'ready',
        once: true,
    },
    async function(client) {

        // Log login to logging channel(s)
        try {
            const loginEmbed = new LoginEmbed(client);
            const loggingChannelID = servers.find(server => server.alias == "home").channels.logging;
            const loggingChannel = await client.channels.fetch(loggingChannelID);
            await loggingChannel.send({embeds: [loginEmbed]});
        } catch (error) {
            console.error('Unable to send login message:', error);
        };

        // Log ready status
        console.info('Ready. Waiting for events...\n');
    }
);
