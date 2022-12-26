export default async function(message) {
    await message.client.triggers.forEach(trigger => {
        if (trigger.isMatch(message.content)) trigger.respond(message);
    });
};
