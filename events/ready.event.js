const { deployCommands } = require('../util');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`\nLogged into Discord as ${client.user.tag} (${client.user.id})`);
		console.info('Waiting for events...\n');
	}
};
