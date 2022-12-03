const { promisify } = require('util');
const glob = promisify(require('glob'));

/**
 * Parses event handler files and attaches them to the discordjs client, where
 * they are registered as event listeners.
 *
 * @param {discordjs.Client} client passed-in client
 */
module.exports.registerEvents = async function(client) {
    // Get event files
    const eventFiles = await glob(__dirname + '/**/*.event.js');
    if (!eventFiles.length) return console.error('Unable to find event handler definitions');

    // Parse event files
    const events = eventFiles.map(event => event = require(event));
    const descriptor = events.length === 1 ? 'event handler' : 'event handlers';
    console.log(
        `Found ${events.length} ${descriptor}:` +
        `\t${events.map(event => event = `[${event.name}]`).join(', ')}`
    );

    // Attach listeners to client
    events.forEach(event => {
		if (event.once) return client.once(event.name, (...args) => event.execute(...args));
		return client.on(event.name, (...args) => event.execute(...args));
	});
};
