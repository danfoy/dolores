import guildCreate from '../events/guildCreate.js';
import interactionCreate from '../events/interactionCreate.js';
import messageCreate from '../events/messageCreate.js';
import ready from '../events/ready.js';

/**
 * Parses event handler files and attaches them to the discordjs client, where
 * they are registered as event listeners.
 *
 * @param {discordjs.Client} client passed-in client
 */
export default function(client) {

    // Available events
    const events = [
        guildCreate,
        interactionCreate,
        messageCreate,
        ready,
    ];

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
        .filter(event => !ignoredEvents.includes(event));

    // Check custom events are attached to client
    if (!attachedEvents.length) throw new Error('Unable to attach events to client');

    // Log the attached events
    const descriptor = attachedEvents.length === 1 ? 'event' : 'events';
    console.log(
        `Registered ${attachedEvents.length} ${descriptor}:` +
        `\t${events.map(event => event = `[${event.name}]`).join(', ')}`
    );
};
