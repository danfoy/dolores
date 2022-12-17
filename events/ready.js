const servers = require('../data/servers');
const LoginEmbed = require('../embeds/LoginEmbed');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        // Log login to logging channel(s)
        try {
            const loginEmbed = new LoginEmbed(client);
            const loggingChannelID = servers.find(server => server.alias == "home").channels.logging;
            const loggingChannel = await client.channels.fetch(loggingChannelID);
            await loggingChannel.send({embeds: [loginEmbed]});
        } catch (error) {
            console.error('Unable to send login message:', error);
            throw new Error('Unable to send login message');
        };

        // Log ready status
        console.info('Ready. Waiting for events...\n');
    }
};
