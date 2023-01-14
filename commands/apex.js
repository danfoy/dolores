import { SlashCommandBuilder } from '@discordjs/builders';
import Command from './Command.js';

import randomFrom from '../utils/randomFrom.js';
import legends from '../data/legends.js';

import { EmbedBuilder, AttachmentBuilder } from 'discord.js';
const thumbDir = 'Resources/Apex/Legends/';

export const meta = new SlashCommandBuilder()
.setName('apex')
.setDescription('Generate a squad of randomized Apex Legends')
.addIntegerOption(option => option
  .setName('size')
  .setDescription('Number of legends to generate')
  .setRequired(true)
  .addChoices(
    { name: 'Solo', value: 1 },
    { name: 'Duo', value: 2 },
    { name: 'Squad', value: 3 }
  )
)
.addUserOption(option => option
  .setName('teammate1')
  .setDescription('Tag a teammate')
)
.addUserOption(option => option
  .setName('teammate2')
  .setDescription('Tag another teammate')
);

export async function execute(interaction) {
  await interaction.reply(new SquadEmbed(interaction));
};

export class SquadEmbed {
  constructor(interaction) {

    /**
    * Squad colours are provided as HEX codes for easy colour matching.
    * They are then converted to an integer to comply with the Discord
    * API v10+
    */
    const squadColours = ['d78d18', '31a1a0', '66a103']
      .map(colour => parseInt(colour, 16));

    const squadSize = interaction.options.getInteger('size');
    const legendSelection = randomFrom(legends, squadSize, {array: true});
    const players = [
      interaction.options.getUser('teammate1'),
      interaction.options.getUser('teammate2'),
    ].filter(player => player != null);

    // Add the interaction user to the list if there are empty slots
    if (players.length && players.length < squadSize)
      players.unshift(interaction.user);

    const squadMembers = Array.from(legendSelection, (legend, index) =>
      new SquadMember(
          legend,
          players[index],
          squadColours[index],
          interaction.client
        )
      )
    ;

    // Return an object compatiable with discordjs reply/send
    this.embeds = Array.from(squadMembers, legend => legend.embed);
    this.files = Array.from(squadMembers, legend => legend.file);
  };
};

export class SquadMember {
  constructor (legend, player, colour, client) {
    this.embed = new EmbedBuilder({
      color: colour ?? undefined,
      description: player?.username
        ? `**${legend.name}**`
        : legend.tagline,
      author: {
        name: player?.username ?? legend.name,
        icon_url: player?.displayAvatarURL() ?? undefined,
      },
      thumbnail: {
        url: `attachment://${legend.name}.png`,
      },
    });

    this.file = new AttachmentBuilder(
      client.dir + thumbDir + `${legend.name}.png`
    );
  };
};

const command = new Command(meta, execute);

export default command;
