const { servers } = require('../config.json');
const LoginEmbed = require('./LoginEmbed');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        // Log login to logging channel(s)
        try {
            const loginEmbed = new LoginEmbed(client);
            const loggingChannel = await client.channels
                .fetch(servers.find(server => server.name == "home").logging);
            await loggingChannel.send({embeds: [loginEmbed]});
        } catch (error) {
            console.error('Unable to send login message:', error);
            throw new Error('Unable to send login message');
        };

        // Log ready status
        console.info('Ready. Waiting for events...\n');
    }
};
