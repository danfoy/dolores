import commandRequest from "./builtins/commandRequest.js";
import dbReady from "./builtins/dbReady.js";
import joinedGuild from "./builtins/joinedGuild.js";
import ready from "./builtins/ready.js";
import triggerCheck from "./builtins/triggerCheck.js";
import Event from "./Event.js";

const builtins = [
  commandRequest,
  triggerCheck,
  joinedGuild,
  dbReady,
  ready,
];

/**
* Parses event handler files and attaches them to the discordjs client, where
* they are registered as event listeners.
*
* @param {discordjs.Client} client passed-in client
*/
export default class EventManager extends Array {
  constructor(client, customEventsArray, ...customEvents) {
    const events = [ ...builtins, ...customEventsArray, ...customEvents ];
    if (client instanceof Event) events.unshift(client);
    super(...events);

    /**
     * Reference to the client object
     */
    this.client = client;
  };

  /**
   * Attaches `EventListener`s to the client
   */
  init() {
    if (!this.length) return;

    this.forEach(event => {
      if (event.once) {
        return this.client.once(event.eventName, (...args) => event.respond(...args));
      };

      return this.client.on(event.eventName, (...args) => event.respond(...args));
    });

    this.client.log.listAction(this, 'loaded', 'event');
  };
};
