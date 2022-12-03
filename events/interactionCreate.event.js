const { EmbedBuilder } = require('discord.js');

/**
 * Notifies the command issuer of failure and logs the error to the console
 *
 * @param {*} interaction interaction containing the command
 * @param {Error} error error caused by command
 */
async function handleCommandError(interaction, error) {
    // Log the error to the console, with trace
    console.error(error);
    console.info(
        `[${interaction.commandName}] command error thrown ` +
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

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

        // Only handle commands
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        // Check the command is supported
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
                `[${interaction.commandName}] command executed by ` +
                `${interaction.user.tag} in ` +
                `${interaction.guild.name}#${interaction.channel.name}`
            );
        } catch (error) {
            await handleCommandError(interaction, error);
        };
	},
};
