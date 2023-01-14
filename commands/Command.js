
/**
* @typedef {Object} commandData
* @property {String} name name of the command
*/

/**
*
* @export
* @class Command
*/
export default class Command {
  /**
  *
  * @param {commandData} meta command data
  * @param {Function} action function to execute
  */
  constructor(meta, action) {

    if (!meta.name || typeof meta.name != 'string')
    throw new Error('Command name not provided');

    if (!action || typeof action != 'function')
    throw new Error('Command action not provided');

    this.name = meta.name;
    this.data = meta;
    this.execute = action;
  };
};
