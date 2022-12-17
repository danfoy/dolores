module.exports = function handleTriggers(message) {
    message.client.triggers.forEach(trigger => {
        if (trigger.isMatch(message.content)) trigger.respond(message);
    });
};
