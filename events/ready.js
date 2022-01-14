module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Logged into Discord as ${client.user.tag} (${client.user.id})`);
		require('../deploy-commands');
	}
};
