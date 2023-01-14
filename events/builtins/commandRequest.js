import Event from '../Event.js';

export default new Event(
  {
    name: 'commandRequest',
    eventName: 'interactionCreate'
  },
  function(interaction) {
    if (!interaction.isCommand()) return;
    return handleCommand(interaction);
  }
);

async function handleCommand(interaction) {
  const command = interaction.client.commands.get(interaction.commandName);

  // Check the command was found
  // Slash commands will always be found, but prefixed message commands need
  // to be verified as valid. Prefix commands are only partially implemented
  // currently.
  if (!command) {
    console.error(`Unable to find command '${interaction.commandName}'`);
    await interaction.reply({
      content: `\`${interaction.commandName}\` doesn't sound like anything to me`,
      ephemeral: true
    });
    return;
  };

  // Execute the command
  try {
    await command.execute(interaction);
    await interaction.client.log.command(interaction);
  } catch (error) {
    await interaction.client.log.command(interaction, error);
  };
};
