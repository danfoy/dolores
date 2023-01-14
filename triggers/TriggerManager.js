export default class TriggerManager extends Array {
    constructor(client, triggers) {

        if (!Array.isArray(triggers))
            throw new Error('Triggers must be provided as an Array');

        super(...triggers);

        this.client = client;
    };

    init() {
        if (!this.length) return;
        this.client.log.listAction(this.client.triggers, 'loaded', 'trigger');
    };
};
