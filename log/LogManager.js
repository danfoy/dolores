
export default class LogManager {
  constructor(client) {
    this.client = client;
  }

  async command(interaction, error = null) {
    if (error instanceof Error) {
      console.info(`[${interaction.commandName}]\tcommand error thrown by ${interaction.user.tag} in ${interaction.guild.name}#${interaction.channel.name}`);
      console.error('name:', error.name);
      console.error('message:', error.message);
      console.error('cause:', error.cause);

      // Reply to the interaction user
      await interaction.reply({
        content: `Sorry, I'm not feeling quite myself.`,
        embeds: [{
          ephemeral: true,
          title: 'Error processing command',
          description: error.message ? `💀 \`${error.message}\`` : `💀`,
        }],
      });
      return;
    };

    console.log(`[${interaction.commandName}]\tcommand executed by ${interaction.user.tag} in ${interaction.guild.name}#${interaction.channel.name}`);
  };

  /**
  * Log to the console a list of items as having an action done to them
  *
  * @param {array|map} arrayOrMap Array or Map of items with `name` property
  * @param {string} action action (to) perform(ed)
  * @param {string} singular single entry name
  * @param {?string} plural plural of entry name
  */
  listAction(arrayOrMap, action, singular, plural) {
    console.log(listActionString(arrayOrMap, action, singular, plural));
  };

  init() {
    console.log('-'.repeat(80));
    console.log(this.client.instanceStartTime);
    console.log('Dolores waking up...');
    console.log(this.client.herald);
    console.log('-'.repeat(5));
  };
};

/**
* Get a string to use as a log entry for an action performed on an Array or
* Map.
*
* @param {array | map} arrayOrMap Array or Map of items with `name` property
* @param {string} action action (to) perform(ed)
* @param {string} singular single entry name
* @param {?string} plural plural of entry name
* @returns {string} loggable string
*/
export function listActionString(
  arrayOrMap,
  action,
  singular,
  plural = singular + 's'
) {
  const source = [...arrayOrMap.values()]
    .map(item => {
      if (typeof item === 'string' && item !== '') return item;
      if (item?.name) return item.name;
      throw new Error('Entries must be strings or have a `name` property');
    });
  const quantity = source.length || 0;
  const description = quantity === 1 ? singular : plural;
  const entries = source.map(entry => `[${entry}]`);
  const list = entries.join(', ');
  return `${quantity} ${description} ${action}${list ? (':\t ' + list) : ''}`;
};
