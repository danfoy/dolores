module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

        // Only handle commands
        if (!interaction.isCommand()) return;

        // Fetch the command
        const { commandName } = interaction;
        const command = interaction.client.commands.get(commandName);

        // Check the command is supported
        if (!command) {
            console.error(`Unable to find command '${commandName}'`);
            await interaction.reply({
                content: `\`${commandName}\` doesn't sound like anything to me`,
                ephemeral: true
            });
            return;
        };

        // Execute the command
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`Error processing ${commandName}: ` + error);
            await interaction.reply({
                content: "I'm sorry, I'm not feeling quite myself",
                ephemeral: true
            });
        }

        // Log the command
		console.log(
            `'${commandName}' triggered ` +
            `by ${interaction.user.tag} in ` +
            `${interaction.guild.name}#${interaction.channel.name}`
        );
	}
};
