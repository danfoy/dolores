
/**
 * Represents a discordjs client event response
 */
export default class Event {
    /**
     * @param {object} meta event configuration
     * @param {string} meta.name name of event emitted
     * @param {boolean?} meta.once=true unregister after one emission
     * @param {function} response response to event
     */
    constructor(meta, response) {
        this.name = meta.name;
        this.once = meta?.once ?? false;
        this._response = response;
    };

    /**
     * Execute the response to the emitted event
     */
    async execute(client) {
        this._response(client);
    };
};
