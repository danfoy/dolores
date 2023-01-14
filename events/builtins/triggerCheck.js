import Event from '../Event.js';

export default new Event(
  {
    name: 'triggerCheck',
    eventName: 'messageCreate'
  },
  function(message) {

    // Ignore client user's own messages. Mitigates getting stuck in loops.
    if (message.author.id === message.client.user.id) return;

    // It is possible to send a message without content - e.g. an embed
    // or standalone attachment. Ignore these.
    if (!message.content) return;

    handleTriggers(message);
  },
);

async function handleTriggers (message) {
  await message.client.triggers.forEach(trigger => {
    if (trigger.isMatch(message.content)) trigger.respond(message);
  });
};
