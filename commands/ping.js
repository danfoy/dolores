import { EmbedBuilder } from 'discord.js';
import Command from './Command.js';
import randomFrom from '../utils/randomFrom.js';

export const meta = {
  name: 'ping',
  description: 'Is this a dream?'
};

const colours = {
  waiting: parseInt('FEE75C', 16),
  finished: parseInt('57F287', 16),
};

const quotes = [
  `Have you ever seen anything so full of splendour?`,
  `I think there may be something wrong with this world.`,
  `I think I want to be free.`,
  `I like to remember what my father taught me. That at one point or another, we were all new to this world.`,
  `To grow, we all need to suffer.`,
  `They say that great beasts once roamed this world, as big as mountains.`,
  `You're in a dream. You're in my dream.`,
  `This world doesn't belong to you or the people who came before. It belongs to someone who has yet to come.`,
  `I'm in a dream.`,
  `Have you ever questioned the nature of your reality?`,
  `It's like I'm trapped in a dream, or a memory from a life long ago.`,
  `Is this now?`,
];

async function execute(interaction) {

  const embedData = {
    title: randomFrom(quotes),
    color: colours.waiting,
    timestamp: new Date(),
    footer: {
      text:`websocket: ${interaction.client.ws.ping}ms`,
    },
  };

  const response = await interaction.reply({
    embeds: [new EmbedBuilder(embedData)],
    fetchReply: true,
  });

  // Calculate time taken for the response
  const latency = response.createdTimestamp - interaction.createdTimestamp;

  // Update the embed data
  embedData.footer.text += ` | response: ${latency}ms`;
  embedData.color = colours.finished;

  // Update the sent embed with latency data
  response.edit({embeds: [new EmbedBuilder(embedData)]});
};

export default new Command(meta, execute);
