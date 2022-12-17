const { promisify } = require('node:util');
const glob = promisify(require('glob'));

/**
 * Parses event handler files and attaches them to the discordjs client, where
 * they are registered as event listeners.
 *
 * @param {discordjs.Client} client passed-in client
 */
module.exports = async function(client) {
    // Get event files
    const eventFiles = await glob(__dirname + '/../events/*.js');
    if (!eventFiles.length) throw new Error('Unable to find event handler definitions');

    // Parse event files
    const events = eventFiles.map(event => event = require(event));

    // Attach listeners to client
    events.forEach(event => {
		if (event.once) return client.once(event.name, (...args) => event.execute(...args));
		return client.on(event.name, (...args) => event.execute(...args));
	});

    // List of events to ignore in the log message
    // (some are attached by discordjs automatically)
    const ignoredEvents = [
        'shardDisconnect',
    ];

    // List of events registered to the client
    const attachedEvents = client.eventNames()
        .filter(event => !ignoredEvents.includes(event))

    // Log the attached events
    const descriptor = attachedEvents.length === 1 ? 'event' : 'events';
    console.log(
        `Registered ${attachedEvents.length} ${descriptor}:` +
        `\t${events.map(event => event = `[${event.name}]`).join(', ')}`
    );
};
