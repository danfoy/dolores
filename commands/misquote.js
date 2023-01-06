import {
    ContextMenuCommandBuilder,
    ApplicationCommandType,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ComponentType,
} from "discord.js";

import Command from "../classes/Command.js";
import transforms from "../utils/transformText.js";

const meta = new ContextMenuCommandBuilder()
	.setName('Misquote')
	.setType(ApplicationCommandType.Message);

/**
 * A sendable Message object with a selector for transform type
 */
class TransformSelectorMessage {
    /**
     * @param {Interaction} interaction discord Interaction
     * @param {object} transforms name-keyed transform functions
     */
    constructor(interaction, transforms) {

        const message = interaction.targetMessage;

        const componentOptions = [
            ...Object.entries(transforms).map(transformEntry => {
                const [name, transform] = transformEntry;
                return {
                    label: name,
                    description: transform(`Quote as ${name}`),
                    value: name,
                };
            }),
        ];

        this.ephemeral = true;
        this.components = [new ActionRowBuilder()
            .addComponents(new StringSelectMenuBuilder()
                .setCustomId(`misquote${interaction.id}`)
                .setPlaceholder(`Misquote ${message.author.username} as:`)
                .addOptions(componentOptions),
            ),
        ];
    };
};

/**
 * A sendable quote, with transformations
 */
class TransformedQuoteMessage {
    /**
     * @param {Message} message discord Message to transform
     * @param {function} transform transformation method
     */
    constructor(message, transform) {

        this.embeds = [];

        // Add an Embed for the Message `content` text, if any
        if (message.content) {
            this.embeds.push(new EmbedBuilder({
                description: transform(message.content),
            }));
        };

        // Transform existing Embeds, if any
        if (message.embeds && message.embeds.length) {
            message.embeds.forEach(embed => {
                this.embeds.push(new EmbedBuilder({
                    ...embed.data,
                    title: embed.data.title
                        ? transform(embed.data.title)
                        : undefined,
                    description: embed.data.description
                        ? transform(embed.data.description)
                        : undefined,
                }));
            });
        };

        // Change embed colours to the Discord blockquote colour
        const quoteColour = parseInt('50545b', 16);
        this.embeds.forEach(embed => embed.setColor(quoteColour));

        // Add Author information to the first Embed
        this.embeds[0].setAuthor({
            name: message.author.username,
            iconURL: message.author.avatarURL(),
        });

        // Add original date to the last embed
        this.embeds[this.embeds.length - 1]
            .setTimestamp(new Date(message.createdTimestamp));
    };
};

/**
 * A Message notifying that no transformable text was found
 */
class IneligibleErrorMessage {
    constructor() {
        const errorColour = parseInt('e74c3c', 16);
        this.ephemeral = true;
        this.embeds = [new EmbedBuilder({
            title: "Doesn't look like anything to me",
            description: '\`⚠️ No misquotable text found\`',
            color: errorColour,
        })];
    };
};

/**
 * Send a select menu to choose the transform type, and return the transform
 * function
 *
 * @param {Interaction} interaction context menu command interaction
 * @param {Object} transforms name-keyed transform functions
 * @returns {Promise<function>} transform function
 */
async function requestTransform(interaction, transforms) {
    const channel = await interaction.client.channels.fetch(interaction.channelId);

    await interaction.reply(new TransformSelectorMessage(interaction, transforms));

    const misquoteTypeResponse = await channel.awaitMessageComponent({
        componentType: ComponentType.StringSelect,
        time: 60000,
        filter: selectorResponse => {
            selectorResponse.deferUpdate();
            const customId = `misquote${interaction.id}`;
            return selectorResponse.customId === customId;
        },
    });

    const misquoteType = misquoteTypeResponse.values[0];
    const transform = transforms[misquoteType];

    await interaction.editReply({
        content: transform('||Misquoting text...||'),
        components: [],
     });

    return transform;
};

/**
 * Respond to the command
 *
 * @param {Interaction} interaction context menu command interaction
 */
async function action(interaction) {

    // Return an error Message if nothing to misquote
    const transformable = target => target.content || target.embeds.length;
    if (!transformable(interaction.targetMessage)) {
        return await interaction.reply(new IneligibleErrorMessage());
    };

    // This consumes `interaction.reply()`
    const transform = await requestTransform(interaction, transforms);

    // `interaction.reply()` was already used, and can't un-set `ephemeral`
    await interaction.targetMessage.reply(new TransformedQuoteMessage(
        interaction.targetMessage,
        transform
    ));
};

export default new Command(meta, action);
