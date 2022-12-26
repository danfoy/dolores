import ownName from '../triggers/ownName.js';

const triggers = [
    ownName,
];

export default function(client) {
    client.triggers = triggers;

    if (!client.triggers) throw new Error('Unable to register triggers');

    // Log the attached triggers
    const descriptor = client.triggers.length === 1 ? 'trigger' : 'triggers';
    console.log(
        `Registered ${client.triggers.length} ${descriptor}:` +
        `\t${client.triggers.map(trigger => trigger = `[${trigger.name}]`).join(', ')}`
    );
};
