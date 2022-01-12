module.exports = {
	name: 'ready',
	once: true,
	execute(discord) {
		console.log(`Logged into Discord as ${discord.user.tag} (${discord.user.id})`);
	}
};
