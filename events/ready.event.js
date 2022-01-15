const { deployCommands } = require('../util');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Logged into Discord as ${client.user.tag} (${client.user.id})`);
		console.log('Waiting for events...');
	}
};
