async function handleCommandError(interaction, error) {
    // Log the error to the console, with trace
    console.error(error);
    console.info(
        `[${interaction.commandName}]\tcommand error thrown ` +
        `by ${interaction.user.tag} in ` +
        `${interaction.guild.name}#${interaction.channel.name}`
        );

    // Reply to the interaction user
    await interaction.reply({
        content: `Sorry, I'm not feeling quite myself.`,
        embeds: [ new EmbedBuilder({
            ephemeral: true,
            title: 'Error processing command',
            description: error.message ? `💀 \`${error.message}\`` : `💀`,
        })],
    });
};

module.exports = async function handleCommand(interaction) {
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
        console.log(
            `[${interaction.commandName}]\tcommand executed by ` +
            `${interaction.user.tag} in ` +
            `${interaction.guild.name}#${interaction.channel.name}`
        );
    } catch (error) {
        await handleCommandError(interaction, error);
    };
};
